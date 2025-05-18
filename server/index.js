import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import axios from 'axios';

const app = express();
const PORT = 3001;

console.log(process.env.OPEN_WEATHER_API_KEY)

app.use(cors());
app.use(express.json());

app.get('/api/weather', async (req, res) => {
    try {
        const { lat, lon, units } = req.query;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                lat,
                lon,
                units,
                appid: process.env.OPEN_WEATHER_API_KEY,
            },
        });
        res.json(response.data);
    } catch (err) {
        console.log("e", err)
        res.status(500).json({ error: `FAILED ${process.env.OPEN_WEATHER_API_KEY}` });
    }
});

app.get('/api/forecast', async (req, res) => {
    try {
        const { lat, lon, units } = req.query;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
                lat,
                lon,
                units,
                appid: process.env.OPEN_WEATHER_API_KEY,
            },
        });
        res.json(response.data);
    } catch (err) {
        console.log("e", err)
        res.status(500).json({ error: `FAILED ${process.env.OPEN_WEATHER_API_KEY}` });
    }
});

app.get('/api/search', async (req, res) => {
    try {
        const { searchTerm, units } = req.query;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/find`, {
            params: {
                q: searchTerm,
                units,
                appid: process.env.OPEN_WEATHER_API_KEY,
            },
        });
        res.json(response.data);
    } catch (err) {
        console.log("e", err)
        res.status(500).json({ error: `FAILED ${process.env.OPEN_WEATHER_API_KEY}` });
    }
});

app.listen(PORT, () => {
    console.log(`API proxy server running on http://localhost:${PORT}`);
});