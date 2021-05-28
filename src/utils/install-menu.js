import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";
import shell from "shelljs";
import stripAnsi from "strip-ansi";
import menu from "../cli.js";
import install from "./installer.js";
import { projectNameMenu } from "./menu-helpers.js";
import { goodbye } from "./utils.js";

const installMenu = (framework, accent) => {
  // Color variables
  const colors = {
    React: chalk.keyword("cyan").bold,
    "Vite-React": chalk.keyword("gold").bold,
    "Vite-Vue": chalk.keyword("hotpink").bold,
    "Next.js": chalk.keyword("springgreen").bold,
    Django: chalk.keyword("yellowgreen").bold,
  };

  const frameColor = colors[framework];
  const errorColor = chalk.keyword("tomato").bold.underline;

  shell.echo();
  inquirer
    .prompt([
      {
        type: "input",
        name: "project",
        message: accent(
          `Please choose the name of your ${frameColor(framework)} project`
        ),
      },
    ])
    .then((name) => {
      const path = `${shell.pwd().stdout}/${name.project}`;
      shell.echo();
      if (name.project === "") {
        shell.echo(errorColor("The name of the app cannot be empty!"));
        installMenu(framework, accent);
      } else if (fs.existsSync(path)) {
        shell.echo(errorColor("The directory already exists!"));
        installMenu(framework, accent);
      } else {
        inquirer
          .prompt([
            {
              type: "list",
              name: "project",
              loop: false,
              message: accent(
                `Your ${frameColor(framework)} app will be named ${frameColor(
                  name.project
                )} and it will be created in ${frameColor(path)}. Continue?`
              ),
              choices: projectNameMenu,
            },
          ])
          .then((answers) => {
            let choice = stripAnsi(answers.project);
            shell.echo();
            if (choice === "Go ahead!") {
              if (framework === "React") {
                install(name.project, "react", framework, frameColor);
              } else if (framework === "Vite-React") {
                install(name.project, "vite-react", framework, frameColor);
              } else if (framework === "Vite-Vue") {
                install(name.project, "vite-vue", framework, frameColor);
              } else if (framework === "Next.js") {
                install(name.project, "nextjs", framework, frameColor);
              } else if (framework === "Django") {
                install(
                  name.project,
                  "django",
                  framework,
                  frameColor,
                  errorColor
                );
              } else {
                shell.echo(errorColor("Invalid option!"));
                return;
              }
            } else if (choice === "I regret that lame name!") {
              installMenu(framework, accent);
            } else if (choice === "Please start over") {
              menu();
            } else {
              goodbye();
            }
          });
      }
    });
};

export default installMenu;
