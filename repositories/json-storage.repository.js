import fs from "fs";

class JsonStorageRepository {
  constructor(filePath) {
    this.filePath = filePath;
  }

  getAll() {
    const jsonText = fs.readFileSync(this.filePath);
    const jsonAll = JSON.parse(jsonText);

    return jsonAll;
  }

  getByKey(key) {
    const file = this.getAll();

    return file[key];
  }

  writeByKey({ key, items }) {
    const file = this.getAll();
    file[key] = items;
    this.writeAll(file);
  }

  writeAll(file) {
    fs.writeFileSync(this.filePath, JSON.stringify(file, null, 2));
  }
}

export { JsonStorageRepository };
