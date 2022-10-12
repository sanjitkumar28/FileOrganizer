const fs = require("fs");
const path = require("path");

let typesOfFile = {
  media: ["mp4", "mkv", "mp3", "mov"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
    "csv",
    "json",
  ],
  app: ["exe", "dmg", "pkg", "deb", "apk"],
  images: ["png", "jpg", "jpeg"],
};

const organizeFiles = function (srcPath) {
  if (srcPath == undefined) {
    srcPath = process.cwd();
  }

  destinationPath = path.join(srcPath, "OrganizeFile");
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath);
  }

  const allFiles = fs.readdirSync(srcPath);
  for (let i = 0; i < allFiles.length; i++) {
    const fullPathOfFile = path.join(srcPath, allFiles[i]);
    let isFilePresent = fs.lstatSync(fullPathOfFile).isFile();
    if (isFilePresent) {
      let fileExtension = allFiles[i].split(".")[1];
      let folderName = getFolderName(fileExtension);
      copyFileToDestn(srcPath, fullPathOfFile, folderName);
    }
  }
};

const getFolderName = function (fileExtension) {
  for (let key in typesOfFile) {
    for (let i = 0; i < typesOfFile[key].length; i++) {
      if (typesOfFile[key][i] == fileExtension) {
        return key;
      }
    }
  }
};

const copyFileToDestn = function (srcPath, fullPathOfFile, folderName) {
  const destinationFolderPath = path.join(srcPath, "OrganizeFile", folderName);
  //  console.log("destinationFolder"+destinationFolder);
  if (!fs.existsSync(destinationFolderPath)) {
    fs.mkdirSync(destinationFolderPath);
  }
  let fileName = path.basename(fullPathOfFile);
  let destFileName = path.join(destinationFolderPath, fileName);
  fs.copyFileSync(fullPathOfFile, destFileName);
};

module.exports = {
  organize: organizeFiles,
};
