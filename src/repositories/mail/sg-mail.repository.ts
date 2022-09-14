import sgMail from "@sendgrid/mail";

class SgMailRepository {
  constructor(API_KEY) {
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

export { SgMailRepository };
