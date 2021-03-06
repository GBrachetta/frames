import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import shell from "shelljs";
import colors from "./colors.js";

const { accent, title, keyword, menuLine, spacer, helpMenu, exit } = colors;

const menuSeparator = new inquirer.Separator(
  spacer("————————————————————————————")
);

export const mainMenu = async () => {
  shell.clear();
  shell.echo(menuLine("\n  ——————————————————————————————————————"));
  shell.echo(chalk.bold(title(figlet.textSync("  Frames "))));
  shell.echo(menuLine("  ——————————————————————————————————————\n"));
  shell.echo(chalk.bold(`            ${title("WELCOME TO FRAMES!")}         `));
  shell.echo(accent.italic("\n          The Scaffolding package\n"));
  shell.echo(menuLine("  ——————————————————————————————————————\n"));
};

export const projectNameMenu = [
  menuSeparator,
  chalk.keyword(keyword).bold("Go ahead!"),
  chalk.keyword(keyword).bold("I regret that lame name!"),
  chalk.keyword(keyword).bold("Please start over"),
  exit("Take me outta here!"),
  menuSeparator,
];

export const framesMenu = [
  menuSeparator,
  chalk.keyword(keyword).bold("React"),
  chalk.keyword(keyword).bold("Vite-React"),
  chalk.keyword(keyword).bold("Vite-Vue"),
  chalk.keyword(keyword).bold("Next.js"),
  chalk.keyword(keyword).bold("Django"),
  menuSeparator,
  helpMenu("Help"),
  exit("Exit"),
  menuSeparator,
];
