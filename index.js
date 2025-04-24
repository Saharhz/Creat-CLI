#!/usr/bin/env node

import fs from "fs";
import { Command } from "commander"; //commander is a library for creating custom command and help messages, for example here version and description
import inquirer from "inquirer"; // a library to ask user interactive question in the terminal, forexample input and language here

const program = new Command(); // create an instance of a command-line interface and save it in program variable

program //customize the CLI that I created- it provides info when a person usr --help or --version
  .name("generate-func") //sets name of your command-line tool
  .description("CLI to generate a JavaScript function file") //add a short explanation
  .version("1.0.0"); // add the version of my CLI
// using inquirer library, to ask the user questions, using async ...await to wait for the answers, then run the program
program.action(async () => {
  //prompt() method gives an array of questions
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "functionName",
      message: "Enter the function name:",
      validate: (input) => (input ? true : "Function name can not be empty."),
    },
    {
      type: "list",
      name: "language",
      message: "Choose the programming language:",
      choices: ["python", "javascript"],
    },
    {
      type: "input",
      name: "params",
      message: "Enter the input parameters (comma seperated):",
    },
  ]);

  const { functionName, language, params } = answers;
  const inputParams = params
    .split(",") //using map and split to go through params and split into array
    .map((p) => p.trim()) // trim will remove space
    .filter(Boolean); //filter will remove unwanted strings

  let boilerplate = "";
  let extension = "";

  if (language === "python") {
    extension = "py";
    boilerplate = `def ${functionName}(${inputParams.join(
      ", "
    )}):\n    # Your code here\n    return\n`;
  } else if (language === "javascript") {
    extension = "js";
    boilerplate = `function ${functionName}(${inputParams.join(
      ", "
    )}) {\n  // Your code here\n  return;\n}\n`;
  }

  fs.writeFileSync(`${functionName}.${extension}`, boilerplate);
  console.log(`✅ ${functionName}.${extension} created successfully!`);
});

program.parse(process.argv); //process.argv is a built in nodeJS Object
