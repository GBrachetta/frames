import execa from "execa";
import fse from "fs-extra";
import shell from "shelljs";
import { failedPipenv, noPython } from "./utils.js";

const { which } = shell;

export const copyTemplateFiles = async ({ templateDir, targetDir }) => {
  return await fse.copy(templateDir, targetDir);
};

export const renameGitignore = async ({ targetDir }) => {
  return await fse.rename(`${targetDir}/gitignore`, `${targetDir}/.gitignore`);
};

export const installDeps = async ({ targetDir }) => {
  return await execa("yarn", {
    cwd: targetDir,
  });
};

export const gitInit = async ({ targetDir }) => {
  return await execa("git", ["init"], {
    cwd: targetDir,
  });
};

export const gitAdd = async ({ targetDir }) => {
  return await execa("git", ["add", "."], {
    cwd: targetDir,
  });
};

export const gitCommit = async ({ targetDir }) => {
  return await execa("git", ["commit", "-m", "initial commit by Frames"], {
    cwd: targetDir,
  });
};

export const checkPython = async () => {
  if (!which("pip3")) {
    noPython();
  }
};

export const installPipenv = async ({ targetDir }) => {
  if (!which("pipenv")) {
    try {
      return await execa("pip3", ["install", "--user", "pipenv"], {
        cwd: targetDir,
      });
    } catch (error) {
      failedPipenv(error);
    }
  }
};

export const installPythonDeps = async ({ targetDir }) => {
  return await execa("pipenv", ["install"], {
    cwd: targetDir,
  });
};

export const installPythonDevDeps = async ({ targetDir }) => {
  return await execa("pipenv", ["install", "--dev"], {
    cwd: targetDir,
  });
};

export const renameDjangoApp = async ({ name, targetDir }) => {
  return await execa(
    "pipenv",
    ["run", "python", "manage.py", "rename", "boilerplate", name],
    {
      cwd: targetDir,
    }
  );
};

export const openVSC = async ({ targetDir }) => {
  if (which("code")) {
    return await execa("code", ["."], {
      cwd: targetDir,
    });
  }
};
