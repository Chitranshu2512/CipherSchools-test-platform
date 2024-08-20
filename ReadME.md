# Test Application

## Overview

This application allows users to take a test via a provided link and credentials. The application includes features for user authentication, test navigation, camera and microphone permissions, and test submission.

## Assumptions

1. **Admin Responsibilities**: 
   - The admin will provide a test URL and credentials to the user via email.
   - The provided credentials will be used to access the test.

2. **Test URL and Credentials** (for development purposes):
   - **Test Link**: [http://localhost:5173/?testId=66c24be05c552c76d02ace93](http://localhost:5173/?testId=66c24be05c552c76d02ace93)
   - **Email**: chitranshukushwaha01@gmail.com
   - **Password**: cipherSchool

## Workflow

1. **Receive Test Details**:
   - The user will receive an email from the admin containing the test URL and credentials.

2. **Access the Test**:
   - The user clicks on the provided test link which redirects to the login page.
   - The user enters the provided email and password to authenticate.

3. **Authentication and Redirection**:
   - If the credentials are correct, the user is redirected to the **Test Dashboard**.
   - The Test Dashboard displays the test instructions and a "Start Test" button.

4. **Start the Test**:
   - Upon clicking the "Start Test" button, the application requests camera and microphone permissions.
   - A camera preview is displayed to the user, and they must grant permission to proceed.

5. **Test Environment**:
   - After permissions are granted, the user is redirected to the **Test Environment** page.
   - The Test Environment includes:
     - **Questions**: The user faces a series of questions.
     - **Timer**: A timer is displayed to track the time remaining.
     - **Navigation**:
       - **Question Board**: Located on the side of the test environment to navigate between questions.
       - **Prev and Next Buttons**: Allow the user to move between questions.
       - **Mark for Review Button**: Allows the user to mark specific questions for review.

6. **Submit the Test**:
   - After attempting all questions, the user clicks the "Submit" button.
   - The submission response is saved into the database.

7. **Completion**:
   - Upon successful submission, the user is redirected to the **Finish Page**.
   - The Finish Page thanks the user for participating in the test.

8. **Result declaration**:
   - after successful submission, the user will get the auto generated email.
   - The email will have the result of the user with obtained marks and percentage.


## How to Run the Project (for Development)

1. **Clone the Repository**:
   
   git clone https://github.com/Chitranshu2512/CipherSchools-test-platform.git


2. **navigate to the client directory**:
    cd client

3. **Install Dependencies**:
   npm install

4. **Start the Application:**:
    npm run dev

5. **navigate to the server directory**:
    cd server

6. **Install Dependencies**:
   npm install

7. **Start the Application:**:
    npm run dev

8. **Access the Test**:
    Open a web browser and navigate to the provided test URL.

## Mock test result email:
[Screenshot](Screenshot%202024-08-21%20020008.png)

