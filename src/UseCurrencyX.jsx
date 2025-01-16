import { useState, useEffect } from "react";
import CurrencyAPI from '@everapi/currencyapi-js';

const client = new CurrencyAPI("cur_live_1iBA7EGMwijtpGP2R5ZBXCaudgETZTJdcmAgSMCn");

const UseCurrencyX =() =>{
    const [baseCurrency, setBaseCurrency] = useState ('USD');
    const [targetCurrencies, setTargetCurrencies] = useState('EUR, CAD');
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

    try{
  
        const response = await client.latest({
            base_currency: 'USD',
            currencies: 'EUR'
        }).then(response => {
            console.log(response)
        });
    

return (
    <div className='form-container'>
        <h3>Get Started</h3>

        <form onSubmit={handleSubmit}>
            <label htmlFor="base_currency_input">Base currency:</label>
            <input type="text" id="base_currency_input" name="base_currency" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}/>

            <label htmlFor="currencies">Target currencies:</label>
            <input
                type="text"
                id="currencies"
                name="currencies"
                value={targetCurrencies}
                onChange={(e) => setTargetCurrencies(e.target.value)}
            />
            <button type="submit">Get rates</button>
        </form>

        {loading && <p>Loading rates..</p>} 

        <div id="latest_rates_display">
            <h4>Exchange Rates:</h4>

            <ul>
            {Object.entries(rates).map(([currency, data]) => (
              <li key={currency}>
                <strong>{currency} ({data.code}):</strong> {data.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    
  );
};






export default UseCurrencyX;

    




