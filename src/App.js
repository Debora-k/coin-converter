import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollars, setDollars] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [numberOfCoin, setNumberOfCoin] = useState(0);
  const onChange = (e) => {
    setDollars(e.target.value);
  };

  const onConversion = (e) => {
    setSelectedCoin(e.target.value);
  };

  const Calculator = () => {
    let thenum = selectedCoin.replace(/^\D+/g, "");
    setNumberOfCoin(Math.floor(dollars / thenum));
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        setSelectedCoin(json[0]);
      });
  }, []);
  return (
    <div>
      <h1>
        The Coins!{" "}
        {loading ? "" : `Total: ${coins.length} different coins here`}
      </h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <h3>How much are you thinking to invest? (in USD)</h3>
          <input type="number" onChange={onChange} value={dollars}></input>
          <button
            onClick={() => {
              Calculator();
            }}
          >
            Calculate
          </button>
          <br />
          <select id={coins.index} value={selectedCoin} onChange={onConversion}>
            {coins.map((coin) => (
              <option>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
              </option>
            ))}
          </select>
          <br />
          <h3>
            This is the quantity of the coin that you selected and based on your
            assets: {numberOfCoin}
          </h3>
        </div>
      )}
    </div>
  );
}

export default App;
