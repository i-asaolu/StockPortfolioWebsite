const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // This will allow all domains by default
app.use(express.json());

const PORT = process.env.PORT || 3000;
const ALPHA_VANTAGE_API_KEY = 'MDWZ9JK2CGH7DOC2';

app.post('/api/quote', async (req, res) => {
    const { ticker } = req.body;
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    
    try {
        const response = await axios.get(url);
        const data = response.data;
        if (!Object.keys(data).length) {
            return res.status(404).send('No data found for the given ticker symbol.');
        }
        const api = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key.toLowerCase(), value])
        );
        res.send(api);
    } catch (error) {
        res.status(500).send('An error occurred while fetching data.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});