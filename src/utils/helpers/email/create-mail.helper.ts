import { INITIAL_MAIL } from "../../constants/constants.js";
import { ENV } from "../../enums/enums.js";

type CreateMail = {
  to: string;
  html: string;
  subject: string;
};

const createMail = ({ to, html, subject }: CreateMail) => {
  return {
    from: {
      email: ENV.SENDGRID.VERIFIED_SENDER,
      name: INITIAL_MAIL.fromName,
    },
    to: to || ENV.SENDGRID.VERIFIED_SENDER,
    subject: subject || INITIAL_MAIL.subject,
    html: html || INITIAL_MAIL.html,
  };
};

export { createMail };
