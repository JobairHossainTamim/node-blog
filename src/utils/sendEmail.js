const nodemail = require("nodemailer");

const sendEmail = async ({ emailTo, subject, code, content }) => {
  const transporter = nodemail.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "likeabletamim@gmail.com",
      pass: "cjlmnwrrmqqkzdsm",
    },
  });
  const message = {
    to: emailTo,
    subject,
    html: `
        
        <div>
        <h3> User this bellow code to ${content} </h3>
        <p<strong>Code : </strong> ${code}</p>
        </div>
        `,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;
