const fs=require("fs");
const path=require("path");

const displayTree=function(startingPath){
  if(startingPath==undefined){
    console.log("please enter valid directory path");
    return;
  }
  const fileorDirectoryExist=fs.existsSync(startingPath);
  if(fileorDirectoryExist){
    helperTreeFunction(startingPath," ");
  }
}

const helperTreeFunction=function(startingPath,indent){
   let isFile=fs.lstatSync(startingPath).isFile();
   if(isFile){
    let fileName=path.basename(startingPath);
    console.log(indent + "├── " + fileName);
        return;
   }

   const allFiles=fs.readdirSync(startingPath);
   let dirName=path.basename(startingPath);
   console.log(indent + "└──" + dirName);
   for(let i=0;i<allFiles.length;i++){
       const completePath=path.join(startingPath,allFiles[i]);
       helperTreeFunction(completePath, indent + "\t");
   }
   
}

module.exports={
    displayTreePath:displayTree
}
