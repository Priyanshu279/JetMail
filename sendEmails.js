// Import required modules
const fs = require('fs'); // File system module for reading files
const xlsx = require('xlsx'); // Library for working with Excel files
const nodemailer = require('nodemailer'); // Library for sending emails
const { exit } = require('process'); // Used to terminate the script
// download the above packages

// Load your Excel file
const workbook = xlsx.readFile('./list.xlsx'); // Path for the sheet in your local folder
const sheetName = 'Sheet1'; // Change to the name of your sheet
const worksheet = workbook.Sheets[sheetName]; // Access the specified sheet
const data = xlsx.utils.sheet_to_json(worksheet); // Convert the sheet data to JSON format

// Email configuration
const newTransporter = ()=>{
  // Create a transporter for sending emails
  return nodemailer.createTransport({
    pool: true, // Use pooled connections for better performance
    host: "smtp.gmail.com", // SMTP server for Gmail
    port: 465, // Port for secure email
    secure: true, // Use SSL for secure connection
    auth: {
      user: "your-email@gmail.com",// Your Gmail address
      pass: "pass pass pass pass"// Your Gmail app password (not your email password)
    },
  });
}
const transporter = newTransporter(); // Initialize the transporter

// Function to send an individual email
const sendEmail = async (row) => {
  // Extract relevant data from the row
  const { Name, Company, Email, Role} = row; // Adjust column names accordingly in your excel sheet
  const nameParts = Name.split(' '); // Split the name into parts
  const name = nameParts[0]; // Use the first name for a personalized greeting

  // Define email options
  const mailOptions = {
    from: 'Priyanshu Suryavanshi <your-email@gmail.com>', // Sender information
    to: Email,// Recipient email address
    subject: `Request for an Interview Opportunity - ${Role} at ${Company}`, // Email subject
    html: `
<p>Greetings ${name},</p>
<p>I'm Priyanshu Suryavanshi, a Software Developer. I got to know through your linkedin post that <b>${Company}</b> is looking for a <b>${Role}</b>, therefore, I have mailed you to tell you about myself. I have: 
<ul>
<li><b>1 year of professional experience</b> as an <b>Associate Software Engineer</b> at <a href="https://xyz.com/global/en/">XYZ</a>, focusing on insurance and banking domains.</li>
<li>Built <b>Java-based APIs</b> for customer profile creation and optimized SQL queries, improving database performance by 30%.</li>
<li>Worked extensively with <b>React.js, Node.js, JavaScript, Spring Boot, Selenium, and Postman</b>.</li>
<li>Hands-on experience in <b>Agile methodologies</b> and collaborating with cross-functional teams to deliver high-quality software.</li>
<li>Completed projects such as:
  <ul>
    <li><b>Expense Tracker:</b> A scalable React-based budget tracker with voice-enabled features using Speechly.</li>
    <li><b>Code Sync:</b> A real-time collaborative coding platform with Node.js, Express.js, and Socket.io.</li>
    <li><b>ANPR System:</b> Automated license plate recognition using Python, OpenCV, and OCR.</li>
  </ul>
</li>
<li>Bachelor's in Computer Science from  <b>ABC University, 2023 Grad </b></li>
</ul>

<p>I am available to <b>join within 15 days</b> of receiving an offer. A little help from your side can significantly help my career.</p>
<p>PS: I have attached my <b><a href="https://drive.google.com/file/d/1nA1eWbSa-UIHYkqNRNeSVMhjFuyq6uxW/view?imp=sharing">Resume</a></b> & <b><a href="https://www.linkedin.com/in/priyanshu/">Linkedin Profile</a></b> for your reference. If you find me suitable, please help me with an Interview Opportunity at ${Company}.</p><br><br>

Thanking You<br>
Regards,<br>
<b>Priyanshu Suryavanshi</b> <br>
<b>Contact No: +91 9000000000</b><br>
<b>Email: <a href="mailto:your-email@gmail.com">your-email@gmail.com</a></b>
</p>`
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent to', Email); // Log success message
  } catch (error) {
    console.error('Error sending email:', Email, error);// Log error if email fails
  }
};

// Function to send emails one by one with a delay
const sendEmailsSynchronously = async () => {
  for (const row of data) {
    await sendEmail(row);// Send email to the current recipient
    await new Promise((resolve) => setTimeout(resolve, Math.random()*90000)); // Pause for 1 minute (adjust the duration as needed)
  }
  console.log("Done Sending mails");// Log completion message
  exit(); // Exit the script
};

// Call the function to send emails
sendEmailsSynchronously(); 
