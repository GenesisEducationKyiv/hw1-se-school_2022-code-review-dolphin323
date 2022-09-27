import { IHttpRepository } from "src/repositories/http/http.repository";

interface ICurrencyService {
  httpRepository: IHttpRepository;
  getRate: ({
    fromCurrency,
    toCurrency,
  }: {
    fromCurrency?: string;
    toCurrency?: string;
  }) => Promise<any>;
}

export { ICurrencyService };
