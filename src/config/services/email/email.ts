import { EmailStorageRepository, JsonStorageRepository } from "../../../repositories/repositories.js";
import { EmailService, SgMailService } from "../../../services/services.js";
import { FilePath, ENV } from "../../../utils/enums/enums.js";

const emailService = new EmailService(
    new EmailStorageRepository(
        new JsonStorageRepository(FilePath.emailsFile)
    ),
    new SgMailService(ENV.SENDGRID.API_KEY)
);

export { emailService }