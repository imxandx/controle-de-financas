// Selecionando os elementos do DOM
const balanceElement = document.getElementById('balance');
const moneyPlusElement = document.getElementById('money-plus');
const moneyMinusElement = document.getElementById('money-minus');
const transactionsList = document.getElementById('transactions');
const form = document.getElementById('form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const removeAllButton = document.createElement('button'); // Botão para remover todas as transações

// Array para armazenar as transações
let transactions = [];

// Função para calcular o saldo, receitas e despesas
function updateBalance() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts.filter(amount => amount > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
    const expense = (amounts.filter(amount => amount < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);

    balanceElement.textContent = `R$ ${total}`;
    moneyPlusElement.textContent = `+ R$ ${income}`;
    moneyMinusElement.textContent = `- R$ ${expense}`;
}

// Função para criar o botão de exclusão na transação
function createDeleteButton(index) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'x';
    deleteButton.addEventListener('click', () => removeTransaction(index));
    return deleteButton;
}

// Função para exibir as transações na lista
function displayTransactions() {
    transactionsList.innerHTML = '';

    if (transactions.length === 0) {
        const noTransactionsMessage = document.createElement('li');
        noTransactionsMessage.textContent = 'Nenhuma transação encontrada.';
        transactionsList.appendChild(noTransactionsMessage);

        // Se não houver transações, oculta o botão "Remover Todas"
        removeAllButton.classList.add('hidden');
    } else {
        transactions.forEach((transaction, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
            listItem.innerHTML = `
            ${transaction.text} <span>${transaction.amount < 0 ? '-' : '+'} R$${Math.abs(transaction.amount).toFixed(2)}</span>
            `;
            listItem.appendChild(createDeleteButton(index)); // Adiciona o botão de exclusão à transação
            transactionsList.appendChild(listItem);
        });

        // Se houver transações, exibe o botão "Remover Todas"
        removeAllButton.classList.remove('hidden');
    }
}

// Função para adicionar uma transação
function addTransaction(event) {
    event.preventDefault();

    const text = textInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (text === '' || isNaN(amount)) {
        alert('Por favor, insira um nome e um valor válido.');
        return;
    }

    const transaction = {
        text,
        amount,
    };

    transactions.push(transaction);
    displayTransactions();
    updateBalance();

    textInput.value = '';
    amountInput.value = '';
}

// Função para remover uma transação individualmente
function removeTransaction(index) {
    transactions.splice(index, 1);
    displayTransactions();
    updateBalance();
}

// Função para remover todas as transações
function removeAllTransactions() {
    transactions = [];
    displayTransactions();
    updateBalance();
}

// Event listener para o formulário de adicionar transação
form.addEventListener('submit', addTransaction);

// Adiciona o botão "Remover Todas" abaixo do título "Transações"
removeAllButton.classList.add('btn');
removeAllButton.textContent = 'Remover Todas';
removeAllButton.addEventListener('click', removeAllTransactions);
document.querySelector('h3').appendChild(removeAllButton);

// Inicialização das funcionalidades
displayTransactions();
updateBalance();


