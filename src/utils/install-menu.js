import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";
import shell from "shelljs";
import menu from "../index.js";
import installDjango from "./install-django.js";
import installNext from "./install-next.js";
import installReact from "./install-react.js";
import installVReact from "./install-vReact.js";
import installVVue from "./install-vVue.js";

const installMenu = (framework) => {
  // Coloring frameworks
  const colors = {
    React: chalk.bgCyanBright.gray.bold,
    "Vite-React": chalk.bgYellowBright.gray.bold,
    "Vite-Vue": chalk.bgRed.bold,
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
          `Please choose the name of your ${framework.slice(1, -1)} project`
        ),
      },
    ])
    .then((name) => {
      shell.echo();
      const path = `${shell.pwd().stdout}/${name.project}`;
      if (name.project === "") {
        shell.echo(chalk.redBright("The name of the app cannot be empty!"));
        installMenu(framework);
      } else if (fs.existsSync(path)) {
        shell.echo(chalk.redBright("The directory already exists!"));
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
          .then((answers) => {
            let answer = JSON.stringify(answers.project.slice(5, -5));
            let choice = answer.slice(1, -1);
            shell.echo();
            if (choice === "Go ahead!") {
              // Can do the same thing from the previous code optimization
              // here, using an object and a lookup instead of cascading if
              // statements.  Far better performance.
              if (framework === "React") {
                installReact(name.project);
              } else if (framework === "Vite-React") {
                installVReact(name.project);
              } else if (framework === "Vite-Vue") {
                installVVue(name.project);
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
              shell.echo(chalk.blueBright("Goodbye!"));
              shell.echo();
            }
          });
      }
    });
};

export default installMenu;
