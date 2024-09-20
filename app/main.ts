import fs from "fs";
import { Init, Executer, CatFile } from "./command";

const args = process.argv.slice(2);
const command = args[0];

enum Commands {
  Init = "init",
  CatFile = "cat-file",
}

const executer = new Executer();

switch (command) {
  case Commands.Init:
    const init = new Init();
    executer.execute(init);
  case Commands.CatFile:
    const hash = process.argv[3];
    const catFile = new CatFile(hash);
    executer.execute(catFile);
    break;
  default:
    throw new Error(`Unknown command ${command}`);
}
