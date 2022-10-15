import { IHttpRepository } from "../../repositories/http/http.repository.js";
import { Currency } from "../../utils/enums/enums.js";
import { AbstractCurrencyService } from "./currency-abstract.service.js";
import { ICurrencyService } from "./types.js";

class CurrencyLoggingService extends AbstractCurrencyService {
  private currencyService: ICurrencyService;

  constructor(
    currencyService: ICurrencyService,
    httpRepository: IHttpRepository
  ) {
    super(httpRepository);
    this.currencyService = currencyService;
  }

  async getRate({ fromCurrency = Currency.BTC, toCurrency = Currency.UAH }) {
    const rate = await this.currencyService.getRate({
      fromCurrency,
      toCurrency,
    });

    console.log(`Response rate: ${rate}`);

    return rate;
  }
}

export { CurrencyLoggingService };
