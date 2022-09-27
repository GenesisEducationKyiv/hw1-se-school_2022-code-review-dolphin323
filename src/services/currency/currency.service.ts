import { IHttpRepository } from "src/repositories/http/http.repository.js";
import { ENV, Currency } from "../../utils/enums/enums.js";
import { ICurrencyService } from "./types.js";

class CurrencyService implements ICurrencyService {
  httpRepository: IHttpRepository;
  constructor(httpRepository: IHttpRepository) {
    this.httpRepository = httpRepository;
  }

  async getRate({ fromCurrency = Currency.BTC, toCurrency = Currency.UAH }) {
    const queryParams = { fsym: fromCurrency, tsyms: toCurrency };
    const rateResponse = await this.httpRepository.load(
      ENV.CRYPTO_COMPARE.URL || "",
      {
        queryParams,
      }
    );

    const rateData = await rateResponse.json();

    return rateData;
  }
}

export { CurrencyService };
