import shell from "shelljs";
import chalk from "chalk";
import { spawn } from "child_process";
import { Spinner } from "cli-spinner";
const spinner = new Spinner("%s");
spinner.setSpinnerString(18);

export const brewInstall = () => {
  shell.echo(chalk.cyan("Brew does not exist. Installing..."));
  const brewInstall = spawn("/bin/bash", [
    "-c",
    "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)",
  ]);
  brewInstall.stdout;
};

export const jqInstall = () => {
  shell.echo(chalk.cyan("Jq does not exist. Installing..."));
  const jqInstall = (command, onSuccess) => {
    return new Promise((resolve, reject) => {
      const process = spawn(command, { shell: true });
      spinner.start();
      process.on("exit", () => {
        spinner.stop();
      });
    });
  };
  const jqI = async () => {
    await jqInstall("brew install jq");
  };
  jqI();
};
