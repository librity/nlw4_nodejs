import { resolve } from "path";
import fs from "fs";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";

interface SurveyAnswerEmailData {
  userName: string;
  userEmail: string;

  surveyTitle: string;
  surveyDescription: string;

  suveyAnswerId: string;
}

class SurveyAnswersMailer {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async call({
    userName,
    userEmail,

    surveyTitle,
    surveyDescription,

    suveyAnswerId,
  }: SurveyAnswerEmailData) {
    const viewPath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "mailers",
      "new_survey_answer.hbs"
    );
    const rawView = fs.readFileSync(viewPath).toString("utf-8");
    const parseView = handlebars.compile(rawView);
    const parsedView = parseView({
      userName,
      title: surveyTitle,
      surveyDescription,
      baseUrl: process.env.APP_URL,
      suveyAnswerId,
    });

    let message = {
      to: userEmail,
      subject: surveyTitle,
      html: parsedView,
      from: "NPS <noreply@nps.com.br>",
    };

    const sentMessage = await this.client.sendMail(message);

    console.log("Message sent: %s", sentMessage.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sentMessage));
  }
}

export default new SurveyAnswersMailer();
