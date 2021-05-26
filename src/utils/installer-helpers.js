import execa from "execa";
import ncp from "ncp";
import { promisify } from "util";
import shell from "shelljs";

const copy = promisify(ncp);
const { which } = shell;

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

export const openVSC = async (options) => {
  if (which("code")) {
    return await execa("code", ["."], {
      cwd: options.targetDir,
    });
  }
};

export const installPipenv = async (options) => {
  if (!which("brew")) {
    await execa(
      "/bin/bash",
      [
        "-c",
        "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)",
      ],
      {
        cwd: options.targetDir,
      }
    );
    if (!which("pipenv")) {
      return await execa("brew", ["install", "pipenv"], {
        cwd: options.targetDir,
      });
    }
  }
};
