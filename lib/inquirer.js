const inquirer = require('inquirer');

module.exports = {
    askWhatToConvert: () => {
        const questions = [
            {
                type: 'list',
                name: 'conversion',
                message: 'What do you want do convert?',
                choices: [
                    "CSV  -> JSON",
                    "JSON -> CSV"
                ],
                default: ['CSV -> JSON']
            }
        ];
        return inquirer.prompt(questions);
    },
    askDir: () => {
        const questions = [
            {
                type: 'input',
                name: 'dir',
                message: 'Where are your files located?',
                default: './inputs'
            }
        ];
        return inquirer.prompt(questions);
    }
};