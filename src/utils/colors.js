import chalk from "chalk";
import gradient from "gradient-string";

const colors = {
  accent: chalk.keyword("lightblue").bold,
  author: chalk.keyword("darkorange").italic.bold("Guillermo Brachetta."),
  errorColor: chalk.keyword("tomato").bold.underline,
  exit: chalk.keyword("tomato").bold,
  frame: {
    Django: chalk.keyword("yellowgreen").bold,
    "Next.js": chalk.keyword("springgreen").bold,
    React: chalk.keyword("cyan").bold,
    "Vite-React": chalk.keyword("gold").bold,
    "Vite-Vue": chalk.keyword("hotpink").bold,
  },
  frames: chalk.keyword("tomato").bold("Frames"),
  help: chalk.keyword("powderblue"),
  helpMenu: chalk.keyword("springgreen").bold,
  helpAccent: chalk.keyword("navajowhite").bold,
  keyword: "aquamarine",
  menuLine: chalk.keyword("crimson"),
  spacer: chalk.keyword("lightseagreen"),
  step: chalk.keyword("aquamarine").bold,
  title: gradient("yellow", "tomato", "cyan"),
};

export default colors;
