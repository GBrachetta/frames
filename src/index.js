import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import shell from "shelljs";
import "shelljs-plugin-clear";
import stripAnsi from "strip-ansi";
import installMenu from "./utils/install-menu.js";
import { framesMenu, mainMenu } from "./utils/menu-helpers.js";
import { helpMe } from "./utils/utils.js";

const menu = async () => {
  await mainMenu();

  inquirer
    .prompt([
      {
        type: "list",
        name: "frame",
        message: chalk.blueBright("Please select your framework"),
        loop: false,
        pageSize: 10,
        choices: framesMenu,
      },
    ])
    .then((answers) => {
      let choice = stripAnsi(answers.frame);

      if (choice === "Exit") {
        shell.echo();
        shell.echo(chalk.yellowBright.bold(figlet.textSync("Bye!")));
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
