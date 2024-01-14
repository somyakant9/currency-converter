// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useState, useEffect } from "react";
export default function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [exchangeRates, setExchangeRates] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function CurrencyConverter() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        // if (!res.ok) return;
        const data = await res.json();

        setExchangeRates(data.rates[toCurrency]);
        setIsLoading(false);

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    if (toCurrency === fromCurrency) return setExchangeRates(amount);
    CurrencyConverter();
  }, [amount, fromCurrency, toCurrency]);

  console.log(exchangeRates);
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {amount ? exchangeRates : "Enter Amount to get converted in "}{" "}
        {toCurrency}
      </p>
    </div>
  );
}
