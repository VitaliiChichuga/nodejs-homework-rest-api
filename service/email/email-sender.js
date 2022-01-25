import nodemailer from "nodemailer";

class EmailSender {
  async send(message) {
    const config = {
      host: "smtp.ukr.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SENDER,
        pass: process.env.SENDER_PASSWORD,
      },
      };
      const transporter = nodemailer.createTransport(config)
      return await transporter.sendMail({
          ...message,
          from: process.env.SENDER
      })
  }
}

export default EmailSender;
