const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({msg: "Yo! profile.js Works!"}));

module.exports = router;