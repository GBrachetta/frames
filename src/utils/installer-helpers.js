import execa from "execa";
import ncp from "ncp";
import { promisify } from "util";

const copy = promisify(ncp);

export const copyTemplateFiles = async (options) => {
  return copy(options.templateDir, options.targetDir, {
    clobber: false,
  });
};

export const installDeps = async (options) => {
  return await execa("yarn", {
    cwd: options.targetDir,
  });
};

export const gitInit = async (options) => {
  return await execa("git", ["init"], {
    cwd: options.targetDir,
  });
};

export const gitAdd = async (options) => {
  return await execa("git", ["add", "."], {
    cwd: options.targetDir,
  });
};

export const gitCommit = async (options) => {
  return await execa("git", ["commit", "-m", "initial commit by Frames"], {
    cwd: options.targetDir,
  });
};

export const installPythonDeps = async (options) => {
  return await execa("pipenv", ["install"], {
    cwd: options.targetDir,
  });
};

export const installPythonDevDeps = async (options) => {
  return await execa("pipenv", ["install", "--dev"], {
    cwd: options.targetDir,
  });
};

export const renameDjangoApp = async (options) => {
  return await execa(
    "pipenv",
    ["run", "python", "manage.py", "rename", "boilerplate", options.name],
    {
      cwd: options.targetDir,
    }
  );
};

export const activateVenv = async (options) => {
  return await execa("activate", {
    cwd: options.targetDir,
  });
};

export const openVSC = async (options) => {
  return await execa("code", ["."], {
    cwd: options.targetDir,
  });
};
