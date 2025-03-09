const express = require('express');
const path = require('path');
const app = express();

// Function to convert Celsius to Fahrenheit
const celsiusToFahrenheit = (celsius) => (celsius * 9/5) + 32;

// Function to convert Fahrenheit to Celsius
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;

// Serve the HTML file (Add Content Security Policy)
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com;");
    next();
});

// Serve a basic form for temperature conversion
app.get('/', (req, res) => {
    res.send(`
        <h1>Temperature Conversion</h1>
        <form action="/convert" method="get">
            <label for="value">Temperature:</label>
            <input type="number" name="value" required />
            <select name="unit" required>
                <option value="c">Celsius to Fahrenheit</option>
                <option value="f">Fahrenheit to Celsius</option>
            </select>
            <button type="submit">Convert</button>
        </form>
    `);
});

// Route to handle temperature conversion
app.get('/convert', (req, res) => {
    const value = parseFloat(req.query.value);
    const unit = req.query.unit?.toLowerCase();

    if (!isNaN(value) && (unit === 'c' || unit === 'f')) {
        if (unit === 'c') {
            res.send(`${value}°C is ${celsiusToFahrenheit(value).toFixed(2)}°F`);
        } else if (unit === 'f') {
            res.send(`${value}°F is ${fahrenheitToCelsius(value).toFixed(2)}°C`);
        }
    } else {
        res.send('Invalid input. Please enter a number and select a unit (C/F).');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
