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
              message: `Your ${chalk.cyan(
                framework
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
              if (framework === '"React"') {
                installReact(name.project);
              } else if (framework === '"Vite-React"') {
                installVReact(name.project);
              } else if (framework === '"Vite-Vue"') {
                installVVue(name.project);
              } else if (framework === '"Next.js"') {
                installNext(name.project);
              } else if (framework === '"Django"') {
                installDjango(name.project);
              } else {
                shell.echo(chalk.redBright("Invalid option!"));
                return;
              }
            } else if (choice === '"I regret that lame name!"') {
              installMenu(framework);
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

export default installMenu;
