const fs = require('fs');
const xlsx = require('xlsx');
const nodemailer = require('nodemailer');
const { exit } = require('process');
// download the above packages

// Load your Excel file
const workbook = xlsx.readFile('./list.xlsx'); // Path for the sheet in your local folder
const sheetName = 'Sheet1'; // Change to the name of your sheet
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);

// Email configuration
const newTransporter = ()=>{
  return nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {

      user: "your-email@gmail.com",
      pass: "pass pass pass pass"
    },
  });
}
const transporter = newTransporter();
const sendEmail = async (row) => {
  const { Name, Company, Email, Role} = row; // Adjust column names accordingly
  const nameParts = Name.split(' ');
  const name = nameParts[0];
  const mailOptions = {
    from: 'Priyanshu Suryavanshi <your-email@gmail.com>',
    to: Email,
    subject: `Request for an Interview Opportunity - ${Role} at ${Company}`,
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
    await transporter.sendMail(mailOptions);
    console.log('Email sent to', Email);
  } catch (error) {
    console.error('Error sending email:', Email, error);
  }
};

const sendEmailsSynchronously = async () => {
  for (const row of data) {
    await sendEmail(row);
    await new Promise((resolve) => setTimeout(resolve, Math.random()*90000)); // Pause for 1 minute (adjust the duration as needed)
  }
  console.log("Done Sending mails")
  exit()
};

// Call the function to send emails
sendEmailsSynchronously(); 