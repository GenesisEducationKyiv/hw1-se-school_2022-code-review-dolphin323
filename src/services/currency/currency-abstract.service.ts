import { IHttpRepository } from "../../repositories/http/http.repository.js";
import { Currency, ExceptionMessage } from "../../utils/enums/enums.js";
import { ICurrencyService } from "./types.js";

abstract class AbstractCurrencyService implements ICurrencyService {
  nextHandler: ICurrencyService | undefined;

  httpRepository: IHttpRepository;
  constructor(httpRepository: IHttpRepository) {
    this.httpRepository = httpRepository;
  }

  public setNext(handler: ICurrencyService): ICurrencyService {
    this.nextHandler = handler;

    return handler;
  }

  async getRate({ fromCurrency = Currency.BTC, toCurrency = Currency.UAH }) {
    if (this.nextHandler) {
      return this.nextHandler.getRate({ fromCurrency, toCurrency });
    }

    throw Error(ExceptionMessage.COULDNT_GET_RATE);
  }
}

export { AbstractCurrencyService };
