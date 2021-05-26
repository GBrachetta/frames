import shell from "shelljs";
import chalk from "chalk";

const help = () => {
  shell.echo();
  shell.echo(
    chalk.redBright.bold("Frames"),
    "scaffolds apps in different flavors."
  );
  shell.echo();
  shell.echo(
    `If ${chalk.cyan.bold(
      "Visual Studio Code"
    )} is installed, it starts it once the app has been installed.`
  );
  shell.echo();
  shell.echo(
    `${chalk.redBright.bold(
      "Frames"
    )} checks for the existence of ${chalk.cyan.bold(
      "Pipenv"
    )} and installs it if it's not present.`
  );
  shell.echo();
  shell.echo(
    `Make sure you run ${chalk.redBright.bold(
      "Frames"
    )} in the parent directory of the app you want to scaffold.`
  );
  shell.echo();
  shell.echo(
    `${chalk.redBright.bold(
      "Frames"
    )} was created by ${chalk.blueBright.italic.bold("Guillermo Brachetta.")}`
  );
  shell.echo();
  shell.echo("Feel free to use, distribute and contribute:");
  shell.echo();
  shell.echo(
    `${chalk.cyanBright.bold("https://github.com/GBrachetta/frames")}`
  );
  shell.echo();
};

export default help;
