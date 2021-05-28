import inquirer from "inquirer";
import "shelljs-plugin-clear";
import stripAnsi from "strip-ansi";
import installMenu from "./utils/install-menu.js";
import { framesMenu, mainMenu } from "./utils/menu-helpers.js";
import { colors, goodbye, helpMe } from "./utils/utils.js";

const menu = async () => {
  const { accent } = colors;
  await mainMenu(accent);

  inquirer
    .prompt([
      {
        type: "list",
        name: "frame",
        message: accent("Please select your framework"),
        loop: false,
        pageSize: 10,
        choices: framesMenu,
      },
    ])
    .then((answers) => {
      let choice = stripAnsi(answers.frame);
      choice === "Exit"
        ? goodbye()
        : choice === "Help"
        ? helpMe()
        : installMenu(choice);
    });
};

menu();

export default menu;
