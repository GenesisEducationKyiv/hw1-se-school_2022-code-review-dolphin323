import { currencyService, emailService } from "../../../config/services/services.config.js";
import { ApiController } from "../../../controllers/controllers.js";

const apiController = new ApiController(emailService, currencyService);

export { apiController };