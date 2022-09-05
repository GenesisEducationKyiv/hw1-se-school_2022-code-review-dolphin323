import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const FilePathMock = {
  emails: path.resolve(__dirname, "../../../__mocks__/files/emails.mock.json"),
};

export { FilePathMock };
