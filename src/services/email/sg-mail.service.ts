import sgMail from "@sendgrid/mail";

class SgMailService {
  constructor (API_KEY: string) {
    sgMail.setApiKey(API_KEY);
  }

  async sendMessage(data: any) {
    try {
      await sgMail.send(data);
    } catch (error: any) {
      throw new Error(
        JSON.stringify({
          code: error.code,
          message: new Error(error.message),
        })
      );
    }
  }
}

export { SgMailService };
