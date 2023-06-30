#!/usr/bin/env node

// this should be added when you are writing a command line script
// for somebody else to use this tell your pc or operating system to execute the execute the with nodejs installed in the system this is called a shebang

// npm i chalk chalk-animation figlet gradient-string inquirer nanospinner

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

// chalk package colors text
// https://www.youtube.com/watch?v=_oHByo8tiEY&t=186s

// console.log(chalk.bgGreen("hi mom"));

let playerName;

const sleep = function (ms = 2000) {
  // this is a promise based timeout
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

async function welcome() {
  // chalkanimation is built on top of chalk to make the text rainbow
  const rainbowTitle = chalkAnimation.rainbow(
    "Who wants to be a Javascript Millionaire \n"
  );

  //   \n is called a line breaker

  await sleep();
  rainbowTitle.stop();
  //allows to move on to the next step
  console.log(`
  ${chalk.bgBlue("HOW TO PLAY")}
  I'am a process on your computer.
  If you get any question wrong I will be ${chalk.bgRed("Killed")}
  So get all the questions right...

  `);
}

//we need to use top level await for this to load up everything and output
// await welcome();

async function askName() {
  // inquirer package is used to collect user input from command line
  const answers = await inquirer.prompt({
    //type input is a like a form that a user can type into
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  //assigned to the global playerName variable
  playerName = answers.player_name;
}

// await askName();

async function question1() {
  const answers = await inquirer.prompt({
    //type input is a like a form that a user can type into
    name: "question_1",
    type: "list",
    message: "Javascript was created in 10 days then released on? \n ",
    choices: [
      "May 3rd, 1995",
      "November 24th, 1995",
      "Dec 4th, 1995",
      "Dec 17th, 1996",
    ],
  });

  return handleAnswer(answers.question_1 === "Dec 4th, 1995");
}

async function question2() {
  const answers = await inquirer.prompt({
    //type input is a like a form that a user can type into
    name: "question_2",
    type: "list",
    message: "JavaScript File Has An Extension of? \n ",
    choices: ["Java", "Js", "Javascript", "XML"],
  });

  return handleAnswer(answers.question_2 === "Js");
}

async function question3() {
  const answers = await inquirer.prompt({
    //type input is a like a form that a user can type into
    name: "question_3",
    type: "list",
    message: "The Tag is used To Give Heading To The Table? \n ",
    choices: ["Head", "TD", "TH", "Caption"],
  });

  return handleAnswer(answers.question_3 === "TH");
}

async function handleAnswer(isCorrect) {
  // this will run the package for 2 seconds while checking the answer
  const spinner = createSpinner("Checking answer...").start();

  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `🎉🙋Nice Work ${playerName}. Thats a legit answer`,
    });
  } else {
    spinner.error({ text: `💀💀💀 Game over, You lose ${playerName}!` });
    //this exits the process 1 means with errors kills the script instantly 0 means everything is fine
    process.exit(1);
  }
}

async function winner() {
  console.clear();
  const msg = `Congrats, ${playerName}! \n You just won $1,000,000.00`;

  figlet(msg, (err, data) => {
    //figlet package converts text into ASCII like characters design
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await winner();
