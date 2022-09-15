import fs from "fs";
import { IJsonStorage } from "./types";

class JsonStorageRepository implements IJsonStorage {
  filePath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  getAll() {
    const jsonText = fs.readFileSync(this.filePath);
    const jsonAll = JSON.parse(jsonText.toString());

    return jsonAll;
  }

  getByKey(key: string) {
    const file = this.getAll();

    return file[key];
  }

  writeByKey({ key, items }) {
    const file = this.getAll();
    file[key] = items;
    this.writeAll(file);
  }

  writeAll(filePath: string) {
    fs.writeFileSync(this.filePath, JSON.stringify(filePath, null, 2));
  }
}

export { JsonStorageRepository };
