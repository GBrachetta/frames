import inquirer from "inquirer";
import "shelljs-plugin-clear";
import stripAnsi from "strip-ansi";
import installMenu from "./utils/install-menu.js";
import { framesMenu, mainMenu } from "./utils/menu-helpers.js";
import { goodbye, helpMe } from "./utils/utils.js";
import colors from "./utils/colors.js";
import getOS from "./common/common";

const menu = async () => {
  const usrOS = await getOS();
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
    .then(({ frame }) => {
      const choice = stripAnsi(frame);

      switch (choice) {
        case "Exit":
          goodbye();
          break;
        case "Help":
          helpMe();
          break;
        default:
          installMenu(choice, usrOS);
      }
    });
};

menu();

export default menu;
