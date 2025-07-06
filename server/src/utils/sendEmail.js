import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bishalbomjan747@gmail.com",
    pass: "",
  },
});

function sendEmail(userEmail) {
  let mailOptions = {
    from: "bishalbomjan747@gmail.com",
    to: userEmail,
    subject: "You have been approved",
    html: "<h1>Welcome</h1><p>to Food Hunt!</p>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export default sendEmail;
