import chalk from "chalk";
import { spawn } from "child_process";
import { Spinner } from "cli-spinner";
import pressAnyKey from "press-any-key";
import shell from "shelljs";
import menu from "../index.js";
import help from "./help.js";
const spinner = new Spinner("%s");
spinner.setSpinnerString(18);
import inquirer from "inquirer";
import figlet from "figlet";

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

export const pipenvInstall = () => {
  shell.echo(chalk.cyan("Pipenv does not exist. Installing..."));
  const pipenvInstall = (command, onSuccess) => {
    return new Promise((resolve, reject) => {
      const process = spawn(command, { shell: true });
      spinner.start();
      process.on("exit", () => {
        spinner.stop();
      });
    });
  };
  const pipenvI = async () => {
    await pipenvInstall("brew install pipenv");
  };
  pipenvI();
};

export const helpMe = () => {
  help();
  pressAnyKey(
    chalk.greenBright("Press any key to go back to the menu...")
  ).then(() => {
    menu();
  });
};

const menuSeparator = new inquirer.Separator(
  chalk.blueBright("————————————————————————————")
);

export const framesMenu = [
  menuSeparator,
  chalk.cyanBright.bold("React"),
  chalk.cyanBright.bold("Vite-React"),
  chalk.cyanBright.bold("Vite-Vue"),
  chalk.cyanBright.bold("Next.js"),
  chalk.cyanBright.bold("Django"),
  menuSeparator,
  chalk.greenBright.bold("Help"),
  chalk.redBright.bold("Exit"),
  menuSeparator,
];

export const projectNameMenu = [
  menuSeparator,
  chalk.blueBright("Go ahead!"),
  chalk.blueBright("I regret that lame name!"),
  chalk.blueBright("Please start over"),
  chalk.redBright.bold("Take me outta here!"),
  menuSeparator,
];
