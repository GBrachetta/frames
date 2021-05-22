import shell from "shelljs";
import chalk from "chalk";

const help = () => {
  shell.echo();
  shell.echo(chalk.redBright("Frames"), "scaffolds apps in different flavors.");
  shell.echo(
    `It assumes you have ${chalk.cyan(
      "Visual Studio Code"
    )} installed in your system`
  );
  shell.echo("and starts the editor for the app created.");
  shell.echo();
  shell.echo(
    `${chalk.redBright("Frames")} also checks for the existence of ${chalk.cyan(
      "Homebrew"
    )}`
  );
  shell.echo("and installs it if it's not present.");
  shell.echo();
  shell.echo(
    `It also checks for ${chalk.cyan("jq")} and eventually installs it.`
  );
  shell.echo(
    `${chalk.cyan(
      "jq"
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
    `${chalk.redBright("Frames")} was created by ${chalk.blueBright(
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
