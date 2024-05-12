const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors()); // Enable CORS for all routes
 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'))
  
  })


// POST route to handle the vehicle info request
app.post('/getVehicleInfo', async (req, res) => {
    try {
        const vehicleNumber = req.body.vehicle_no;
        const consent = req.body.consent;
        const consentText = req.body.consent_text;

        // Your Axios request logic here
        const options = {
            method: 'POST',
            url: 'https://rto-vehicle-information-india.p.rapidapi.com/getVehicleInfo',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '742c463415msh55159cb981c077ep151d70jsnccb39958e318',
                'X-RapidAPI-Host': 'rto-vehicle-information-india.p.rapidapi.com'
            },
            data: {
                vehicle_no: vehicleNumber,
                consent: consent,
                consent_text: consentText
            }
        };

        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
