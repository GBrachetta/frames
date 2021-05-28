import figlet from "figlet";
import gradient from "gradient-string";
import pressAnyKey from "press-any-key";
import shell from "shelljs";
import menu from "../cli.js";
import chalk from "chalk";

export const colors = {
  accent: chalk.keyword("lightblue").bold,
  errorColor: chalk.keyword("tomato").bold.underline,
  title: gradient("yellow", "tomato", "cyan"),
  keyword: "aquamarine",
  menuLine: chalk.redBright,
  spacer: chalk.blueBright,
  bold: chalk.bold,
  step: chalk.keyword("aquamarine").bold,
  frames: chalk.keyword("tomato").bold("Frames"),
  author: chalk.keyword("darkorange").italic.bold("Guillermo Brachetta."),
  url: chalk.cyanBright.bold("https://github.com/GBrachetta/frames"),
  pipenv: chalk.cyan.bold("Pipenv"),
  vsc: chalk.cyan.bold("Visual Studio Code"),
  help: chalk.keyword("powderblue"),
  ok: chalk.greenBright.bold,
  frame: {
    React: chalk.keyword("cyan").bold,
    "Vite-React": chalk.keyword("gold").bold,
    "Vite-Vue": chalk.keyword("hotpink").bold,
    "Next.js": chalk.keyword("springgreen").bold,
    Django: chalk.keyword("yellowgreen").bold,
  },
};

const { frames, author, url, pipenv, vsc, help, ok, accent, errorColor } =
  colors;

export const helpMe = () => {
  shell.echo(help(`\n${frames} scaffolds apps in different flavors.`));
  shell.echo(
    help(`\nIf ${vsc} is installed, it starts it once the all is done.`)
  );
  shell.echo(
    help(`\n${frames} checks for ${pipenv} and eventually installs it.`)
  );
  shell.echo(help(`\nRun ${frames} in the parent directory of your app.`));
  shell.echo(help(`\n${frames} was created by ${author}`));
  shell.echo(help(`\nFeel free to use, share and contribute: ${url}\n`));

  pressAnyKey(ok("Press any key to go back to the menu...")).then(() => menu());
};

export const goodbye = (framework, framecolor, name) => {
  const bye = gradient("yellow", "tomato", "cyan");

  if (!name) {
    shell.echo();
    shell.echo(bye(figlet.textSync("  Bye!")));
    shell.echo();
    return;
  }
  const path = framecolor(`${process.cwd()}/${name}`);
  const project = `${framecolor(framework)} project`;
  shell.echo(ok("\nAll done!\n"));
  shell.echo(
    accent(
      `Your ${project} is ready at ${path}. Now go and create a great app!`
    )
  );
  shell.echo();
  shell.echo(bye(figlet.textSync("  Bye!")));
  shell.echo();
};

export const noPython = () => {
  shell.echo(errorColor("\nMust have Python > 3.6 installed to run Django!\n"));
  process.exit(1);
};

export const failedPipenv = (error) => {
  shell.echo(errorColor("Failed to install Pipenv, please install!"));
  shell.echo(ok("\nVisit: https://pypi.org/project/pipenv/"));
  shell.echo(errorColor("\nMessage:"), accent(error.message), "\n");
  process.exit(1);
};
