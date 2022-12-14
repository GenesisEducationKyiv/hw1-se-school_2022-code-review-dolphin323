import { ICurrencyService } from "../services/currency/types.js";
import {
  Currency,
  HttpCode,
  HttpResponseMessage,
  ExceptionMessage,
  SgMailException,
} from "../utils/enums/enums.js";
import { getMailTemplate, validateEmail } from "../utils/helpers/helpers.js";

class ApiController {
  emailService: any;
  currencyService: ICurrencyService;
  constructor (emailService, currencyService: ICurrencyService) {
    this.emailService = emailService;
    this.currencyService = currencyService;
  }

  async getRate(req, res) {
    try {
      const rateData = await this.currencyService.getRate({});
      res.status(HttpCode.OK).send(rateData);
    } catch (error: any) {
      if (error.message === ExceptionMessage.COULDNT_GET_RATE) {
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .send(HttpResponseMessage.COULDNT_GET_RATE);
      } else {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
      }
    }
  }

  async postSubscribe(req, res) {
    const email = req.body.email;

    if (!validateEmail(email)) {
      res
        .status(HttpCode.BAD_REQUEST)
        .send(HttpResponseMessage.WRONG_EMAIL_FORMAT);

      return;
    }

    try {
      this.emailService.addEmail(email);

      res.status(HttpCode.OK).send(HttpResponseMessage.EMAIL_ADDED);
    } catch (error: any) {
      if (error.message === ExceptionMessage.EMAIL_ALREADY_EXISTS) {
        res.status(HttpCode.CONFLICT).send(HttpResponseMessage.EMAIL_EXISTS);
      } else {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
      }
    }
  }

  async postSendEmails(req, res) {
    const rateData = await this.currencyService.getRate({});
    const mail = getMailTemplate.currentRate(rateData[Currency.UAH]);

    try {
      const failedSendingEmails =
        await this.emailService.sendMessageToAllEmails(mail);

      res
        .status(HttpCode.OK)
        .send(
          HttpResponseMessage.EMAILS_SENT +
          `${failedSendingEmails.length
            ? " " +
            HttpResponseMessage.EMAILS_FAILED +
            " " +
            failedSendingEmails.join(",")
            : ""
          }`
        );
    } catch (error: any) {
      if (error?.message === ExceptionMessage.BAD_REQUEST) {
        res.status(HttpCode.BAD_REQUEST).send(error.message);
      }
      if (error?.message === SgMailException.UNAUTHORIZED) {
        res.status(HttpCode.UNAUTHORIZED).send(error.message);
      }
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}

export { ApiController };
