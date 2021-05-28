import fs from "fs";
import inquirer from "inquirer";
import shell from "shelljs";
import stripAnsi from "strip-ansi";
import menu from "../cli.js";
import install from "./installer.js";
import { projectNameMenu } from "./menu-helpers.js";
import { colors, goodbye } from "./utils.js";

const installMenu = (framework) => {
  const { errorColor, accent, frame } = colors;
  const frameColor = frame[framework];
  const validDir = /^[a-zA-Z0-9]+$/;
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
        shell.echo(" ", errorColor("The name of the app cannot be empty!"));
        installMenu(framework);
      } else if (fs.existsSync(path)) {
        shell.echo(" ", errorColor("The directory already exists!"));
        installMenu(framework);
      } else if (!validDir.test(name.project)) {
        shell.echo(" ", errorColor("Project name is invalid!"));
        installMenu(framework);
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
                install(name.project, "django", framework, frameColor);
              } else {
                shell.echo(errorColor("Invalid option!"));
                return;
              }
            } else if (choice === "I regret that lame name!") {
              installMenu(framework);
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
