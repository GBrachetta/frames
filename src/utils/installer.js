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
import { colors, goodbye } from "./utils.js";

const install = async (name, template, framework, frameColor) => {
  const { errorColor, step } = colors;
  const targetDir = `${process.cwd()}/${name}`;

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
    errorColor: errorColor,
  };

  const tasksReactive = new Listr([
    {
      title: step("Copy project files"),
      task: () => copyTemplateFiles(options),
    },
    {
      title: step("Generate gitignore"),
      task: () => renameGitignore(options),
    },
    {
      title: step("Install dependencies"),
      task: () => installDeps(options),
    },
    {
      title: step("Initialize git repository"),
      task: () => gitInit(options),
    },
    {
      title: step("Stage files to commit area"),
      task: () => gitAdd(options),
    },
    {
      title: step("Commit files"),
      task: () => gitCommit(options),
    },
    {
      title: step("Start editor"),
      task: () => openVSC(options),
    },
  ]);

  const tasksDjango = new Listr([
    {
      title: step("Check if Python is installed"),
      task: () => checkPython(options),
    },
    {
      title: step("Check if Pipenv is installed"),
      task: () => installPipenv(options),
    },
    {
      title: step("Copy project files"),
      task: () => copyTemplateFiles(options),
    },
    {
      title: step("Generate gitignore"),
      task: () => renameGitignore(options),
    },
    {
      title: step("Install dependencies"),
      task: () => installPythonDeps(options),
    },
    {
      title: step("Install dev dependencies"),
      task: () => installPythonDevDeps(options),
    },
    {
      title: step(`Rename app to ${frameColor(` ${name} `)}`),
      task: () => renameDjangoApp(options),
    },
    {
      title: step("Initialize git repository"),
      task: () => gitInit(options),
    },
    {
      title: step("Stage files to commit area"),
      task: () => gitAdd(options),
    },
    {
      title: step("Commit files"),
      task: () => gitCommit(options),
    },
    {
      title: step("Start editor"),
      task: () => openVSC(options),
    },
  ]);

  const tasks = template === "django" ? tasksDjango : tasksReactive;

  await tasks.run();
  goodbye(framework, frameColor, options.name);
};

export default install;
