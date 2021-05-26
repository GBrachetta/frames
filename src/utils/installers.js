import Listr from "listr";
import path from "path";
import {
  copyTemplateFiles,
  gitAdd,
  gitCommit,
  gitInit,
  installDeps,
  installPythonDeps,
  installPythonDevDeps,
  renameDjangoApp,
  activateVenv,
  openVSC,
} from "./installer-helpers.js";
import { goodbye } from "./utils.js";
import execa from "execa";

export const installReact = async (name) => {
  const targetDir = `${process.cwd()}/${name}`;

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    "react"
  );

  const options = {
    name: name,
    targetDir: targetDir,
    templateDir: templateDir,
  };

  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(options),
    },
    {
      title: "Install dependencies",
      task: () => installDeps(options),
    },
    {
      title: "Initialize git repository",
      task: () => gitInit(options),
    },
    {
      title: "Stage files to commit area",
      task: () => gitAdd(options),
    },
    {
      title: "Commit files",
      task: () => gitCommit(options),
    },
  ]);

  await tasks.run();
  goodbye(options.name);
};

export const installNext = async (name) => {
  const targetDir = `${process.cwd()}/${name}`;

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    "nextjs"
  );

  const options = {
    name: name,
    targetDir: targetDir,
    templateDir: templateDir,
  };

  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(options),
    },
    {
      title: "Install dependencies",
      task: () => installDeps(options),
    },
    {
      title: "Initialize git repository",
      task: () => gitInit(options),
    },
    {
      title: "Stage files to commit area",
      task: () => gitAdd(options),
    },
    {
      title: "Commit files",
      task: () => gitCommit(options),
    },
  ]);

  await tasks.run();
  goodbye(options.name);
};

export const installViteReact = async (name) => {
  const targetDir = `${process.cwd()}/${name}`;

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    "vite-react"
  );

  const options = {
    name: name,
    targetDir: targetDir,
    templateDir: templateDir,
  };

  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(options),
    },
    {
      title: "Install dependencies",
      task: () => installDeps(options),
    },
    {
      title: "Initialize git repository",
      task: () => gitInit(options),
    },
    {
      title: "Stage files to commit area",
      task: () => gitAdd(options),
    },
    {
      title: "Commit files",
      task: () => gitCommit(options),
    },
  ]);

  await tasks.run();
  goodbye(options.name);
};

export const installViteVue = async (name) => {
  const targetDir = `${process.cwd()}/${name}`;

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    "vite-vue"
  );

  const options = {
    name: name,
    targetDir: targetDir,
    templateDir: templateDir,
  };

  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(options),
    },
    {
      title: "Install dependencies",
      task: () => installDeps(options),
    },
    {
      title: "Initialize git repository",
      task: () => gitInit(options),
    },
    {
      title: "Stage files to commit area",
      task: () => gitAdd(options),
    },
    {
      title: "Commit files",
      task: () => gitCommit(options),
    },
  ]);

  await tasks.run();
  goodbye(options.name);
};

export const installDjango = async (name) => {
  const targetDir = `${process.cwd()}/${name}`;

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    "django"
  );

  const options = {
    name: name,
    targetDir: targetDir,
    templateDir: templateDir,
  };

  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(options),
    },
    {
      title: "Install dependencies",
      task: () => installPythonDeps(options),
    },
    {
      title: "Install dev dependencies",
      task: () => installPythonDevDeps(options),
    },
    {
      title: `Rename app to ${options.name}`,
      task: () => renameDjangoApp(options),
    },
    {
      title: "Initialize git repository",
      task: () => gitInit(options),
    },
    {
      title: "Stage files to commit area",
      task: () => gitAdd(options),
    },
    {
      title: "Commit files",
      task: () => gitCommit(options),
    },
  ]);

  await tasks.run();
  goodbye(options.name);
  await execa("code", ["."], {
    cwd: options.targetDir,
  });
};
