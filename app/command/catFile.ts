import path from "path";
import fs from "fs";
import zlib from "zlib";

class CatFile {
  constructor(hash: string) {
    this.hash = hash;
  }

  hash: string;

  execute() {
    const folder = this.hash.slice(0, 2);
    const file = this.hash.slice(2);

    const filePath = path.join(".git", "objects", folder, file);

    if (!fs.existsSync(filePath)) {
      console.log("File not found");
      return;
    }

    const content = fs.readFileSync(filePath);
    const decompressed = zlib
      .inflateSync(Buffer.from(content))
      .toString("utf-8");
    console.log(decompressed);
  }
}

export default CatFile;
