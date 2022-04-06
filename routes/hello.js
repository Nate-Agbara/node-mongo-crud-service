const express = require('express'),
router = express.Router(),
hello = require('../controllers/hello')

router.get('/message', hello.hello)
router.post('/postmessage', hello.postMessage)

module.exports = router