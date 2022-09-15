import { Currency } from "../../utils/enums/enums";
import { IHttpRepository } from "../../repositories/http/http.repository";

interface ICurrencyServiceCommonMethods {
  getRate: ({
    fromCurrency,
    toCurrency,
  }: {
    fromCurrency?: Currency;
    toCurrency?: Currency;
  }) => Promise<number>;
}

interface ICurrencyServiceVariables {
  httpRepository: IHttpRepository;
}
interface ICurrencyServiceChainOfResponsibility {
  nextHandler: ICurrencyService | undefined;
  setNext(handler: ICurrencyService): ICurrencyService;
}

type ICurrencyService = ICurrencyServiceCommonMethods &
  ICurrencyServiceVariables &
  ICurrencyServiceChainOfResponsibility;

export { ICurrencyService };
