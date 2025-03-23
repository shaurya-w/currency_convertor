async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;
    const resultText = document.getElementById("converted-value");

    if (amount === "" || amount <= 0) {
        resultText.innerHTML = "Please enter a valid amount!";
        return;
    }

    const apiKey = "21d6c899964d1b575f61f20f"; 
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.result === "success") {
            const rate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);

            resultText.innerHTML = `Converted Amount: ${convertedAmount} ${toCurrency}`;
        } else {
            resultText.innerHTML = "Error fetching exchange rate!";
        }
    } catch (error) {
        resultText.innerHTML = "Network error. Please try again!";
    }
}

function swapCurrencies() {
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");

    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    convertCurrency();
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        convertCurrency();
    }
}

document.getElementById("convert-btn").addEventListener("click", convertCurrency);
document.getElementById("swap-btn").addEventListener("click", swapCurrencies);
document.getElementById("amount").addEventListener("keypress", handleKeyPress);
