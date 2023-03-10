# CSMessagingApp

The application has been built using the MERN (MongoDB, Express.js, React.js and Node.js) stack. The application consists of two sections, User and Employee. The User section mimics an Android application wherein the users can send their queries. It sends the data to the backend using REST API and stores the data in the MongoDB database.

The employee section shows all the open tickets and the employee can choose to view, close, assign or unassign tickets. 

**Installation**

You are required to install the following to run the application,

1. Visual Studio Code
2. Node.js
3. Express.js
4. React.js

MongoDB was used as a NoSQL Database.

**Additional Dependencies**

The `package.json` in the root directory has all the dependencies listed such as date-fns, dot.env etc.
For the front end, the `package.json` file in the Client folder mentions the dependencies used such as react-query, axios, react-router.

**Features Implemented**

Along with the basic functionality, the application lets you,

1. Mark the important tickets based on a collection of predefined important keywords.
2. Assign/Unassign tickets to a specific employee so that other employees don't have access to that ticket until the first employee decides to leave the ticket.
