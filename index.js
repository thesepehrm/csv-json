const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const inquirer = require("./lib/inquirer");
const convert = require("./lib/convert");

clear();

console.log(
    chalk.yellow(
        figlet.textSync('CSV-JSON', { horizontalLayout: 'full' })
    )
);

const run = async () => {
    const { conversion } = await inquirer.askWhatToConvert();
    const { dir } = await inquirer.askDir();
    convert.parseModeFromAnswer(conversion);
    convert.convertAllFiles(dir);
    console.log(chalk.green('Done!'));
}

// Run
run();