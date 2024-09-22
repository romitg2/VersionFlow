import path from "path";
import fs from "fs";
import zlib from "zlib";

interface Command {
  flag: string;
  hash: string;
  execute(): void;
}

class lsTreeCommand implements Command {
  constructor(flag: string, hash: string) {
    this.flag = flag;
    this.hash = hash;
  }

  flag: string;
  hash: string;

  execute() {
    const folder = this.hash.slice(0, 2);
    const file = this.hash.slice(2);

    const fullPath = path.join(process.cwd(), ".git", "objects", folder, file);
    console.log(fullPath);

    const filedata = fs.readFileSync(fullPath);
    const decompressed = zlib.inflateSync(filedata).toString().split("\0");
    const names = decompressed
      .filter((x) => x.includes(" "))
      .map((x) => x.split(" ")[1]);

    names.forEach((name) => {
      console.log(name);
    });
  }
}

export default lsTreeCommand;
