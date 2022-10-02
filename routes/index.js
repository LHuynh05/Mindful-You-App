const express = require('express')
const router = express.Router()
const indexController = require('../controllers/index')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//Index route - login page - landing page
router.get('/', ensureGuest, indexController.getIndex);
router.get('/dashboard', ensureAuth, indexController.getDashBoard)



module.exports = router