const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    res.send('Theater index');
});

router.get('/create', (req, res) => {
    res.send('Theater create');
});

router.post('/:id', (req, res) => {
    res.send('Theater store');
});

router.get('/:id', (req, res) => {
    res.send(`Theater show ${req.params.id}`);
});

router.put('/:id', (req, res) => {
    res.send(`Theater delete ${req.params.id}`);
});

module.exports = router;
