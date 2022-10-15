interface IJsonStorage {
  filePath: string;
  getAll: () => any;
  getByKey: (key: string) => any;
  writeByKey: ({ key, items }: { key: string; items: any }) => void;
  writeAll: (filePath: string) => void;
}

export { IJsonStorage };
