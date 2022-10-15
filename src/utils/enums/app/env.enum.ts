import { config } from "dotenv";

config();

const {
  APP_PORT,
  SENDGRID_API_KEY,
  SENDGRID_VERIFIED_SENDER,
  CRYPTO_COMPARE_URL,
  EXCHANGE_RATE_URL,
  API_LAYER_URL,
  API_LAYER_API_KEY,
  CRYPTO_CURRENCY_PROVIDER,
} = process.env;

const ENV = {
  APP: {
    API_PATH: "/api",
    PORT: Number(APP_PORT) ?? 3000,
    HOST: "0.0.0.0",
  },
  SENDGRID: {
    API_KEY: SENDGRID_API_KEY || '',
    VERIFIED_SENDER: SENDGRID_VERIFIED_SENDER,
  },
  CURRENCY: {
    CRYPTO_COMPARE: {
      URL: CRYPTO_COMPARE_URL || "https://min-api.cryptocompare.com/data/price",
    },
    EXCHANGE_RATE: {
      URL: EXCHANGE_RATE_URL || "https://api.exchangerate.host/convert",
    },
    API_LAYER: {
      URL: API_LAYER_URL || "https://api.apilayer.com/currency_data/convert",
      API_KEY: API_LAYER_API_KEY,
    },
  },
  CRYPTO_CURRENCY_PROVIDER,
};

export { ENV };
