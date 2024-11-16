const express = require('express');
const axios = require('axios');
const router = express.Router(); // Initialize router

let accessToken = "1000.baa808db5e80c21921d1365034625c9e.a6f5016c64caa92c75c8df73692be35a";
const refreshToken = "1000.6976466ea5d051ad9fbe2b82d9258a93.4a6935910510415e6fe4fb941787aa00";
const clientId = '1000.BPQALHVHS011VJM04Y3SZW13TFSCRX';
const clientSecret = '1660b0a83108b4ee951ea6dc6717d9f054ba25e4c2';

let tokenExpiry = Date.now() + (3600 * 1000); // Assuming token expires in 1 hour (3600 seconds)

// Function to check if token is expired
const isTokenExpired = () => {
    return Date.now() >= tokenExpiry;
};

// Function to refresh the access token
const refreshAccessToken = async() => {
    try {
        const response = await axios.post('https://accounts.zoho.in/oauth/v2/token', null, {
            params: {
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'refresh_token',
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Update access token and expiry time
        accessToken = response.data.access_token;
        tokenExpiry = Date.now() + (response.data.expires_in * 1000); // Token expires_in is in seconds
        console.log('New Access Token:', accessToken);
    } catch (error) {
        console.error('Error refreshing access token:', error.message);
        throw new Error('Failed to refresh access token');
    }
};

// Function to fetch data with pagination
const fetchPaginatedData = async() => {
    let allData = [];
    let from = 0;
    const limit = 200; // Adjust this based on Zoho's API limits
    let hasMoreData = true;

    while (hasMoreData) {
        try {
            // Check if token is expired and refresh if needed
            if (isTokenExpired()) {
                console.log('Access token expired. Refreshing token...');
                await refreshAccessToken();
            }

            // Fetch data for the current page
            const response = await axios.get(
                `https://creator.zoho.in/api/v2/alpsinsurance/policy-analysis/report/BimaScore?from=${from}&limit=${limit}`, {
                    headers: {
                        'Authorization': `Zoho-oauthtoken ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Append the data to the allData array
            const data = response.data.data || [];
            allData = allData.concat(data);

            // console.log(`Fetched ${data.length} records from ${from}. Total records: ${allData.length}`);

            // Check if there are more records to fetch
            if (data.length < limit) {
                hasMoreData = false; // No more data to fetch
            } else {
                from += limit; // Move to the next page
            }
        } catch (error) {
            console.error(`Error fetching data on page starting from ${from}:`, error.message);
            throw new Error('Failed to fetch paginated data');
        }
    }

    return allData;
};

// Middleware to handle the Zoho API request
router.get('/bima-score', async(req, res) => {
    try {
        console.log('Fetching all paginated data...');
        const allData = await fetchPaginatedData(); // Fetch all data
        console.log(`Total records fetched: ${allData.length}`);
        res.json(allData); // Send the full dataset to the client
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = router;