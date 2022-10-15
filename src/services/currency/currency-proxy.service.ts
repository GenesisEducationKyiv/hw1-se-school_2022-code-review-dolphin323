import { getDifferenceInMinutes } from "../../utils/helpers/helpers.js";
import { IHttpRepository } from "../../repositories/http/http.repository.js";
import { Currency } from "../../utils/enums/enums.js";
import { AbstractCurrencyService } from "./currency-abstract.service.js";
import { ICurrencyService } from "./types.js";

class CurrencyProxyService extends AbstractCurrencyService {
  private currencyService: ICurrencyService;
  private cachedCurrencyRate: number | null = null;
  private TIME_TO_UPDATE_IN_MINUTES = 5;
  private LAST_TIME_OF_REQUEST: Date | null = null;

  constructor(
    currencyService: ICurrencyService,
    httpRepository: IHttpRepository
  ) {
    super(httpRepository);
    this.currencyService = currencyService;
  }

  async getRate({ fromCurrency = Currency.BTC, toCurrency = Currency.UAH }) {
    if (this.checkShouldReturnCachedData()) {
      return this.cachedCurrencyRate as number;
    } else {
      const rate = await this.currencyService.getRate({
        fromCurrency,
        toCurrency,
      });

      this.cachedCurrencyRate = rate;
      this.LAST_TIME_OF_REQUEST = new Date();

      return rate;
    }
  }

  private checkShouldReturnCachedData(): boolean {
    if (this.LAST_TIME_OF_REQUEST) {
      if (
        getDifferenceInMinutes(new Date(), this.LAST_TIME_OF_REQUEST) <
        this.TIME_TO_UPDATE_IN_MINUTES
      ) {
        return true;
      }
    }

    return false;
  }
}

export { CurrencyProxyService };
