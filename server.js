#!/usr/bin/env node

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3122;

app.use(cors());

app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).send('URL is required');
    }

    try {
        const response = await axios.get(targetUrl);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching the URL');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
