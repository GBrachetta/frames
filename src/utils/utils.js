import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import pressAnyKey from "press-any-key";
import menu from "../cli.js";

export const colors = {
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

const {
  frames,
  author,
  help,
  helpMenu,
  accent,
  errorColor,
  helpAccent,
  title,
} = colors;

export const helpMe = () => {
  console.log(help(`\n  ${frames} scaffolds apps in different flavors.`));
  console.log(
    help(
      `\n  If ${helpAccent(
        "VSCode"
      )} is installed, it starts it once the all is done.`
    )
  );
  console.log(
    help(
      `\n  ${frames} checks for ${helpAccent(
        "Pipenv"
      )} and eventually installs it.`
    )
  );
  console.log(help(`\n  Run ${frames} in the parent directory of your app.`));
  console.log(help(`\n  ${frames} was created by ${author}`));
  console.log(
    help(
      `\n  Feel free to use, share and contribute: ${helpAccent(
        "https://github.com/GBrachetta/frames"
      )}\n`
    )
  );
  pressAnyKey(helpMenu("  Press any key to go back to the menu...")).then(() =>
    menu()
  );
};

export const goodbye = (framework, framecolor, name) => {
  if (!name) {
    console.log();
    console.log(title(figlet.textSync("  Bye!")));
    console.log();
    return;
  }
  const path = framecolor(`${process.cwd()}/${name}`);
  const project = `${framecolor(framework)} project`;
  console.log(helpMenu("\nAll done!\n"));
  console.log(
    accent(
      `Your ${project} is ready at ${path}. Now go and create a great app!`
    )
  );
  console.log();
  console.log(title(figlet.textSync("  Bye!")));
  console.log();
};

export const noPython = () => {
  console.log(
    errorColor("\nMust have Python > 3.6 installed to run Django!\n")
  );
  process.exit(1);
};

export const failedPipenv = (error) => {
  console.log(errorColor("Failed to install Pipenv, please install!"));
  console.log(helpMenu("\nVisit: https://pypi.org/project/pipenv/"));
  console.log(errorColor("\nMessage:"), accent(error.message), "\n");
  process.exit(1);
};
