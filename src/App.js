import React, { useEffect, useState } from 'react';
import './App.css';
import Block from './Block'
import {AiOutlineSwap} from 'react-icons/ai'

function App() {
  const [fromCurrency, setFromCurrency] = useState('');
  const [fromPrice, setFromPrice] = useState(1);

  const [toCurrency, setToCurrency] = useState('');
  const [toPrice, setToPrice] = useState(0);

  const [rates, setRates] = useState({})

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
    .then(res => res.json())
    .then(json => setRates({...json.rates, "RUB": 1}))
  }, [])


  // currency (from)
  function changeFromCurrency(cur) {
    setFromCurrency(cur)
  }

  // price (from)
  function changeFromPrice(value) {
    if(fromCurrency) {
      const result = ((value / rates[fromCurrency]) * rates[toCurrency]).toFixed(1)
      setToPrice(result)
      setFromPrice(value)
    }
  }

  // currency (to)
  function changeToCurrency(cur) {
    setToCurrency(cur)
  }

  // price (to)
  function changeToPrice(value) {
    if (toCurrency) {
      const result = ((value / rates[toCurrency]) * rates[fromCurrency]).toFixed(1)
      setFromPrice(result)
      setToPrice(value)
    }
  }

  useEffect(() => {
    changeFromPrice(fromPrice)
  }, [toCurrency, fromCurrency])

  function swapCurrancies() {
    setToCurrency(fromCurrency)
    setFromCurrency(toCurrency)
  }

  return (
    <React.Fragment>
      <div className="App">
        <Block value={fromPrice} currency={fromCurrency} changeCurrency={changeFromCurrency} changePrice={changeFromPrice}/>
        <AiOutlineSwap className='swap-icon' onClick={swapCurrancies}/>
        <Block value={toPrice} currency={toCurrency} changeCurrency={changeToCurrency} changePrice={changeToPrice}/>
      </div>
      <p style={{textAlign: 'center'}}>{`1 доллар США ~ ${(1 / rates['USD']).toFixed(1)} рублей`}</p>
    </React.Fragment>
  );
}

export default App;
