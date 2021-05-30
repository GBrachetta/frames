import fs from "fs";
import inquirer from "inquirer";
import shell from "shelljs";
import stripAnsi from "strip-ansi";
import menu from "../cli.js";
import colors from "./colors.js";
import { goAhead } from "./installer-helpers.js";
import { projectNameMenu } from "./menu-helpers.js";
import { goodbye } from "./utils.js";

const installMenu = (framework) => {
  const { errorColor, accent, frame, helpMenu } = colors;
  const frameColor = frame[framework];
  const validDir = /^[a-zA-Z][a-zA-Z0-9_]*$/;
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
      if (name.project === "") {
        shell.echo("\n ", errorColor("The name of the app cannot be empty!"));
        installMenu(framework);
      } else if (fs.existsSync(path)) {
        shell.echo("\n ", errorColor("The directory already exists!"));
        installMenu(framework);
      } else if (!validDir.test(name.project)) {
        shell.echo(
          "\n ",
          errorColor("Project name is invalid!\n"),
          "\n ",
          helpMenu(
            "(Only letters, numbers and underscores. Must start with a letter)."
          )
        );
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
          .then(({ project }) => {
            const choice = stripAnsi(project);
            shell.echo();
            switch (choice) {
              case "Go ahead!":
                goAhead(framework, name, frameColor, errorColor);
                break;
              case "I regret that lame name!":
                installMenu(framework);
                break;
              case "Please start over":
                menu();
                break;
              default:
                goodbye();
            }
          });
      }
    });
};

export default installMenu;
