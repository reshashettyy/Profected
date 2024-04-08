# Profected

Our project is an online networking platform designed to connect students with industry professionals, providing tailored mentorship experiences and valuable networking opportunities. Inspired by the need to bridge the gap between students' educational journey and real-world industry insights, our platform aims to facilitate meaningful connections and career development.


README updated March 15 2024

## Application Rundown

- The navigation bar at the top of the application redirects the user to different pages - Home - Matching - MainCalendar - Resources - VideoEmbedding - User profile
  Note: The team plans on changing the names of pages in the navigation bar

## Landing Page
- Entry point for a networking platform connecting students and industry professionals.
- Provides essential information, encourages action, and showcases professional profiles.
- Visit landing page to learn about platform and features.
- Explore professional profiles for networking and mentorship.
- Click on a profile to view details and book time. Includes bio and reasons to book time, and allows direct booking.

## Login
- The page serves as both a login and a sign-up page, with the ability to switch between the two modes using a sliding overlay.
- Users can log in using their email and password.
- Upon successful login, the user is redirected to the homepage.
- Error handling for login failures, displaying an error message in the console.
- Users can create a new account by providing their first name, last name, email, password, and confirming their password.
- Includes a dropdown to select the user type (student or professional).
- Passwords are checked for a match before the account is created.
- Upon successful account creation, the user data is stored in Firebase Firestore, and the user is redirected to the homepage ('/').
- Error handling for sign-up failures, displaying an error message in the console.
- Uses Firebase Authentication for handling user authentication.
- Utilizes Firebase Firestore for storing user data upon account creation.
- The page features a modern design with a sliding overlay to switch between login and sign-up modes.
- Responsive design ensures that the page looks good on different screen sizes.

### Matching

- Conditional Rendering is setup based on whether the user is a Student or a Professional
- Student is capable of selecting their information to get matched with an industry professional
- Student can select their study of program
- Student can select their career interests
- Student can enter the list of dates that will work for them for meetings
- Student can enter a range of time that works for them to meet during the dates they have selected
- Professional is capable of selecting Company, JobTitle, University, and dates
- Clicking the submit button will store the values into the MySQL Database under the "StudentTraits" and "ProfessionalTraits" tables

- Next Sprint we will work on the Matching algorithm and adding the dates the student and professionals are available

### MainCalendar

- Calendar of current month and year currently renders on the page
- User can select "back" to go a month back, user can select "next" to go the next month
- User can view calendar in "Month", "Week", "Day" and "Agenda" form
- User can also enter a new event that will render on calendar (midst of saving data on SQL database)
- Data saved in the SQL database is rendered correctly onto the calenda

### Resources

- Hard coded all the data for local tech conferences
- Rendered each one on a component card
- Added Google Maps frame
- Added markers that correlate to each of the card
- When user hovers over the conference details, the marker bounces to attract users attention to the map

### VideoEmbedding

- The user can join a call, turn on their camera, unmute themselves and talk.
- In order to test multiple people on call, the user should open up a private/incognito window with the localhost and they can join in with another username.

[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=13352842)

# MSci 342 - Project template

## This repo contains a template project for starting your development. It is based on the sample assignment solution from MSci 245.

## To run this app:

- The app starts automatically in dev mode when you open this project in Codespaces. You can stop it by pressing Ctrl+C in the Codespaces terminal, where the app is running. To restart, use the following command from the main project directory:

```
yarn dev
```

- make sure you modify `config.js` to point to your MySQL database. The MySQL server name is

```
ec2-3-137-65-169.us-east-2.compute.amazonaws.com
```

The database name is the same as your UW username.
The password is "MSCI342".

## Development Tips:

- Use CodeSpaces for this project.
- In VSCode terminal on CodeSpaces start a new branch:

```
git checkout -b your-branch-name
```

- As you code, push daily changes to your GitHub repo's `your-branch-name` branch:

```
git add .
git commit -m "done feature xyz"
git push origin your-branch-name
```

For this project, you will be required to develop a full-stack React/NodeJS application with a MySQL database. To develop the MySQL database, follow the same process as in MSci 245:

1. Open MySQL Workbench on your local machine and connect to

```
ec2-3-137-65-169.us-east-2.compute.amazonaws.com
```

with your UW username and password 'MSCI342'.

2. Once you are connected, open a Query window and select your database:

```
USE YourUserName;
```

where YourUserName is the same as in Step 1.

3. List all the tables visible to you.

```
SHOW TABLES;
```

Tip: Click on the icon highlighted in the figure below to only run the query with the cursor.

![image](/img/screen1.png)

4. You will see the list of tables that are currently in your database.

5. Create new tables required for your project task.

6. Write the React/NodeJS code required for your project task.

7. After you finish your development task, make sure that the app renders in the browser and functions according to the specifications.

8. Push changes to the GitHub:

```
git add .
git commit -m "meaningful message indicating what changes were made"
git push origin your-branch-name
```

9. In your GitHub repo, create new pull request. Ensure that other team members review and approve the changes. After that, merge `your-branch-name` branch with the `main` branch.
