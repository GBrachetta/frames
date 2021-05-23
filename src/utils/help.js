import shell from "shelljs";
import chalk from "chalk";

const help = () => {
  shell.echo();
  shell.echo(chalk.redBright("Frames"), "scaffolds apps in different flavors.");
  shell.echo();
  shell.echo(
    `If ${chalk.cyan(
      "Visual Studio Code"
    )} is installed, it starts it once the app has been installed.`
  );
  shell.echo();
  shell.echo(
    `${chalk.redBright("Frames")} also checks for the existence of ${chalk.cyan(
      "Homebrew"
    )} and installs it if it's not present.`
  );
  shell.echo();
  shell.echo(
    `${chalk.redBright("Frames")} also checks for ${chalk.cyan(
      "jq"
    )} and eventually installs it.`
  );
  shell.echo(
    `${chalk.cyan(
      "Jq"
    )} is used to modify json files according to the name chosen for the app.`
  );
  shell.echo();
  shell.echo(
    `Make sure you run ${chalk.redBright(
      "Frames"
    )} in the parent directory of the app you want to scaffold.`
  );
  shell.echo();
  shell.echo(
    `${chalk.redBright("Frames")} was created by ${chalk.blueBright.italic(
      "Guillermo Brachetta."
    )}`
  );
  shell.echo();
  shell.echo("Feel free to use, distribute and contribute:");
  shell.echo();
  shell.echo(`${chalk.cyanBright("https://github.com/GBrachetta/frames")}`);
  shell.echo();
};

export default help;
