import React from 'react';

const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];

const Block = ({currency, changeCur, changePrice, value, placeholder=''}) => (
  <div className="block">
    <ul className="currencies">
      {defaultCurrencies.map(cur => 
        <li
          key={cur}
          className={currency === cur ? 'active' : ''}
          onClick={() => changeCur(cur)}>
          {cur}
        </li>
      )}
    </ul>
    <input placeholder={placeholder} type="number" value={value} onChange={(e) => changePrice(e.target.value)}/>
  </div>
);

export default Block;