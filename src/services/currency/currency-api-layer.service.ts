import { ENV, Currency } from "../../utils/enums/enums.js";
import { AbstractCurrencyService } from "./currency-abstract.service.js";

class CurrencyApiLayerService extends AbstractCurrencyService {
  async getRate({ fromCurrency = Currency.BTC, toCurrency = Currency.UAH }) {
    try {
      const queryParams = { from: fromCurrency, to: toCurrency, amount: 1 };
      const rateResponse = await this.httpRepository.load(
        ENV.CURRENCY.API_LAYER.URL,
        {
          queryParams,
          headers: {
            apikey: ENV.CURRENCY.API_LAYER.API_KEY,
          },
        }
      );

      const rateData = await rateResponse.json();

      return rateData.result;
    } catch (e) {
      return super.getRate({ fromCurrency, toCurrency });
    }
  }
}

export { CurrencyApiLayerService };
