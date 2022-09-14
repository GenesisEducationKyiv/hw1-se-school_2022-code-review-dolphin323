import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const FilePath = {
  emailsFile: path.resolve(__dirname, "../../../data/emails.json"),
};

export { FilePath };
