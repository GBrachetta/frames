import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import shell from "shelljs";

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
  chalk.cyanBright.bold("Go ahead!"),
  chalk.cyanBright.bold("I regret that lame name!"),
  chalk.cyanBright.bold("Please start over"),
  chalk.redBright.bold("Take me outta here!"),
  menuSeparator,
];

export const mainMenu = async () => {
  shell.clear();
  shell.echo();
  shell.echo(chalk.redBright("  ——————————————————————————————————————"));
  shell.echo(chalk.yellow.bold(figlet.textSync("  Frames ")));
  shell.echo(chalk.redBright("  ——————————————————————————————————————"));
  shell.echo();
  shell.echo(chalk.cyanBright.bold("            WELCOME TO FRAMES!          "));
  shell.echo();
  shell.echo(chalk.blueBright.italic.bold("          The Scaffolding package"));
  shell.echo();
  shell.echo(chalk.redBright("  ——————————————————————————————————————"));
  shell.echo();
};
