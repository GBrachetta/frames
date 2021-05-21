#!/usr/bin/env node

import chalk from "chalk";
import { Spinner } from "cli-spinner";
import { sync as commandExists } from "command-exists";
import fs from "fs";
import inquirer from "inquirer";
import pressAnyKey from "press-any-key";
import shell from "shelljs";
import "shelljs-plugin-clear";
import help from "./utils/help.js";
import { brewInstall, jqInstall } from "./utils/utils.js";
const spinner = new Spinner("%s");
spinner.setSpinnerString(18);

const menu = () => {
  shell.clear();
  shell.echo();
  shell.echo(chalk.blue("================================"));
  shell.echo(chalk.redBright(" ____ ____ ____ _  _ ____ ____"));
  shell.echo(chalk.redBright(" |___ |__/ |__| |\\/| |___ [__"));
  shell.echo(chalk.redBright(" |    |  \\ |  | |  | |___ ___]"));
  shell.echo();
  shell.echo(chalk.blue("================================"));
  shell.echo(chalk.greenBright("       WELCOME TO FRAMES!"));
  shell.echo(chalk.blue("================================"));
  shell.echo();

  inquirer
    .prompt([
      {
        type: "list",
        name: "frame",
        message: chalk.blueBright("Please select your framework"),
        choices: [
          chalk.cyan("React"),
          chalk.cyan("Vite-React"),
          chalk.cyan("Vite-Vue"),
          chalk.cyan("Next.js"),
          chalk.cyan("Django"),
          chalk.green("Help"),
          chalk.redBright("Exit"),
        ],
      },
    ])
    .then((answers) => {
      let choice = JSON.stringify(answers.frame.slice(5, -5));

      if (choice === '"React"') {
        react();
      } else if (choice === '"Vite-React"') {
        vReact();
      } else if (choice === '"Vite-Vue"') {
        vVue();
      } else if (choice === '"Next.js"') {
        next();
      } else if (choice === '"Django"') {
        django();
      } else if (choice === '"Help"') {
        helpMe();
      } else {
        shell.echo();
        shell.echo(chalk.cyan("Goodbye!"));
        shell.echo();
      }
    });
};

const react = () => {
  shell.echo();
  inquirer
    .prompt([
      {
        type: "input",
        name: "project",
        message: chalk.blueBright("Please choose the name of your project"),
      },
    ])
    .then((name) => {
      shell.echo();
      const path = `${shell.pwd().stdout}/${name.project}`;
      if (name.project === "") {
        shell.echo(chalk.redBright("Cannot be empty!"));
        react();
      } else if (fs.existsSync(path)) {
        shell.echo(chalk.redBright("The directory already exists!"));
        react();
      } else {
        inquirer
          .prompt([
            {
              type: "list",
              name: "project",
              message: `Your ${chalk.cyan(
                "React"
              )} app will be named ${chalk.cyan(
                name.project
              )} and it will be created in ${chalk.cyan(path)}. Continue?`,
              choices: [
                chalk.blueBright("Go ahead!"),
                chalk.blueBright("I regret that lame name!"),
                chalk.blueBright("Please start over"),
                chalk.redBright("Take me outta here!"),
              ],
            },
          ])
          .then((answer) => {
            let choice = JSON.stringify(answer.project.slice(5, -5));
            shell.echo();
            if (choice === '"Go ahead!"') {
              reactInstall();
            } else if (choice === '"I regret that lame name!"') {
              react();
            } else if (choice === '"Please start over"') {
              menu();
            } else {
              shell.echo(chalk.blueBright("Goodbye!"));
              shell.echo();
            }
          });
      }
    });
};

const vReact = () => {
  shell.echo();
  inquirer
    .prompt([
      {
        type: "input",
        name: "project",
        message: chalk.blueBright("Please choose the name of your project"),
      },
    ])
    .then((name) => {
      shell.echo();
      const path = `${shell.pwd().stdout}/${name.project}`;
      if (name.project === "") {
        shell.echo(chalk.redBright("Cannot be empty!"));
        react();
      } else if (fs.existsSync(path)) {
        shell.echo(chalk.redBright("The directory already exists!"));
        react();
      } else {
        inquirer
          .prompt([
            {
              type: "list",
              name: "project",
              message: `Your ${chalk.yellow(
                "Vite-React"
              )} app will be named ${chalk.yellow(
                name.project
              )} and it will be created in ${chalk.yellow(path)}. Continue?`,
              choices: [
                chalk.blueBright("Go ahead!"),
                chalk.blueBright("I regret that lame name!"),
                chalk.blueBright("Please start over"),
                chalk.redBright("Take me outta here!"),
              ],
            },
          ])
          .then((answer) => {
            let choice = JSON.stringify(answer.project.slice(5, -5));
            shell.echo();
            if (choice === '"Go ahead!"') {
              vReactInstall();
            } else if (choice === '"I regret that lame name!"') {
              vReact();
            } else if (choice === '"Please start over"') {
              menu();
            } else {
              shell.echo(chalk.blueBright("Goodbye!"));
              shell.echo();
            }
          });
      }
    });
};

const vVue = () => {
  shell.echo();
  inquirer
    .prompt([
      {
        type: "input",
        name: "project",
        message: chalk.blueBright("Please choose the name of your project"),
      },
    ])
    .then((name) => {
      shell.echo();
      const path = `${shell.pwd().stdout}/${name.project}`;
      if (name.project === "") {
        shell.echo(chalk.redBright("Cannot be empty!"));
        react();
      } else if (fs.existsSync(path)) {
        shell.echo(chalk.redBright("The directory already exists!"));
        react();
      } else {
        inquirer
          .prompt([
            {
              type: "list",
              name: "project",
              message: `Your ${chalk.redBright(
                "Vite-Vue"
              )} app will be named ${chalk.redBright(
                name.project
              )} and it will be created in ${chalk.redBright(path)}. Continue?`,
              choices: [
                chalk.blueBright("Go ahead!"),
                chalk.blueBright("I regret that lame name!"),
                chalk.blueBright("Please start over"),
                chalk.redBright("Take me outta here!"),
              ],
            },
          ])
          .then((answer) => {
            let choice = JSON.stringify(answer.project.slice(5, -5));
            shell.echo();
            if (choice === '"Go ahead!"') {
              vVueInstall();
            } else if (choice === '"I regret that lame name!"') {
              vVue();
            } else if (choice === '"Please start over"') {
              menu();
            } else {
              shell.echo(chalk.blueBright("Goodbye!"));
              shell.echo();
            }
          });
      }
    });
};

const next = () => {
  shell.echo();
  inquirer
    .prompt([
      {
        type: "input",
        name: "project",
        message: chalk.blueBright("Please choose the name of your project"),
      },
    ])
    .then((name) => {
      shell.echo();
      const path = `${shell.pwd().stdout}/${name.project}`;
      if (name.project === "") {
        shell.echo(chalk.redBright("Cannot be empty!"));
        react();
      } else if (fs.existsSync(path)) {
        shell.echo(chalk.redBright("The directory already exists!"));
        react();
      } else {
        inquirer
          .prompt([
            {
              type: "list",
              name: "project",
              message: `Your ${chalk.greenBright(
                "Next.js"
              )} app will be named ${chalk.greenBright(
                name.project
              )} and it will be created in ${chalk.greenBright(
                path
              )}. Continue?`,
              choices: [
                chalk.blueBright("Go ahead!"),
                chalk.blueBright("I regret that lame name!"),
                chalk.blueBright("Please start over"),
                chalk.redBright("Take me outta here!"),
              ],
            },
          ])
          .then((answer) => {
            let choice = JSON.stringify(answer.project.slice(5, -5));
            shell.echo();
            if (choice === '"Go ahead!"') {
              nextInstall();
            } else if (choice === '"I regret that lame name!"') {
              next();
            } else if (choice === '"Please start over"') {
              menu();
            } else {
              shell.echo(chalk.blueBright("Goodbye!"));
              shell.echo();
            }
          });
      }
    });
};

const django = () => {
  shell.echo();
  inquirer
    .prompt([
      {
        type: "input",
        name: "project",
        message: chalk.blueBright("Please choose the name of your project"),
      },
    ])
    .then((name) => {
      shell.echo();
      const path = `${shell.pwd().stdout}/${name.project}`;
      if (name.project === "") {
        shell.echo(chalk.redBright("Cannot be empty!"));
        react();
      } else if (fs.existsSync(path)) {
        shell.echo(chalk.redBright("The directory already exists!"));
        react();
      } else {
        inquirer
          .prompt([
            {
              type: "list",
              name: "project",
              message: `Your ${chalk.magentaBright(
                "Django"
              )} app will be named ${chalk.magentaBright(
                name.project
              )} and it will be created in ${chalk.magentaBright(
                path
              )}. Continue?`,
              choices: [
                chalk.blueBright("Go ahead!"),
                chalk.blueBright("I regret that lame name!"),
                chalk.blueBright("Please start over"),
                chalk.redBright("Take me outta here!"),
              ],
            },
          ])
          .then((answer) => {
            let choice = JSON.stringify(answer.project.slice(5, -5));
            shell.echo();
            if (choice === '"Go ahead!"') {
              DjangoInstall();
            } else if (choice === '"I regret that lame name!"') {
              django();
            } else if (choice === '"Please start over"') {
              menu();
            } else {
              shell.echo(chalk.blueBright("Goodbye!"));
              shell.echo();
            }
          });
      }
    });
};

const helpMe = () => {
  help();
  pressAnyKey(
    chalk.greenBright("Press any key to go back to the menu...")
  ).then(() => {
    menu();
  });
};

const reactInstall = () => {
  console.log("React install");
  if (!commandExists("brew")) {
    brewInstall();
  }

  if (!commandExists("jq")) {
    jqInstall();
  }
};

const vReactInstall = () => {
  console.log("VReact install");
  if (!commandExists("brew")) {
    brewInstall();
  }

  if (!commandExists("jq")) {
    jqInstall();
  }
};

const vVueInstall = () => {
  console.log("Vue Install");
  if (!commandExists("brew")) {
    brewInstall();
  }

  if (!commandExists("jq")) {
    jqInstall();
  }
};

const nextInstall = () => {
  console.log("Next install");
  if (!commandExists("brew")) {
    brewInstall();
  }

  if (!commandExists("jq")) {
    jqInstall();
  }
};

const DjangoInstall = () => {
  console.log("Django Install...");
  if (!commandExists("brew")) {
    brewInstall();
  }

  if (!commandExists("jq")) {
    jqInstall();
  }
};

menu();
