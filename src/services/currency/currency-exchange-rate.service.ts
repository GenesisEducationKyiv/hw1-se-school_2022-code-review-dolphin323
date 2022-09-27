import { ENV, Currency } from "../../utils/enums/enums.js";
import { AbstractCurrencyService } from "./currency-abstract.service.js";

class CurrencyExchangeRateService extends AbstractCurrencyService {
  async getRate({ fromCurrency = Currency.BTC, toCurrency = Currency.UAH }) {
    try {
      const queryParams = { from: fromCurrency, to: toCurrency };
      const rateResponse = await this.httpRepository.load(
        ENV.CURRENCY.EXCHANGE_RATE.URL,
        {
          queryParams,
        }
      );

      const rateData = await rateResponse.json();

      return rateData.result;
    } catch (e) {
      return super.getRate({ fromCurrency, toCurrency });
    }
  }
}

export { CurrencyExchangeRateService };
