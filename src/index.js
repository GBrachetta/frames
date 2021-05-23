#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import shell from "shelljs";
import "shelljs-plugin-clear";
import installMenu from "./utils/install-menu.js";
import { helpMe } from "./utils/utils.js";

const menu = () => {
  shell.clear();
  shell.echo();
  shell.echo(chalk.redBright("======================================"));
  console.log(figlet.textSync("Frames"));
  shell.echo(chalk.redBright("======================================"));
  shell.echo(chalk.cyanBright("          WELCOME TO FRAMES!"));
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
          chalk.cyanBright("React"),
          chalk.cyanBright("Vite-React"),
          chalk.cyanBright("Vite-Vue"),
          chalk.cyanBright("Next.js"),
          chalk.cyanBright("Django"),
          new inquirer.Separator(),
          chalk.greenBright("Help"),
          chalk.redBright("Exit"),
          new inquirer.Separator(),
        ],
      },
    ])
    .then((answers) => {
      let choice = JSON.stringify(answers.frame.slice(5, -5));

      if (choice === '"Exit"') {
        shell.echo();
        shell.echo(chalk.cyan("Goodbye!"));
        shell.echo();
        return;
      } else if (choice === '"Help"') {
        helpMe();
      } else {
        installMenu(choice);
      }
    });
};

menu();

export default menu;
