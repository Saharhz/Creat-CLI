#!/usr/bin/env node

import fs from "fs";
import { Command } from "commander";
import inquirer from "inquirer";

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
      validate: (input: string) =>
        input ? true : "Function name can not be empty.",
    },
    {
      type: "input",
      name: "params",
      message: "Enter the input parameters (comma seperated):",
    },
  ]);

  const { functionName, params } = answers;
  const input = params
    .split(",")
    .map((p: string) => p.trim())
    .filter(Boolean);

  const code = `function ${functionName}(${input
    .map((_: any, i: any) => `param${i + 1}`)
    .join(", ")}) {
      // TODO: implement this function
    }
    export default ${functionName}; //export sth from a file, so that other files can use it
`;

  fs.writeFileSync(`${functionName}.ts`, code);
  console.log(`'${functionName}.ts created successfully!`);
});

program.parse(process.argv);
