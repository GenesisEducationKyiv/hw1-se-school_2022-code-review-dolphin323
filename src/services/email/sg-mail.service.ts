import sgMail, { MailDataRequired } from "@sendgrid/mail";
import { EmailModel } from "../../common/models/models.js";
import { ExceptionMessage, HttpCode, SgMailException } from "../../utils/enums/enums.js";
import { createMail } from "../../utils/helpers/helpers.js";

class SgMailService {
  constructor (API_KEY: string) {
    sgMail.setApiKey(API_KEY);
  }

  async sendMessage(data: MailDataRequired) {
    try {
      await sgMail.send(data);
    } catch (error: any) {
      throw new Error(
        JSON.stringify({
          code: error.code,
          message: new Error(error.message),
        })
      );
    }
  }

  async sendMessages(emails: EmailModel[], html: string, subject: string) {
    const failedSendingEmails: any[] = [];

    await Promise.all(
      emails.map(async (item: any) => {
        try {
          await this.sendMessage(
            createMail({ html, subject, to: item.email }) as MailDataRequired
          );
        } catch (error: any) {
          if (error.code === HttpCode.UNAUTHORIZED) {
            throw new Error(SgMailException.UNAUTHORIZED);
          }
          failedSendingEmails.push(item.email);
        }
      })
    );

    if (failedSendingEmails.length === emails.length) {
      throw new Error(ExceptionMessage.BAD_REQUEST);
    }

    return failedSendingEmails;
  }
}

export { SgMailService };
