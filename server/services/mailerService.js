// eslint-disable-next-line import/no-extraneous-dependencies
import nodeMailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export default class Mailer {
  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_USER_PASS,
      },
    });
  }

  async sendMail(to, subject, templateName, data) {
    const html = await ejs.renderFile(path.join("views", templateName), data);
    await this.transporter.sendMail({
      from: `<${this.transporter.transporter.name}>`,
      to,
      subject,
      html,
    });
  }
}
