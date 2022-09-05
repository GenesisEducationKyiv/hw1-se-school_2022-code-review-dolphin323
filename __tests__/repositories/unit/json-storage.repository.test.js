import fs from "fs";
import { JsonStorageRepository } from "../../../repositories/repositories.js";
import { FilePathMock } from "../../__utils__/enums/file-path/file-path.js";

describe("JsonStorageRepository", () => {
  const jsonStorageRepository = new JsonStorageRepository(FilePathMock.emails);

  let initialFileContent;

  beforeAll(() => {
    initialFileContent = JSON.parse(fs.readFileSync(FilePathMock.emails));
  });

  afterAll(() => {
    fs.writeFileSync(
      FilePathMock.emails,
      JSON.stringify(initialFileContent, null, 2)
    );
  });

  test("should rewrite next id", () => {
    const id = 10;

    jsonStorageRepository.writeId(id);
    const nextId = jsonStorageRepository.nextId;

    expect(nextId).toBe(id);
  });

  test("should increment next id", () => {
    const nextId = jsonStorageRepository.nextId;

    jsonStorageRepository.incrementNextId();
    const incrementedNextId = jsonStorageRepository.nextId;

    expect(incrementedNextId).toBe(nextId + 1);
  });

  test("should push item", () => {
    const item = { id: -1, email: "test@gmail.com" };

    jsonStorageRepository.pushItem(item);
    const jsonText = fs.readFileSync(FilePathMock.emails);
    const jsonArray = JSON.parse(jsonText).items;
    const addedItem = jsonArray[jsonArray.length - 1];

    expect(addedItem).toStrictEqual(item);
  });
});
