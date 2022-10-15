import { EmailModel } from "../../common/models/models.js";
import {
  ExceptionMessage,
  HttpCode,
  SgMailException,
} from "../../utils/enums/enums.js";
import { createMail } from "../../utils/helpers/helpers.js";
import { IEmailService } from "./types.js";

class EmailService implements IEmailService {
  mailRepository: any;
  storage: any;
  constructor(storage: any, mailRepository: any) {
    this.storage = storage;
    this.mailRepository = mailRepository;
  }

  getEmails() {
    const emails: EmailModel[] = this.storage.getEmails();

    return emails;
  }

  addEmail(email: string) {
    if (this.checkIfEmailExists(email)) {
      throw new Error(ExceptionMessage.EMAIL_ALREADY_EXISTS);
    }

    const id = this.storage.nextId;
    const newEmailItem = { id, email };
    this.storage.pushEmail(newEmailItem);

    return id;
  }

  checkIfEmailExists(email: string) {
    const emails = this.getEmails();
    const isEmailExists = emails.some((item) => item.address === email);

    return isEmailExists;
  }

  async sendMessageToAllEmails({
    html,
    subject,
  }: {
    html: string;
    subject: string;
  }) {
    const emails = this.getEmails();
    const failedSendingEmails: any[] = [];

    await Promise.all(
      emails.map(async (item: any) => {
        try {
          await this.mailRepository.sendMessage(
            createMail({ html, subject, to: item.email })
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

export { EmailService };
