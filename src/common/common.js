import { platform } from "os";

const getOS = async () => {
  const usrPlatform = platform();
  switch (usrPlatform) {
    case "win32":
      return "windows";
    case "darwin":
      return "macos";
    case "linux":
      return "linux";
    default:
      return "";
  }
};

export default getOS;
