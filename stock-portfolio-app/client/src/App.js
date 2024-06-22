import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState('');

    const fetchStockData = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/quote', { ticker });
            setStockData(response.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch data');
            setStockData(null);
        }
    };

    return (
        <div className="App">
            <input value={ticker} onChange={(e) => setTicker(e.target.value)} placeholder="Enter ticker symbol" />
            <button onClick={fetchStockData}>Get Stock Quote</button>
            {error && <p>{error}</p>}
            {stockData && (
                <div>
                    <p>Name: {stockData.name}</p>
                    <p>Description: {stockData.description}</p>
                    <p>Price: {stockData.price}</p>
                    {/* Add more fields as necessary */}
                </div>
            )}
        </div>
    );
}

export default App;