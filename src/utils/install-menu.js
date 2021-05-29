import fs from "fs";
import inquirer from "inquirer";
import shell from "shelljs";
import stripAnsi from "strip-ansi";
import menu from "../cli.js";
import install from "./installer.js";
import { projectNameMenu } from "./menu-helpers.js";
import { colors, goodbye } from "./utils.js";

const installMenu = (framework) => {
  const { errorColor, accent, frame, helpMenu } = colors;
  const frameColor = frame[framework];
  const validDir = /^[a-zA-Z][a-zA-Z0-9_]*$/;
  console.log();
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
        console.log("\n ", errorColor("The name of the app cannot be empty!"));
        installMenu(framework);
      } else if (fs.existsSync(path)) {
        console.log("\n ", errorColor("The directory already exists!"));
        installMenu(framework);
      } else if (!validDir.test(name.project)) {
        console.log(
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
          .then((answers) => {
            let choice = stripAnsi(answers.project);
            console.log();
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
                console.log(errorColor("Invalid option!"));
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
