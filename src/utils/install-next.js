import { execSync, spawnSync } from "child_process";
import shell from "shelljs";
import chalk from "chalk";

const installNext = (name) => {
  shell.echo(chalk.cyan(`Installing ${name}...`));
  spawnSync("yarn", ["create", "next-app", name]);
  shell.cd(`./${name}`);
  spawnSync("yarn", ["add", "prop-types"]);
  spawnSync("yarn", ["add", "-D", "eslint", "prettier"]);
  spawnSync("npx", [
    "install-peerdeps",
    "-D",
    "@gbrachetta/eslint-config",
    "-Y",
  ]);

  const files = "package.json >tmpfile && mv tmpfile package.json";
  const eslint = `jq '.+ {prettier: \"@gbrachetta/prettier-config\"}' ${files}`;
  const eslint1 = `jq '.eslintConfig.extends=\"@gbrachetta/eslint-config\"' ${files}`;
  const eslint2 = `jq '.scripts.lint=\"eslint ./pages/*.js --ignore-path .gitignore\"' ${files}`;
  const eslint3 = `jq '.scripts."lint:fix"=\"npm run lint -- --fix\"' ${files}`;
  const eslint4 = `jq '.scripts.format=\"prettier --write ./pages/*.js \\"{,!(node_modules)/**/}*.js\\"\"' ${files}`;

  execSync(eslint);
  execSync(eslint1);
  execSync(eslint2);
  execSync(eslint3);
  execSync(eslint4);

  spawnSync("yarn", ["format"]);
  spawnSync("yarn", ["lint:fix"]);
  spawnSync("git", ["init"]);
  spawnSync("git", ["add", "."]);
  spawnSync("git", ["commit", "-m", "'Initial commit by Frames'"]);

  spawnSync("code", ["."]);
};

export default installNext;
