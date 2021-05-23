import chalk from "chalk";
import { spawnSync } from "child_process";
import { sync as commandExists } from "command-exists";
import shell from "shelljs";
import { brewInstall, pipenvInstall } from "./utils.js";

const installDjango = (name) => {
  if (!commandExists("brew")) {
    brewInstall();
  }

  if (!commandExists("pipenv")) {
    pipenvInstall();
  }

  shell.echo(
    chalk.cyan(
      `Installing ${name}. Please hold, this will take some moments...`
    )
  );
  shell.mkdir(name);
  shell.cd(`./${name}`);
  spawnSync("gh", ["repo", "clone", "GBrachetta/boilerplate-django", "."]);
  spawnSync("rm", ["-rf", ".git"]);
  spawnSync("pipenv", ["install"]);
  spawnSync("pipenv", ["install", "--dev"]);
  spawnSync("pipenv", [
    "run",
    "python",
    "manage.py",
    "rename",
    "boilerplate",
    name,
  ]);

  spawnSync("git", ["init"]);
  spawnSync("git", ["add", "."]);
  spawnSync("git", ["commit", "-m", "'Initial commit by Frames'"]);

  spawnSync("code", ["."]);
};

export default installDjango;
