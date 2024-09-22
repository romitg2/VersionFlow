import { lsTreeCommand, Init, Executer, CatFile, HashObject } from "./command";

const args = process.argv.slice(2);
const command = args[0];

enum Commands {
  Init = "init",
  CatFile = "cat-file",
  HashObject = "hash-object",
  LsTree = "ls-tree",
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
  case Commands.HashObject:
    handleHashObjectCommand();
    break;
  case Commands.LsTree:
    handlelsTreeCommand();
    break;
  default:
    throw new Error(`Unknown command ${command}`);
}

function handlelsTreeCommand() {
  let flag = process.argv[3];
  let hash = process.argv[4];

  if (!hash) {
    hash = flag;
    flag = "";
  }
  const command = new lsTreeCommand(flag, hash);
  executer.execute(command);
  return;
}

function handleHashObjectCommand() {
  let flag = process.argv[3];
  let file = process.argv[4];
  if (!file) {
    file = flag;
    flag = "";
  }
  console.log({ flag, file });
  const hashObject = new HashObject(flag, file);
  executer.execute(hashObject);
}
