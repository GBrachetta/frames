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
import installDjango from "./utils/install-django.js";
import installNext from "./utils/install-next.js";
import installReact from "./utils/install-react.js";
import installVReact from "./utils/install-vReact.js";
import installVVue from "./utils/install-vVue.js";
import { brewInstall, jqInstall, pipenvInstall } from "./utils/utils.js";
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
        loop: false,
        pageSize: 10,
        choices: [
          new inquirer.Separator(),
          chalk.cyan("React"),
          chalk.cyan("Vite-React"),
          chalk.cyan("Vite-Vue"),
          chalk.cyan("Next.js"),
          chalk.cyan("Django"),
          new inquirer.Separator(),
          chalk.green("Help"),
          chalk.redBright("Exit"),
          new inquirer.Separator(),
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
        shell.echo(chalk.redBright("The name of the app cannot be empty!"));
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
              loop: false,
              message: `Your ${chalk.cyan(
                "React"
              )} app will be named ${chalk.cyan(
                name.project
              )} and it will be created in ${chalk.cyan(path)}. Continue?`,
              choices: [
                new inquirer.Separator(),
                chalk.blueBright("Go ahead!"),
                chalk.blueBright("I regret that lame name!"),
                chalk.blueBright("Please start over"),
                chalk.redBright("Take me outta here!"),
                new inquirer.Separator(),
              ],
            },
          ])
          .then((answer) => {
            let choice = JSON.stringify(answer.project.slice(5, -5));
            shell.echo();
            if (choice === '"Go ahead!"') {
              reactInstall(name.project);
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
        shell.echo(chalk.redBright("The name of the app cannot be empty!"));
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
              loop: false,
              message: `Your ${chalk.yellow(
                "Vite-React"
              )} app will be named ${chalk.yellow(
                name.project
              )} and it will be created in ${chalk.yellow(path)}. Continue?`,
              choices: [
                new inquirer.Separator(),
                chalk.blueBright("Go ahead!"),
                chalk.blueBright("I regret that lame name!"),
                chalk.blueBright("Please start over"),
                chalk.redBright("Take me outta here!"),
                new inquirer.Separator(),
              ],
            },
          ])
          .then((answer) => {
            let choice = JSON.stringify(answer.project.slice(5, -5));
            shell.echo();
            if (choice === '"Go ahead!"') {
              vReactInstall(name.project);
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
        shell.echo(chalk.redBright("The name of the app cannot be empty!"));
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
              loop: false,
              message: `Your ${chalk.redBright(
                "Vite-Vue"
              )} app will be named ${chalk.redBright(
                name.project
              )} and it will be created in ${chalk.redBright(path)}. Continue?`,
              choices: [
                new inquirer.Separator(),
                chalk.blueBright("Go ahead!"),
                chalk.blueBright("I regret that lame name!"),
                chalk.blueBright("Please start over"),
                chalk.redBright("Take me outta here!"),
                new inquirer.Separator(),
              ],
            },
          ])
          .then((answer) => {
            let choice = JSON.stringify(answer.project.slice(5, -5));
            shell.echo();
            if (choice === '"Go ahead!"') {
              vVueInstall(name.project);
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
        shell.echo(chalk.redBright("The name of the app cannot be empty!"));
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
              loop: false,
              message: `Your ${chalk.greenBright(
                "Next.js"
              )} app will be named ${chalk.greenBright(
                name.project
              )} and it will be created in ${chalk.greenBright(
                path
              )}. Continue?`,
              choices: [
                new inquirer.Separator(),
                chalk.blueBright("Go ahead!"),
                chalk.blueBright("I regret that lame name!"),
                chalk.blueBright("Please start over"),
                chalk.redBright("Take me outta here!"),
                new inquirer.Separator(),
              ],
            },
          ])
          .then((answer) => {
            let choice = JSON.stringify(answer.project.slice(5, -5));
            shell.echo();
            if (choice === '"Go ahead!"') {
              nextInstall(name.project);
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
        shell.echo(chalk.redBright("The name of the app cannot be empty!"));
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
              loop: false,
              message: `Your ${chalk.magentaBright(
                "Django"
              )} app will be named ${chalk.magentaBright(
                name.project
              )} and it will be created in ${chalk.magentaBright(
                path
              )}. Continue?`,
              choices: [
                new inquirer.Separator(),
                chalk.blueBright("Go ahead!"),
                chalk.blueBright("I regret that lame name!"),
                chalk.blueBright("Please start over"),
                chalk.redBright("Take me outta here!"),
                new inquirer.Separator(),
              ],
            },
          ])
          .then((answer) => {
            let choice = JSON.stringify(answer.project.slice(5, -5));
            shell.echo();
            if (choice === '"Go ahead!"') {
              DjangoInstall(name.project);
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

const reactInstall = (name) => {
  if (!commandExists("brew")) {
    brewInstall();
  }

  if (!commandExists("jq")) {
    jqInstall();
  }

  installReact(name);
};

const vReactInstall = (name) => {
  if (!commandExists("brew")) {
    brewInstall();
  }

  if (!commandExists("jq")) {
    jqInstall();
  }

  installVReact(name);
};

const vVueInstall = (name) => {
  if (!commandExists("brew")) {
    brewInstall();
  }

  if (!commandExists("jq")) {
    jqInstall();
  }

  installVVue(name);
};

const nextInstall = (name) => {
  if (!commandExists("brew")) {
    brewInstall();
  }

  if (!commandExists("jq")) {
    jqInstall();
  }

  installNext(name);
};

const DjangoInstall = (name) => {
  if (!commandExists("brew")) {
    brewInstall();
  }

  if (!commandExists("pipenv")) {
    pipenvInstall();
  }

  installDjango(name);
};

menu();
