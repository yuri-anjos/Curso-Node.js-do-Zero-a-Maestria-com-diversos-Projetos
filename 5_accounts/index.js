import chalk from 'chalk'
import inquirer from 'inquirer'
import fs from 'fs'

console.log(chalk.bgGreen.bold('Início'))

const operation = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: ['Criar sua conta', 'Consultar saldo', 'Depositar', 'Sacar', 'Sair']
    }]).then(({ action }) => {
        actions[action]()
    }).catch((err) => {
        console.error(err)
    })
}

const createAccount = () => {
    console.log(chalk.bgGreen.black('Obrigado por esclher nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir:'))

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para sua conta:'
        }
    ]).then(({ accountName }) => {
        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (checkAccount(accountName)) {
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome.'))
            createAccount()
            return
        } else {
            fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', (err) => {
                console.error(err)
            })
        }

        operation()
    }).catch((err) => {
        console.error(err)
    })
}

const deposit = () => {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then(({ accountName }) => {
        if (!checkAccount(accountName)) {
            console.log(chalk.bgRed.black(`A conta ${accountName} não existe`))
            deposit()
            return
        }

        inquirer.prompt([
            {
                name: 'ammount',
                message: 'Quanto você deseja depositar?'
            }
        ]).then(({ ammount }) => {
            if (!ammount || ammount < 0) {
                console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'))
                deposit()
                return
            }

            const account = getAccount(accountName)
            account.balance = parseFloat(account.balance) + parseFloat(ammount)

            fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(account), (err) => {
                console.error(err)
            })

            console.log(chalk.bgGreen.black(`Foi depositado o valor de R$${ammount} reais.`))

            operation()
        }).catch((err) => {
            console.error(err)
        })
    }).catch((err) => {
        console.error(err)
    })
}

const getAccountBalance = () => {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then(({ accountName }) => {
        if (!checkAccount(accountName)) {
            getAccountBalance()
            return
        }

        const { balance } = getAccount(accountName)
        console.log(chalk.blue(`Olá, o saldo da sua conta é de R$${balance}`))

        operation()
    }).catch((err) => {
        console.error(err)
    })
}

const withdraw = () => {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then(({ accountName }) => {
        if (!checkAccount(accountName)) {
            withdraw()
            return
        }

        inquirer.prompt([
            {
                name: 'ammount',
                message: 'Quanto você deseja sacar?'
            }
        ]).then(({ ammount }) => {
            if (!ammount || ammount < 0) {
                console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'))
                withdraw()
                return
            }

            const account = getAccount(accountName)

            if (parseFloat(account.balance) < parseFloat(ammount)) {
                console.log(chalk.bgRed.black(`Valor indisponível! Saldo em conta: R$${account.balance}`))
                withdraw()
                return
            }

            account.balance = parseFloat(account.balance) - parseFloat(ammount)

            fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(account), (err) => {
                console.error(err)
            })

            console.log(chalk.green(`Foi sacado o valor de R$${ammount} reais.`))

            operation()
        }).catch((err) => {
            console.error(err)
        })
    }).catch((err) => {
        console.error(err)
    })
}

const exit = () => {
    console.log(chalk.bgBlue.black('Obrigado por utilizar o Accounts! Até mais.'))
    process.exit()
}

const actions = {
    'Criar sua conta': createAccount,
    'Consultar saldo': getAccountBalance,
    'Depositar': deposit,
    'Sacar': withdraw,
    'Sair': exit,
}

const checkAccount = (accountName) => {
    if (fs.existsSync(`accounts/${accountName}.json`)) {
        return true
    } else {
        console.log(chalk.bgRed.black(`A conta ${accountName} não existe`))
        return false
    }
}

const getAccount = (accountName) => {
    return JSON.parse(fs.readFileSync(`accounts/${accountName}.json`, { encoding: 'utf8', flag: 'r' }))
}

operation()