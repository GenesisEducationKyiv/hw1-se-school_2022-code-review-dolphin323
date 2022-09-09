class JsonStorageEmailRepository {
  storageKeys = { nextId: "nextId", emails: "emails" };

  constructor(storage) {
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
    return this.storage.getByKey(this.storageKeys.emails);
  }

  writeEmails(emails) {
    this.storage.writeByKey({
      items: emails,
      key: this.storageKeys.emails,
    });
  }

  pushEmail(email) {
    const emails = this.getEmails();
    const newEmails = [...emails, email];
    this.writeEmails(newEmails);
    const id = this.incrementNextId();

    return id;
  }
}

export { JsonStorageEmailRepository };
