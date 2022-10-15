import { HttpRepository } from "../../../../repositories/repositories.js";
import { ENV, CurrencyProvider } from "../../../../utils/enums/enums.js";
import { ICurrencyService } from "../../../../services/currency/types.js";
import {
  CurrencyApiLayerService,
  CurrencyCryproCompareService,
  CurrencyExchangeRateService,
  CurrencyLoggingService,
  CurrencyProxyService
} from "../../../../services/services.js";

type CurrencyServices = {
  cryptoCompareService: ICurrencyService;
  exchangeRateService: ICurrencyService;
  apiLayerService: ICurrencyService;
};

const initCryptoCompareChain = (currencyServices: CurrencyServices) => {
  const { cryptoCompareService, exchangeRateService, apiLayerService } =
    currencyServices;

  cryptoCompareService.setNext(exchangeRateService);
  exchangeRateService.setNext(apiLayerService);

  return cryptoCompareService;
};

const initExchangeRateChain = (currencyServices: CurrencyServices) => {
  const { cryptoCompareService, exchangeRateService, apiLayerService } =
    currencyServices;

  exchangeRateService.setNext(apiLayerService);
  apiLayerService.setNext(cryptoCompareService);

  return exchangeRateService;
};

const initApiLayerChain = (currencyServices: CurrencyServices) => {
  const { cryptoCompareService, exchangeRateService, apiLayerService } =
    currencyServices;

  apiLayerService.setNext(cryptoCompareService);
  cryptoCompareService.setNext(exchangeRateService);

  return apiLayerService;
};

const getCurrencyServiceChained = (currencyServices: CurrencyServices) => {
  switch (ENV.CRYPTO_CURRENCY_PROVIDER) {
    case CurrencyProvider.CRYPTO_COMPARE:
      return initCryptoCompareChain(currencyServices);
    case CurrencyProvider.EXCHANGE_RATE:
      return initExchangeRateChain(currencyServices);
    case CurrencyProvider.API_LAYER:
      return initApiLayerChain(currencyServices);
    default:
      return initCryptoCompareChain(currencyServices);
  }
};

const initCurrencyService = () => {
  const cryptoCompareService = new CurrencyCryproCompareService(
    new HttpRepository()
  );
  const exchangeRateService = new CurrencyExchangeRateService(
    new HttpRepository()
  );
  const apiLayerService = new CurrencyApiLayerService(new HttpRepository());

  const currencyServices = {
    cryptoCompareService,
    exchangeRateService,
    apiLayerService,
  };

  const currencyService: ICurrencyService =
    getCurrencyServiceChained(currencyServices);

  const proxyCurrencyService = new CurrencyProxyService(
    currencyService,
    new HttpRepository()
  );

  const loggingCurrencyService = new CurrencyLoggingService(
    proxyCurrencyService,
    new HttpRepository()
  );

  return loggingCurrencyService;
};

export { initCurrencyService };
