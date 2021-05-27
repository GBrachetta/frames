import chalk from "chalk";
import figlet from "figlet";
import shell from "shelljs";
import pressAnyKey from "press-any-key";
import menu from "../cli.js";

export const helpMe = () => {
  const frames = chalk.redBright.bold("Frames");
  const author = chalk.blueBright.italic.bold("Guillermo Brachetta.");
  const url = chalk.cyanBright.bold("https://github.com/GBrachetta/frames");
  const pipenv = chalk.cyan.bold("Pipenv");
  const vsc = chalk.cyan.bold("Visual Studio Code");

  shell.echo();
  shell.echo(`${frames} scaffolds apps in different flavors.`);
  shell.echo();
  shell.echo(`If ${vsc} is installed, it starts it once the all is done.`);
  shell.echo();
  shell.echo(`${frames} checks for ${pipenv} and eventually installs it.`);
  shell.echo();
  shell.echo(`Run ${frames} in the parent directory of your app.`);
  shell.echo();
  shell.echo(`${frames} was created by ${author}`);
  shell.echo();
  shell.echo(`Feel free to use, share and contribute: ${url}`);
  shell.echo();

  pressAnyKey(
    chalk.greenBright("Press any key to go back to the menu...")
  ).then(() => {
    menu();
  });
};

export const goodbye = (name) => {
  const path = chalk.bgBlue.whiteBright(` ${process.cwd()}/${name} `);
  if (!name) {
    shell.echo();
    shell.echo(chalk.yellowBright.bold(figlet.textSync("Bye!")));
    shell.echo();
    return;
  }
  console.log();
  console.log(chalk.greenBright.bold("All done!"));
  console.log();
  console.log(
    chalk.cyanBright.bold(
      `Your frame is ready at ${path}. Now go and create a great app!`
    )
  );
  console.log();
  console.log(chalk.yellowBright.bold(figlet.textSync("Bye!")));
  console.log();
};
