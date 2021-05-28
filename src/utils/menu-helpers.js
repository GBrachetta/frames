import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import shell from "shelljs";

const keyword = "aquamarine";
const menuSeparator = new inquirer.Separator(
  chalk.blueBright("————————————————————————————")
);

export const mainMenu = async (accent) => {
  const title = gradient("yellow", "tomato", "cyan");
  shell.clear();
  shell.echo(chalk.redBright("\n  ——————————————————————————————————————"));
  shell.echo(title(figlet.textSync("  Frames ")));
  shell.echo(chalk.redBright("  ——————————————————————————————————————\n"));
  shell.echo(chalk.bold(`            ${title("WELCOME TO FRAMES!")}         `));
  shell.echo(accent.italic.bold("\n          The Scaffolding package\n"));
  shell.echo(chalk.redBright("  ——————————————————————————————————————\n"));
};

export const projectNameMenu = [
  menuSeparator,
  chalk.keyword(keyword).bold("Go ahead!"),
  chalk.keyword(keyword).bold("I regret that lame name!"),
  chalk.keyword(keyword).bold("Please start over"),
  chalk.keyword("tomato").bold("Take me outta here!"),
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
  chalk.keyword("springgreen").bold("Help"),
  chalk.keyword("tomato").bold("Exit"),
  menuSeparator,
];
