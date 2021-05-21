#!/usr/bin/env node

import "shelljs-plugin-clear";
import shell from "shelljs";
import chalk from "chalk";
import inquirer from "inquirer";
import pressAnyKey from "press-any-key";
import fs from "fs";

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
        name: "theme",
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
      let choice = JSON.stringify(answers.theme.slice(5, -5));

      if (choice === '"React"') {
        react();
      } else if (choice === '"Vite-React"') {
        vReact();
      } else if (choice === '"Vite-Vue"') {
        vVue();
      } else if (choice === '"Next"') {
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
  console.log("Starting React questions...");
};
const vReact = () => {
  console.log("Starting Vite-React questions...");
};
const vVue = () => {
  console.log("Starting Vite-Vue questions...");
};
const next = () => {
  console.log("Starting Next.js questions...");
};
const django = () => {
  console.log("Starting Django questions...");
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

menu();
