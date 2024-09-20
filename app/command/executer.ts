type Command = {
  execute(): void;
};

class Executer {
  commands: Command[];
  constructor() {
    this.commands = [];
  }

  execute(command: Command): void {
    command.execute();
  }

  log() {
    console.log("------- Commands -------");
    for (let i = 0; i < this.commands.length; i++) {
      console.log(this.commands[i]);
    }
    console.log("-----------------------");
  }
}

export default Executer;
