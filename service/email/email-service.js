import Mailgen from "mailgen";

class EmailService {
  constructor(env, sender) {
    this.sender = sender
    switch (env) {
      case 'development':
        this.link = 'http://localhost:8900/'
        break
      case 'test':
        this.link = 'http://localhost:5000/'
        break
      case 'production':
        this.link = 'http://heroku/'
        break
      default:
        this.link = 'http://localhost:8900/'
    }
  }

  createTemplate(verifyToken) {
      const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Group 35",
        link: this.link,
      },
    });

    const email = {
      body: {
        name: 'Dear USER))',
        intro: "Welcome! We're very excited to have you on board.",
        action: {
          instructions: "To get started with our API, please click here:",
          button: {
            color: "#f1c0e8", 
            text: "Confirm your account",
            link: `${this.link}api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };    
      return  mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, verifyToken) {
      
        const emailBody = this.createTemplate( verifyToken)
        const message = {
            to: email,
            subject: 'Verify email',
            html: emailBody
        }

        try {
            const result = await this.sender.send(message)
          console.log(result);

            return true
        } catch (error) {
            console.error(error.message)
        }
  }
}
export default EmailService;
