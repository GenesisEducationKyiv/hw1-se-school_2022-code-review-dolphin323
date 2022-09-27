import fetch from "cross-fetch";
import qs from "qs";
import { ExceptionMessage, HttpMethod } from "../../utils/enums/enums.js";

interface IHttpRepository {
  load: (url: string, options: any) => Promise<Response>;
}

class HttpRepository implements IHttpRepository {
  async load(url: string, options: any) {
    const headers = options.headers || {};
    const queryString = options.queryParams
      ? `?${qs.stringify(options.queryParams)}`
      : ".js";
    const method = options.method || HttpMethod.GET;
    let body;

    if (options.body) {
      if (method === HttpMethod.GET) {
        throw new Error(ExceptionMessage.SHOULDNT_HAVE_BODY);
      }

      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json.js";
    }

    const response = await fetch(url + queryString, {
      method,
      headers,
      ...(method === HttpMethod.GET ? {} : { body }),
    });

    return response;
  }
}

export { HttpRepository, IHttpRepository };
