import chalk from "chalk";
import Listr from "listr";
import path from "path";
import {
  checkPython,
  copyTemplateFiles,
  gitAdd,
  gitCommit,
  gitInit,
  installDeps,
  installPipenv,
  installPythonDeps,
  installPythonDevDeps,
  openVSC,
  renameDjangoApp,
  renameGitignore,
} from "./installer-helpers.js";
import { goodbye } from "./utils.js";

const install = async (name, template, framework, frameColor) => {
  const targetDir = `${process.cwd()}/${name}`;
  const title = chalk.keyword("aquamarine").bold;

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    template
  );

  const options = {
    name: name,
    targetDir: targetDir,
    templateDir: templateDir,
  };

  const tasksReactive = new Listr([
    {
      title: title("Copy project files"),
      task: () => copyTemplateFiles(options),
    },
    {
      title: title("Generate gitignore"),
      task: () => renameGitignore(options),
    },
    {
      title: title("Install dependencies"),
      task: () => installDeps(options),
    },
    {
      title: title("Initialize git repository"),
      task: () => gitInit(options),
    },
    {
      title: title("Stage files to commit area"),
      task: () => gitAdd(options),
    },
    {
      title: title("Commit files"),
      task: () => gitCommit(options),
    },
    {
      title: title("Start editor"),
      task: () => openVSC(options),
    },
  ]);

  const tasksDjango = new Listr([
    {
      title: title("Check if Python is installed"),
      task: () => checkPython(options),
    },
    {
      title: title("Check if Pipenv is installed"),
      task: () => installPipenv(options),
    },
    {
      title: title("Copy project files"),
      task: () => copyTemplateFiles(options),
    },
    {
      title: title("Generate gitignore"),
      task: () => renameGitignore(options),
    },
    {
      title: title("Install dependencies"),
      task: () => installPythonDeps(options),
    },
    {
      title: title("Install dev dependencies"),
      task: () => installPythonDevDeps(options),
    },
    {
      title: title(`Rename app to ${frameColor(` ${name} `)}`),
      task: () => renameDjangoApp(options),
    },
    {
      title: title("Initialize git repository"),
      task: () => gitInit(options),
    },
    {
      title: title("Stage files to commit area"),
      task: () => gitAdd(options),
    },
    {
      title: title("Commit files"),
      task: () => gitCommit(options),
    },
    {
      title: title("Start editor"),
      task: () => openVSC(options),
    },
  ]);

  const tasks = template === "django" ? tasksDjango : tasksReactive;

  await tasks.run();
  goodbye(framework, frameColor, options.name);
};

export default install;
