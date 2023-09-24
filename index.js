const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cookieSignature = require('cookie-signature');
const crypto = require('crypto');

const port = 5000;
const secretKey = 'mySecretKey123'; // Ganti dengan kunci rahasia yang sesuai

app.use(cookieParser(secretKey)); // Menggunakan cookie-parser

// Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Generate HMAC
const generateHMAC = (message) => {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(message);
  return hmac.digest('hex');
};

// Define routes
app.get('/signingcookie', (req, res) => {
  const message = 'hello';
  const hmac = generateHMAC(message);

  // Sign the message using cookie-signature
  const signedMessage = message + '.' + hmac;

  res.cookie('paket', signedMessage);
  res.send('Signed cookie');
});

// Verify signed cookie
app.get('/verifycookie', (req, res) => {
  const signedCookie = req.cookies.paket;

  // Split the message and HMAC
  const [message, receivedHMAC] = signedCookie.split('.');

  // Verify the HMAC
  const expectedHMAC = generateHMAC(message);
  const isHMACValid = crypto.timingSafeEqual(Buffer.from(receivedHMAC), Buffer.from(expectedHMAC));

  if (isHMACValid) {
    res.send(`Cookie verified. Message: ${message}`);
  } else {
    res.send('Cookie verification failed.');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
