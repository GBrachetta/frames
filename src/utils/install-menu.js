import chalk from "chalk";
import figlet from "figlet";
import fs from "fs";
import inquirer from "inquirer";
import shell from "shelljs";
import stripAnsi from "strip-ansi";
import menu from "../index.js";
import {
  installDjango,
  installNext,
  installReact,
  installViteReact,
  installViteVue,
} from "./installers.js";
import { projectNameMenu } from "./menu-helpers.js";

const installMenu = (framework) => {
  // Coloring frameworks
  const colors = {
    React: chalk.bgCyanBright.gray.bold,
    "Vite-React": chalk.bgYellowBright.gray.bold,
    "Vite-Vue": chalk.bgRed.whiteBright.bold,
    "Next.js": chalk.bgGreenBright.gray.bold,
    Django: chalk.bgMagentaBright.bold,
  };

  let frameColor = colors[framework];

  shell.echo();
  inquirer
    .prompt([
      {
        type: "input",
        name: "project",
        message: chalk.blueBright(
          `Please choose the name of your ${frameColor(
            ` ${framework} `
          )} project`
        ),
      },
    ])
    .then((name) => {
      shell.echo();
      const path = `${shell.pwd().stdout}/${name.project}`;
      if (name.project === "") {
        shell.echo(
          chalk.redBright.bold("The name of the app cannot be empty!")
        );
        installMenu(framework);
      } else if (fs.existsSync(path)) {
        shell.echo(chalk.redBright.bold("The directory already exists!"));
        installMenu(framework);
      } else {
        inquirer
          .prompt([
            {
              type: "list",
              name: "project",
              loop: false,
              message: `Your ${frameColor(
                ` ${framework} `
              )} app will be named ${frameColor(
                ` ${name.project} `
              )} and it will be created in ${frameColor(
                ` ${path} `
              )}. Continue?`,
              choices: projectNameMenu,
            },
          ])
          .then((answers) => {
            let choice = stripAnsi(answers.project);
            shell.echo();
            if (choice === "Go ahead!") {
              if (framework === "React") {
                installReact(name.project);
              } else if (framework === "Vite-React") {
                installViteReact(name.project);
              } else if (framework === "Vite-Vue") {
                installViteVue(name.project);
              } else if (framework === "Next.js") {
                installNext(name.project);
              } else if (framework === "Django") {
                installDjango(name.project);
              } else {
                shell.echo(chalk.redBright("Invalid option!"));
                return;
              }
            } else if (choice === "I regret that lame name!") {
              installMenu(framework);
            } else if (choice === "Please start over") {
              menu();
            } else {
              shell.echo(chalk.yellowBright.bold(figlet.textSync("Bye!")));
              shell.echo();
            }
          });
      }
    });
};

export default installMenu;
