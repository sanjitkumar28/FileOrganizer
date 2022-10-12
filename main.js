const inputArray=process.argv.slice(2);
const helpFunction=require('./Commands/help');
const organizeFunc=require('./Commands/organize');
const treeFunction=require('./Commands/tree');
const commands=inputArray[0];
const path=inputArray[1];

switch(commands){
    case "tree":
        treeFunction.displayTreePath(path);
        break;
    case "organize":
        organizeFunc.organize(path);
        break;
    case "help":
        console.log("inside help");
        helpFunction.help();
        break;
    default:
        console.log("Command don't exist");
        break;
}