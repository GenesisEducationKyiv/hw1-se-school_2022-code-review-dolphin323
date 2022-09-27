import { EmailModel } from "../../common/models/models.js";
import { ExceptionMessage } from "../../utils/enums/enums.js";
import { IEmailService } from "./types.js";

class EmailService implements IEmailService {
  mailRepository: any;
  storage: any;
  constructor (storage: any, mailRepository: any) {
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

    const failedSendingEmails = await this.mailRepository.sendMessages(emails, html, subject);

    return failedSendingEmails;
  }
}

export { EmailService };
