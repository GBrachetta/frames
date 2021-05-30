import figlet from "figlet";
import pressAnyKey from "press-any-key";
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
    console.log(title(figlet.textSync("  Bye!")), "\n");
    return;
  }
  const path = framecolor(`${process.cwd()}/${name}`);
  const project = `${framecolor(framework)} project`;
  console.log(helpMenu("\n  All done!\n"));
  console.log(
    accent(
      `  Your ${project} is ready at ${path}.\n  Now go and create a great app!\n`
    )
  );
  switch (framework) {
    case "Django":
      console.log(
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
      console.log(
        accent(`  Start development server with ${framecolor("yarn start\n")}`)
      );
      break;
    default:
      console.log(
        accent(`  Start development server with ${framecolor("yarn dev\n")}`)
      );
  }

  console.log(title(figlet.textSync("  Bye!")), "\n");
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
