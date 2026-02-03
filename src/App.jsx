import { useState, useEffect} from 'react'
import './App.css'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'




function App() {
  const [currencyData, setCurrencyData] = useState(null);
  const [error, setError] =useState(null);

  const [fromCurrency, setFromCurrency] = useState('?');  // Default: BTC
  const [toCurrency, setToCurrency] = useState('?');      // Default: ETH
  const [amount, setAmount] = useState(1);                  // Default: 1
  const [conversionResult, setConversionResult] = useState(null);

  
  const handleFromCurrencyChange = (e) => setFromCurrency(e.target.value);
  const handleToCurrencyChange = (e) => setToCurrency(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

      setError("");
      setConversionResult(null);
    
      try{
        const response = await fetch( `/api/coinlayer?from=${fromCurrency.toUpperCase()}&to=${toCurrency.toUpperCase()}&amount=${amount}`);
        const data = await response.json();
          
        
       

        console.log("API Response:", data);

        if (data.success) {
          const fromRate = data.rates[fromCurrency.toUpperCase];
          const toRate = data.rates[toCurrency.toUpperCase];
    

        if (fromRate && toRate) {
          const result = (amount * fromRate) / toRate;
          setConversionResult(result);
        }else {
          setError("Sorry! Currency rates not available.");
        }
      }else {
        setError(data.error || "Failed to fetch data");
      }
  } catch (err) {
    setError("Error fetching data: " + err.message);
  }
};

  
  return (

    
    
    
        
          <Parallax pages ={4}>
              <ParallaxLayer speed={1} factor={1.5}>
              
           
          <div className='Title'>
          <h1>CurrencyX</h1>
          <p>Cryptocurrency Conversion</p>
          <p>Over 386 cryptocurrencies accepted!</p>
          
        </div>
        
                
                

                  <video 
                  src ="/digital-earth.mp4"
                  autoPlay
                  loop
                  muted
                  style={{
                    position:'absolute',
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -1
                  }}
                  />


              </ParallaxLayer>

              <ParallaxLayer 
              offset={1} 
              speed={0.3}>
              <h2>Stay connected</h2>
              <video 
              src ="/chicago.mp4"
              autoPlay
              loop
              muted
              style={{
                position:'absolute',
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -1

              }}
              />
              </ParallaxLayer>

              <ParallaxLayer 
              offset={2} 
              speed={0.3}>
              <h2>No matter where the journey takes you!</h2>

              <video 
              src ="/lake.mp4"
              autoPlay
              loop
              muted
              style={{
                position:'absolute',
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -1

              }}
            />

        <div className='api-container'>
          <h3>Get Started</h3>

          <form onSubmit={handleSubmit}>
            <div>
              <label>
                From Currency:
                <input
                type='text'
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
                placeholder='BTC'
                />
              </label>
            </div>

            <div>
              <label>
                To Currency:
                <input
                type='text'
                value={toCurrency}
                onChange={handleToCurrencyChange}
                placeholder='SOL'
                />
              </label>
            </div>

            <div>
              <label>
              Amount:
              <input
              type='number'
              value={amount}
              onChange={handleAmountChange}
              min="0.01"
              step="0.01"
              />
              </label>
            </div>

            <button type='submit'>Submit</button>
          </form>

          <div>
            <h4>Conversion Rate:</h4>
            <p>
              {amount} {fromCurrency} is equal to {conversionResult} {toCurrency}
            </p>
          </div>
        </div>

        <div className='info'>

         <ul>
         <li>ETH</li>
         <li>XRP</li>
         <li>XLM</li>
         <li>LTC</li>
         <li>SBC</li>
         <li>DOGE</li>
         <li>ADA</li>
         <li>LINK</li>
         <li>BTC</li>
         <li>MANA</li>
         </ul>


        </div>

      </ParallaxLayer>
    </Parallax>
       
  
     

  );
}

export default App;
