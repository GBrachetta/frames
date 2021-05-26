#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import shell from "shelljs";
import "shelljs-plugin-clear";
import installMenu from "./utils/install-menu.js";
import { helpMe } from "./utils/utils.js";
import stripAnsi from "strip-ansi";

const menu = () => {
  shell.clear();
  shell.echo();
  shell.echo(chalk.redBright("======================================"));
  shell.echo(chalk.yellow.bold(figlet.textSync("Frames ")));
  shell.echo(chalk.redBright("======================================"));
  shell.echo();
  shell.echo(chalk.cyanBright.bold("          WELCOME TO FRAMES!          "));
  shell.echo();
  shell.echo(chalk.blueBright.italic("        The Scaffolding package"));
  shell.echo();
  shell.echo(chalk.redBright("======================================"));
  shell.echo();

  inquirer
    .prompt([
      {
        type: "list",
        name: "frame",
        message: chalk.blueBright("Please select your framework"),
        loop: false,
        pageSize: 10,
        choices: [
          new inquirer.Separator(),
          chalk.cyanBright.bold("React"),
          chalk.cyanBright.bold("Vite-React"),
          chalk.cyanBright.bold("Vite-Vue"),
          chalk.cyanBright.bold("Next.js"),
          chalk.cyanBright.bold("Django"),
          new inquirer.Separator(),
          chalk.greenBright.bold("Help"),
          chalk.redBright.bold("Exit"),
          new inquirer.Separator(),
        ],
      },
    ])
    .then((answers) => {
      let choice = stripAnsi(answers.frame);

      if (choice === "Exit") {
        shell.echo();
        shell.echo(chalk.cyan("Goodbye!"));
        shell.echo();
        return;
      } else if (choice === "Help") {
        helpMe();
      } else {
        installMenu(choice);
      }
    });
};

menu();

export default menu;
