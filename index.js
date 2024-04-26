// index.js

const { TonClient } = require('@tonclient/core')
const { libNode } = require('@tonclient/lib-node')

// Инициализация TonClient
TonClient.useBinaryLibrary(libNode)

// Функция для подключения к блокчейну TON
async function connectToTON() {
  const client = new TonClient({
    network: {
      // Здесь укажите адрес узла блокчейна TON
      endpoints: ['https://main.ton.dev'],
    },
  })

  return client
}

// Функция для отслеживания транзакций кошелька
async function trackWalletTransactions(walletAddress) {
  const client = await connectToTON()

  try {
    // Запрос на получение истории транзакций для указанного кошелька
    const transactions = await client.queries.transactions.query_collection({
      account_id: { eq: walletAddress },
    })

    console.log('Transactions for wallet', walletAddress)
    console.log(transactions)
  } catch (error) {
    console.error('Error fetching transactions:', error)
  } finally {
    // Закрытие соединения с блокчейном TON
    client.close()
  }
}

// Вызов функции для отслеживания транзакций кошелька
const walletAddress =
  '0:1234567890123456789012345678901234567890123456789012345678901234' // Здесь укажите адрес кошелька
trackWalletTransactions(walletAddress)
