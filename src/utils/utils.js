import figlet from "figlet";
import pressAnyKey from "press-any-key";
import shell from "shelljs";
import menu from "../cli.js";
import colors from "./colors.js";

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
  shell.echo(help(`\n  ${frames} scaffolds apps in different flavors.`));
  shell.echo(
    help(
      `\n  If ${helpAccent(
        "VSCode"
      )} is installed, it starts it once the all is done.`
    )
  );
  shell.echo(
    help(
      `\n  ${frames} checks for ${helpAccent(
        "Pipenv"
      )} and eventually installs it.`
    )
  );
  shell.echo(help(`\n  Run ${frames} in the parent directory of your app.`));
  shell.echo(help(`\n  ${frames} was created by ${author}`));
  shell.echo(
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
    shell.echo(title(figlet.textSync("  Bye!")), "\n");
    return;
  }
  const path = framecolor(`${process.cwd()}/${name}`);
  const project = `${framecolor(framework)} project`;
  shell.echo(helpMenu("\n  All done!\n"));
  shell.echo(
    accent(
      `  Your ${project} is ready at ${path}.\n  Now go and create a great app!\n`
    )
  );
  switch (framework) {
    case "Django":
      shell.echo(
        accent(
          `  Activate your virtual environment with ${framecolor(
            "pipenv shell\n"
          )}`
        ),
        accent(
          ` Run server with ${framecolor("python manage.py runserver\n")}`
        ),
        accent(
          "\n  A superuser has been created with the following credentials:\n\n"
        ),
        accent(" Username:"),
        framecolor("admin"),
        accent("\n  Password:"),
        framecolor("admin"),
        accent("\n  Email:"),
        framecolor("admin@domain.com\n")
      );
      break;
    case "React":
      shell.echo(
        accent(`  Start development server with ${framecolor("yarn start\n")}`)
      );
      break;
    default:
      shell.echo(
        accent(`  Start development server with ${framecolor("yarn dev\n")}`)
      );
  }

  shell.echo(title(figlet.textSync("  Bye!")), "\n");
};

export const noPython = () => {
  shell.echo(errorColor("\nMust have Python > 3.6 installed to run Django!\n"));
  process.exit(1);
};

export const failedPipenv = (error) => {
  shell.echo(errorColor("Failed to install Pipenv, please install!"));
  shell.echo(helpMenu("\nVisit: https://pypi.org/project/pipenv/"));
  shell.echo(errorColor("\nMessage:"), accent(error.message), "\n");
  process.exit(1);
};
