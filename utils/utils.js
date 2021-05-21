const shell = require("shelljs");
const chalk = require("chalk");
const { spawn } = require("child_process");
const Spinner = require("cli-spinner").Spinner;
const spinner = new Spinner("%s");
spinner.setSpinnerString(18);

const brewInstall = () => {
  shell.echo(chalk.cyan("Brew does not exist. Installing..."));
  const brewInstall = spawn("/bin/bash", [
    "-c",
    "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)",
  ]);
  brewInstall.stdout;
};

const jqInstall = () => {
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

exports.brewInstall = brewInstall;
exports.jqInstall = jqInstall;
