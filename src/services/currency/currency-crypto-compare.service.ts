import { ENV, Currency } from "../../utils/enums/enums.js";
import { AbstractCurrencyService } from "./currency-abstract.service.js";

class CurrencyCryproCompareService extends AbstractCurrencyService {
  async getRate({ fromCurrency = Currency.BTC, toCurrency = Currency.UAH }) {
    try {
      const queryParams = { fsym: fromCurrency, tsyms: toCurrency };
      const rateResponse = await this.httpRepository.load(
        ENV.CURRENCY.CRYPTO_COMPARE.URL,
        {
          queryParams,
        }
      );

      const rateData = await rateResponse.json();

      return rateData[toCurrency];
    } catch (e) {
      return super.getRate({ fromCurrency, toCurrency });
    }
  }
}

export { CurrencyCryproCompareService };
