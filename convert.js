const axios = require('axios');
const { Builder } = require('xml2js');

const apiUrl = 'http://localhost:3000/geni/buku'; // url api saya

async function fetchData() {
    try {
        // Ambil data dari API
        const response = await axios.get(apiUrl);
        const jsonData = response.data;

        // Konversi JSON ke XML
        const builder = new Builder();
        const xmlData = builder.buildObject(jsonData);

        // Tampilkan hasil XML
        console.log(xmlData);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Panggil fungsi fetchData
fetchData();
