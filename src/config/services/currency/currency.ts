import { ICurrencyService } from "../../../services/currency/types.js";
import { initCurrencyService } from "./helpers/init-currency-service.js";

const currencyService: ICurrencyService = initCurrencyService();

export { currencyService };
