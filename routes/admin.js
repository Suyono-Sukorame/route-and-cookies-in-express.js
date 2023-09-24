const express = require('express');
const router = express.Router();

// Middleware to parse request body
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    } else {
        res.send('You are not an admin');
    }
});

router.get('/', (req, res) => {
    res.cookie('token', '1234567890abcd')
    res.cookie('user', 'admin')
    res.send('administrator')
})

// Define a route for the root path ('/')
router.get('/', (req, res) => {
    res.send('Administrator');
});

module.exports = router;
