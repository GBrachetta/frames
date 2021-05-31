import Listr from "listr";
import path from "path";
import {
  checkPython,
  copyTemplateFiles,
  createSuperuser,
  gitAdd,
  gitCommit,
  gitInit,
  installDeps,
  installPipenv,
  installPythonDeps,
  installPythonDevDeps,
  migrateDjango,
  openVSC,
  removeMakesuper,
  renameDjangoApp,
  renameGitignore,
} from "./installer-helpers.js";
import { goodbye } from "./utils.js";
import colors from "./colors.js";
import getOS from "../common/common.js";

const install = async (name, template, framework, frameColor) => {
  const usrOS = await getOS();
  const { errorColor, step } = colors;
  const targetDir =
    usrOS === "macos" || usrOS === "linux"
      ? `${process.cwd()}/${name}`
      : `${process.cwd()}\\${name}`;

  const currentFileUrl = import.meta.url;
  const winPath = path
    .resolve(new URL(currentFileUrl).pathname, "../../templates", template)
    .slice(3);
  const macPath = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    template
  );
  const templateDir = usrOS === "windows" ? winPath : macPath;

  const options = {
    name,
    targetDir,
    templateDir,
    errorColor,
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
      task: () => checkPython(),
    },
    {
      title: step("Check if Pipenv is installed"),
      task: () => installPipenv(),
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
      title: step(`Rename app to ${frameColor(name)}`),
      task: () => renameDjangoApp(options),
    },
    {
      title: step("Run initial migrations"),
      task: () => migrateDjango(options),
    },
    {
      title: step("Create superuser"),
      task: () => createSuperuser(options),
    },
    {
      title: step("Cleaning superuser script"),
      task: () => removeMakesuper(options),
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
