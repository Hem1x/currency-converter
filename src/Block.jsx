import React from 'react';

const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];

const Block = ({currency, changeCurrency, value, changePrice}) => (
  <div className="block">
    <ul className="currencies">
      {defaultCurrencies.map((cur) => (
        <li 
        key={cur}
        onClick={() => changeCurrency(cur)}
        className={currency === cur ? 'active' : ''}>
            {cur}
        </li>
      ))}

    </ul>
    <input type="number" placeholder={0} value={value} onChange={(e) => changePrice(e.target.value)}/>
  </div>
);

export default Block;