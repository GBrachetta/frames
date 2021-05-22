import { spawnSync } from "child_process";
import shell from "shelljs";
import chalk from "chalk";

const installDjango = (name) => {
  shell.echo(chalk.cyan(`Installing ${name}...`));
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
