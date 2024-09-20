import fs from "fs";

class Init {
  constructor() {}
  execute() {
    console.log("Logs from your program will appear here!");

    fs.mkdirSync(".git", { recursive: true });
    fs.mkdirSync(".git/objects", { recursive: true });
    fs.mkdirSync(".git/refs", { recursive: true });
    fs.writeFileSync(".git/HEAD", "ref: refs/heads/main\n");
    console.log("Initialized git directory");
  }
}

export default Init;
