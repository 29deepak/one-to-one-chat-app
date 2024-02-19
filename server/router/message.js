const express = require('express');
const { addMsg, getAllMsg, getMsg } = require('../controllers/message');
const router = express.Router();

router.post('/addmsg', addMsg);
router.post('/getmsg', getAllMsg);


module.exports = router;