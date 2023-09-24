const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    const { user } = req.cookies
    console.log(user)
    res.send('Movies index');
});

router.get('/create', (req, res) => {
    res.send('Muvies Create');
});

router.post('/:id', (req, res) => {
    res.send(`Movies store ${req.params.id}`);
});

router.get('/:id', (req, res) => {
    res.send(`Movie show ${req.params.id}`);
});

router.put('/:id', (req, res) => {
    res.send(`Movie delete ${req.params.id}`);
});

module.exports = router;
