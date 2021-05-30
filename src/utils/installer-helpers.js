import execa from "execa";
import fse from "fs-extra";
import shell from "shelljs";
import install from "./installer.js";
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
  if (!which("pip3")) noPython();
};

export const installPipenv = async () => {
  if (!which("pipenv")) {
    try {
      await execa("pip3", ["install", "--user", "pipenv"]);
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

export const migrateDjango = async ({ targetDir }) => {
  return await execa("pipenv", ["run", "python", "manage.py", "migrate"], {
    cwd: targetDir,
  });
};

export const createSuperuser = async ({ targetDir }) => {
  return await execa("pipenv", ["run", "python", "manage.py", "makesuper"], {
    cwd: targetDir,
  });
};

export const removeMakesuper = async ({ targetDir }) => {
  return await fse.remove(`${targetDir}/core/management/commands/makesuper.py`);
};

export const goAhead = (framework, name, frameColor, errorColor) => {
  if (framework === "React") {
    install(name.project, "react", framework, frameColor);
  } else if (framework === "Vite-React") {
    install(name.project, "vite-react", framework, frameColor);
  } else if (framework === "Vite-Vue") {
    install(name.project, "vite-vue", framework, frameColor);
  } else if (framework === "Next.js") {
    install(name.project, "nextjs", framework, frameColor);
  } else if (framework === "Django") {
    install(name.project, "django", framework, frameColor);
  } else {
    shell.echo(errorColor("Invalid option!"));
  }
};
