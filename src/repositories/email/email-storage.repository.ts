import { EmailModel } from "../../common/models/models";

class EmailStorageRepository {
  storageKeys = { nextId: "nextId", emails: "emails" };
  storage: any;

  constructor (storage) {
    this.storage = storage;
  }

  get nextId() {
    return this.storage.getByKey(this.storageKeys.nextId);
  }

  incrementNextId() {
    this.storage.writeByKey({
      items: this.nextId + 1,
      key: this.storageKeys.nextId,
    });

    return this.nextId;
  }

  getEmails() {
    const emails: EmailModel[] = this.storage.getByKey(this.storageKeys.emails);

    return emails;
  }

  writeEmails(emails: EmailModel[]) {
    this.storage.writeByKey({
      items: emails,
      key: this.storageKeys.emails,
    });
  }

  pushEmail(email: EmailModel) {
    const emails = this.getEmails();
    const newEmails = [...emails, email];
    this.writeEmails(newEmails);
    const id = this.incrementNextId();

    return id;
  }
}

export { EmailStorageRepository };
