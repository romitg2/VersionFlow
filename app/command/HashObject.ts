import path from "path";
import zlib from "zlib";
import fs from "fs";
import crypto from "crypto";

class HashObject {
  constructor(flag: string, file: string) {
    this.flag = flag;
    this.file = file;
  }

  file: string;
  flag: string;

  execute() {
    const fullPath = path.resolve(this.file);
    console.log(fullPath);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`File ${fullPath} does not exist`);
    }
    // read the file content and hash it
    const fileContent = fs.readFileSync(fullPath);
    const fileLength = fileContent.length;

    // store the hash into the blob
    const header = `blob ${fileLength}\0`;
    const blob = Buffer.concat([Buffer.from(header), fileContent]);

    const hash = crypto.createHash("sha1").update(blob).digest("hex");

    process.stdout.write("hash: ");
    process.stdout.write(`${hash}\n`);

    if (this.flag != "-w") return;

    const folder = hash.substr(0, 2);
    const file = hash.substr(2);

    const folderPath = path.join(process.cwd(), ".git", "objects", folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const compressData = zlib.deflateSync(blob);
    fs.writeFileSync(path.join(folderPath, file), compressData);
  }
}

export default HashObject;
