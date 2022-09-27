import { FilePath, ENV } from "../utils/enums/enums.js";
import {
  JsonStorageEmailRepository,
  JsonStorageRepository,
  SgMailRepository,
} from "./../repositories/repositories.js";
import { EmailService } from "./email/email.service.js";
import { ICurrencyService } from "./currency/types.js";
import { initCurrencyService } from "./currency/helpers/init-currency-service.js";

const emailService = new EmailService(
  new JsonStorageEmailRepository(
    new JsonStorageRepository(FilePath.emailsFile)
  ),
  new SgMailRepository(ENV.SENDGRID.API_KEY)
);

const currencyService: ICurrencyService = initCurrencyService();

export { emailService, currencyService };
