from flask import Flask, request, jsonify
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
import pandas as pd
import mysql.connector

app = Flask(__name__)


@app.route('/')
def index():
    return "Flask Application is running!"


@app.route('/match', methods=['POST'])
def match():
    user_profile = request.json
    print('Python', user_profile)
    new_profile = pd.DataFrame([user_profile])
    print('Python', new_profile)

    config = {
        'host': "ec2-3-137-65-169.us-east-2.compute.amazonaws.com",
        'user': "d98sharm",
        'password': "MSCI342",
        'database': "d98sharm"
    }

    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()

    query_students = "SELECT university, program, career_interest, skills, userID FROM StudentTraits"
    query_professionals = "SELECT university, program, job_title AS career_interest, skills, userID FROM ProfessionalTraits"
    query_users = "SELECT userID, userType FROM Users"

    cursor.execute(query_students)
    records_students = cursor.fetchall()

    cursor.execute(query_professionals)
    records_professionals = cursor.fetchall()

    cursor.execute(query_users)
    records_users = cursor.fetchall()

    all_records = records_students + records_professionals

    df = pd.DataFrame(all_records, columns=[
        'university', 'program', 'career_interest', 'skills', 'id'])

    categorical_features = ['university',
                            'program', 'career_interest', 'skills']
    df_encoded = pd.get_dummies(df, columns=categorical_features)

    X = df_encoded.drop('id', axis=1)
    y = df_encoded['id']

    df_users = pd.DataFrame(records_users, columns=['userID', 'userType'])

    pipeline = make_pipeline(
        StandardScaler(), KNeighborsClassifier(n_neighbors=5))

    pipeline.fit(X, y)

    # Function to find the nearest professional
    def find_nearest_professional(knn_pipeline, new_profile_aligned, df_users, y):
        distances, indices = knn_pipeline.named_steps['kneighborsclassifier'].kneighbors(
            new_profile_aligned)

        for distance, index in zip(distances[0], indices[0]):
            matched_id = y.iloc[index]
            user_type = df_users.loc[df_users['userID']
                                     == matched_id, 'userType'].values[0]

            if user_type == 'professional':
                matched_record = df[df['id'] == matched_id]
                return matched_record, distance

        return None, None

    df_with_new_profile = pd.concat(
        [df[categorical_features], new_profile], ignore_index=True)

    df_with_new_profile_encoded = pd.get_dummies(
        df_with_new_profile, columns=categorical_features)

    new_profile_encoded = df_with_new_profile_encoded.iloc[[-1]]

    new_profile_aligned = new_profile_encoded.reindex(
        columns=X.columns, fill_value=0)

    nearest_professional, professional_distance = find_nearest_professional(
        pipeline, new_profile_aligned, df_users, y)

    cursor.close()
    connection.close()

    if nearest_professional is not None:
        professional_info = nearest_professional.to_dict('records')[0]
        return jsonify(professional_info)
    else:
        return jsonify({'error': 'No professional found'}), 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
