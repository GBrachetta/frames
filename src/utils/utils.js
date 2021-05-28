import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import pressAnyKey from "press-any-key";
import shell from "shelljs";
import menu from "../cli.js";

export const helpMe = () => {
  const frames = chalk.keyword("tomato").bold("Frames");
  const author = chalk
    .keyword("darkorange")
    .italic.bold("Guillermo Brachetta.");
  const url = chalk.cyanBright.bold("https://github.com/GBrachetta/frames");
  const pipenv = chalk.cyan.bold("Pipenv");
  const vsc = chalk.cyan.bold("Visual Studio Code");
  const help = chalk.keyword("powderblue");

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

  pressAnyKey(
    chalk.greenBright("Press any key to go back to the menu...")
  ).then(() => {
    menu();
  });
};

export const goodbye = (framework, framecolor, name) => {
  const bye = gradient("yellow", "tomato", "cyan");

  if (!name) {
    shell.echo();
    shell.echo(bye(figlet.textSync("  Bye!")));
    shell.echo();
    return;
  }
  const path = framecolor(` ${process.cwd()}/${name} `);
  const project = `${framecolor(` ${framework} `)} project`;
  shell.echo(chalk.greenBright.bold("\nAll done!\n"));
  shell.echo(
    chalk.cyanBright.bold(
      `Your ${project} is ready at ${path}. Now go and create a great app!`
    )
  );
  shell.echo();
  shell.echo(bye(figlet.textSync("  Bye!")));
  shell.echo();
};

export const noPython = () => {
  shell.echo(
    chalk
      .keyword("tomato")
      .bold.underline("\nMust have Python > 3.6 installed to run Django!\n")
  );
  process.exit(1);
};

export const failedPipenv = (error) => {
  shell.echo(
    chalk
      .keyword("tomato")
      .bold.underline("Failed to install Pipenv, please install!")
  );
  shell.echo(
    chalk.greenBright.bold("\nVisit: https://pypi.org/project/pipenv/")
  );
  shell.echo(
    chalk.keyword("tomato").bold.underline("\nMessage:"),
    chalk.cyanBright(error.message),
    "\n"
  );
  process.exit(1);
};
