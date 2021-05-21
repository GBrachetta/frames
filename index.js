#!/usr/bin/env node

import "shelljs-plugin-clear";
import shell from "shelljs";
import chalk from "chalk";
import inquirer from "inquirer";
import pressAnyKey from "press-any-key";
import fs from "fs";
import { stdout } from "process";

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
                chalk.blueBright("Take me outta here!"),
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
                chalk.blueBright("Take me outta here!"),
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
                chalk.blueBright("Take me outta here!"),
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
  shell.echo();
  shell.echo(chalk.redBright("Frames"), "scaffolds apps in different flavors.");
  shell.echo(
    `It assumes you have ${chalk.cyan(
      "Visual Studio Code"
    )} installed in your system`
  );
  shell.echo("and starts the editor for the app created.");
  shell.echo();
  shell.echo(
    `${chalk.redBright("Frames")} also checks for the existence of ${chalk.cyan(
      "Homebrew"
    )}`
  );
  shell.echo("and installs it if it's not present.");
  shell.echo();
  shell.echo(
    `It also checks for ${chalk.cyan("jq")} and eventually installs it.`
  );
  shell.echo(
    `${chalk.cyan(
      "jq"
    )} is used to modify json files according to the name chosen for the app.`
  );
  shell.echo();
  shell.echo(
    `Make sure you run ${chalk.redBright(
      "Frames"
    )} in the parent directory of the app you want to scaffold.`
  );
  shell.echo();
  shell.echo(
    `${chalk.redBright("Frames")} was created by ${chalk.blueBright(
      "Guillermo Brachetta"
    )}`
  );
  shell.echo();
  shell.echo("Feel free to use, modify and suggest changes to this script:");
  shell.echo();
  shell.echo(
    `${chalk.cyanBright(
      "https://gist.github.com/GBrachetta/6fe0346d897941383e4ce6383746037a"
    )}`
  );
  shell.echo();
  pressAnyKey(
    chalk.greenBright("Press any key to go back to the menu...")
  ).then(() => {
    menu();
  });
};

const reactInstall = () => {
  console.log("React install");
};

const vReactInstall = () => {
  console.log("VReact install");
};

const vVueInstall = () => {
  console.log("Vue Install");
};

const nextInstall = () => {
  console.log("Next install");
};

const DjangoInstall = () => {
  console.log("Django Install...");
};

menu();
