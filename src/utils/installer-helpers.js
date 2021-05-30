import execa from "execa";
import fse from "fs-extra";
import shell from "shelljs";
import install from "./installer.js";
import { failedPipenv, noPython } from "./utils.js";

const { which } = shell;

export const copyTemplateFiles = async ({ templateDir, targetDir }) =>
  fse.copy(templateDir, targetDir);

export const renameGitignore = async ({ targetDir }) =>
  fse.rename(`${targetDir}/gitignore`, `${targetDir}/.gitignore`);

export const installDeps = async ({ targetDir }) =>
  execa("yarn", { cwd: targetDir });

export const gitInit = async ({ targetDir }) =>
  execa("git", ["init"], { cwd: targetDir });

export const gitAdd = async ({ targetDir }) =>
  execa("git", ["add", "."], { cwd: targetDir });

export const gitCommit = async ({ targetDir }) =>
  execa("git", ["commit", "-m", "initial commit by Frames"], {
    cwd: targetDir,
  });

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

export const installPythonDeps = async ({ targetDir }) =>
  execa("pipenv", ["install"], { cwd: targetDir });

export const installPythonDevDeps = async ({ targetDir }) =>
  execa("pipenv", ["install", "--dev"], { cwd: targetDir });

export const renameDjangoApp = async ({ name, targetDir }) =>
  execa(
    "pipenv",
    ["run", "python", "manage.py", "rename", "boilerplate", name],
    {
      cwd: targetDir,
    }
  );

export const migrateDjango = async ({ targetDir }) =>
  execa("pipenv", ["run", "python", "manage.py", "migrate"], {
    cwd: targetDir,
  });

export const createSuperuser = async ({ targetDir }) =>
  execa("pipenv", ["run", "python", "manage.py", "makesuper"], {
    cwd: targetDir,
  });

export const removeMakesuper = async ({ targetDir }) =>
  fse.remove(`${targetDir}/core/management/commands/makesuper.py`);

export const openVSC = async ({ targetDir }) => {
  if (which("code")) execa("code", ["."], { cwd: targetDir });
};

export const goAhead = (framework, name, frameColor, errorColor) => {
  switch (framework) {
    case "React":
      install(name.project, "react", framework, frameColor);
      break;
    case "Vite-React":
      install(name.project, "vite-react", framework, frameColor);
      break;
    case "Vite-Vue":
      install(name.project, "vite-vue", framework, frameColor);
      break;
    case "Next.js":
      install(name.project, "nextjs", framework, frameColor);
      break;
    case "Django":
      install(name.project, "django", framework, frameColor);
      break;
    default:
      shell.echo(errorColor("Invalid option!"));
      break;
  }
};
