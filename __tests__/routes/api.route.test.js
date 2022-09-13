import {
  ExceptionMessage,
  HttpCode,
  HttpResponseMessage,
} from "../../utils/enums/enums.js";
import { build } from "../__utils__/helpers/app/app.helper.js";

describe("testing endpoints", () => {
  const app = build();

  describe("'/api/rate' endpoint", () => {
    test("should return 200 and number response", async () => {
      const response = await app.inject("/api/rate");

      expect(response.statusCode).toBe(HttpCode.OK);
      expect(typeof response.json()).toBe("number");
    });
  });

  describe("'/api/subscribe' endpoint", () => {
    test("should return 400 and correct message if body is empty", async () => {
      const response = await app.inject().post("/api/subscribe");

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.body).toBe(HttpResponseMessage.NO_EMAIL);
    });

    test("should return 400 and correct message if email is empty", async () => {
      const response = await app
        .inject()
        .post("/api/subscribe")
        .body({ email: "" });

      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
      expect(response.body).toBe(HttpResponseMessage.WRONG_EMAIL_FORMAT);
    });
  });

  describe("'/api/sendEmails' endpoint", () => {
    test("should return 200", async () => {
      const response = await app.inject().post("/api/sendEmails");

      expect(response.statusCode).toBe(HttpCode.OK);
    });
  });

  describe("invalid endpoint", () => {
    test("should return 404 and correct message", async () => {
      const response = await app.inject("/invalid-endpoint");

      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
      expect(response.body).toBe(ExceptionMessage.HANDLER_NOT_FOUND);
    });
  });
});
