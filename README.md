# Profected

README updated February 25th 2024

## Application Rundown

- The navigation bar at the top of the application redirects the user to different pages - Home - Matching - MainCalendar - Resources - VideoEmbedding - User profile
  Note: The team plans on changing the names of pages in the navigation bar

### Home

- On the home page, the user is brought to the login box where they will need to enter their own user name and password to login
- If users do not have an account, they can click on the "Sign Up" button, to create an account
- To create an account, the user will need to complete the fields (error handling is working for the sign up page)
- The user can sign up and their information is stored in our database

- To test the login page, use hardcoded data: - Username:testuser - Password: testpassword

- We will work on implementing the stored user information from the database to authenticate login in the next sprint.

### Matching

- Student is capable of selecting their information to get matched with an industry professional
- Student can select their study of program
- Student can select their career interests
- Student can enter the list of dates that will work for them for meetings
- Student can enter a range of time that works for them to meet during the dates they have selected

### MainCalendar

- Calendar of current month and year currently renders on the page
- User can select "back" to go a month back, user can select "next" to go the next month
- Hardcoded data is shown on the calendar, for example for the month of April, user can see "sprint1" show up on the calendar (Note: random data was hardcoded into the calendar for rendering purposes)
- User can view calendar in "Month", "Week", "Day" and "Agenda" form
- User can also enter a new event that will render on calendar (midst of saving data on SQL database)

### Resources

- To be worked on next Sprint

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
