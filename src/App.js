import React, { useEffect, useState } from 'react';
import './App.css';
import Block from './Block'
import {AiOutlineSwap} from 'react-icons/ai'


function App() {
  const [fromCur, setFromCur] = useState('USD')
  const [toCur, setToCur] = useState('RUB')

  const [fromPrice, setFromPrice] = useState()
  const [toPrice, setToPrice] = useState()

  const [rates, setRates] = useState({})

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then(res => res.json())
      .then(json => setRates({...json.rates, "RUB": 1}))
  }, [])

  function changeFromCur(cur) {
    setFromCur(cur)
  }

  function changeToCur(cur) {
    setToCur(cur)
  }

  function changeFromPrice(value) {
    if(fromCur) {
      const result = (value / rates[fromCur]) * rates[toCur]
      setToPrice(result.toFixed(2))
      setFromPrice(value)
    }
  }

  function changeToPrice(value) {
    if(toCur) {
      const result = (value / rates[toCur]) * rates[fromCur]
      setFromPrice(result.toFixed(2))
      setToPrice(value)
    }
  }

  useEffect(() => {
    changeFromPrice(fromPrice)
  }, [toCur, fromCur])

  function swapCur() {
    setFromCur(toCur)
    setToCur(fromCur)
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Currency Converter</h1>

      <div className='App'>
        <Block placeholder='Enter the sum' value={fromPrice} currency={fromCur} changeCur={changeFromCur} changePrice={changeFromPrice}/>
        <AiOutlineSwap className='swap-icon' onClick={swapCur}/>
        <Block value={toPrice} currency={toCur} changeCur={changeToCur} changePrice={changeToPrice}/>
      </div>

      <div>
          <h3 style={{margin: 0}}>Additional information:</h3>
          <p>{`1 dollar USA = ${(1/rates['USD']).toFixed(1)} rubles`}</p>
      </div>
    </div>

  );
}

export default App;
