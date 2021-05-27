import chalk from "chalk";
import figlet from "figlet";
import pressAnyKey from "press-any-key";
import shell from "shelljs";
import menu from "../cli.js";

export const helpMe = () => {
  const frames = chalk.redBright.bold("Frames");
  const author = chalk.blueBright.italic.bold("Guillermo Brachetta.");
  const url = chalk.cyanBright.bold("https://github.com/GBrachetta/frames");
  const pipenv = chalk.cyan.bold("Pipenv");
  const vsc = chalk.cyan.bold("Visual Studio Code");

  shell.echo(`\n${frames} scaffolds apps in different flavors.`);
  shell.echo(`\nIf ${vsc} is installed, it starts it once the all is done.`);
  shell.echo(`\n${frames} checks for ${pipenv} and eventually installs it.`);
  shell.echo(`\nRun ${frames} in the parent directory of your app.`);
  shell.echo(`\n${frames} was created by ${author}`);
  shell.echo(`\nFeel free to use, share and contribute: ${url}\n`);

  pressAnyKey(
    chalk.greenBright("Press any key to go back to the menu...")
  ).then(() => {
    menu();
  });
};

export const goodbye = (framework, framecolor, name) => {
  if (!name) {
    shell.echo();
    shell.echo(chalk.yellowBright.bold(figlet.textSync("  Bye!")));
    shell.echo();
    return;
  }
  const path = framecolor(` ${process.cwd()}/${name} `);
  const project = `${framecolor(` ${framework} `)} project`;
  shell.echo();
  shell.echo(chalk.greenBright.bold("All done!"));
  shell.echo();
  shell.echo(
    chalk.cyanBright.bold(
      `Your ${project} is ready at ${path}. Now go and create a great app!`
    )
  );
  shell.echo();
  shell.echo(chalk.yellowBright.bold(figlet.textSync("  Bye!")));
  shell.echo();
};

export const noPython = () => {
  shell.echo();
  shell.echo(
    chalk.redBright.bold("Must have Python > 3.6 installed to run Django!")
  );
  shell.echo();
  process.exit(1);
};

export const failedPipenv = (error) => {
  shell.echo();
  shell.echo(chalk.redBright.bold("Failed to install Pipenv, please install!"));
  shell.echo();
  shell.echo(chalk.greenBright.bold("Visit: https://pypi.org/project/pipenv/"));
  shell.echo();
  shell.echo(chalk.redBright.bold("Message:"), chalk.cyanBright(error.message));
  shell.echo();
  process.exit(1);
};
