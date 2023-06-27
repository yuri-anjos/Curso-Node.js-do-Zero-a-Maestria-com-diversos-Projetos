import inquirer from "inquirer";
import chalk from 'chalk';

inquirer.prompt([
    {
        name: 'p1',
        message: 'Qual o seu Nome?'
    },
    {
        name: 'p2',
        message: 'Qual a sua Idade?'
    }
]).then(answers => {
    if(!answers.p1 || isNaN(answers.p2)) {
        throw new Error("O nome e idade são obrigatórios.")
    }
    
    console.log(chalk.bgYellow.black(`O ${answers.p1} tem ${answers.p2} anos de idade!`))
}).catch(err => {
    console.log(chalk.bgRed.white(err))
})