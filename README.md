# README for Email Sender Tool

This tool allows you to send personalized emails to HRs or recruiters using data from an Excel file. It utilizes Node.js, xlsx, and nodemailer to streamline the email-sending process.

# Features

Reads email data from an Excel file.
Sends personalized emails to each recipient.
Supports customizable email templates.
Allows delays between emails to prevent spam detection.

# Prerequisites

Before you begin, ensure you have the following installed:
Node.js (LTS version recommended).
A Gmail account with App Passwords and 2 Factor Authentication enabled.

# How to Use
1. Clone the Repository
   git clone ```https://github.com/Priyanshu279/JetMail.git```

2. Open Terminal (CMD equivalent on Mac).
Use the cd command to navigate to the folder where your script is located. For example: ```cd /path/to/JetMail```
Replace ```/path/to/JetMail``` with the actual path to the folder containing your script.

3. Install Dependencies
Install the required Node.js packages using npm:
```npm install xlsx nodemailer```

5. Prepare Your Excel File
Create an Excel file (list.xlsx) in the root directory of the project.
The Excel file should have a sheet with the following columns:
- Name (Recipient's name)
- Company (Company name)
- Email (Recipient's email address)
- Role (Job role you're applying for)
- Link (Optional job link)

Example Excel Data:

| Name        | Company     | Email                  | Role               | Link                 |
|-------------|-------------|------------------------|--------------------|----------------------|
| John Smith  | Google      | john.smith@gmail.com   | Software Engineer  |     [Job Link]       |
| Jane Doe    | Microsoft   | jane.doe@microsoft.com | Frontend Developer |     [Job Link]       |
	
6. Update the Script
Open the sendEmails.js file.
Update the following fields with your information:
- user: "your-email@gmail.com",        // Replace with your Gmail address
- pass: "your-app-password",           // Replace with your Gmail App Password

Make sure the sheetName matches your Excel sheet name:
- ```const sheetName = 'Sheet1';``` // Replace 'Sheet1' with the actual sheet name

7. Run the Script
Run the script to send emails:
```node sendEmails.js```

# How It Works
* The script reads the data from list.xlsx.
* For each row in the sheet:
* It extracts the recipient's details.
* Constructs a personalized email using the provided template.
* Sends the email using Gmail's server.
* Adds a random delay between emails to avoid triggering spam filters.

# Example Output:
* Email sent to john.smith@gmail.com
* Email sent to jane.doe@microsoft.com
* Done Sending mails

# Error Handling
If an email fails to send, the script logs the error with the recipient's email.

# Important Notes
Avoid Spamming:
Send emails responsibly.
Use a delay between emails (configured in the script) to prevent Gmail from flagging your account,Gmail allows a maximum of 500 emails in a 24-hour period. For higher email volumes, consider using Google Workspace, which supports larger limits.

# Contribute
If you’d like to contribute, feel free to fork the repository and submit a pull request.
