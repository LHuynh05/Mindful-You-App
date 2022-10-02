const express = require('express')
const router = express.Router()
const storiesController = require('../controllers/stories')
const { ensureAuth} = require('../middleware/auth')



router.get('/add', ensureAuth, storiesController.getAdd)
router.post('/', ensureAuth, storiesController.post)
router.get('/', ensureAuth, storiesController.getStories)
router.get('/:id', ensureAuth, storiesController.getSingleStories)
router.get('/edit/:id', ensureAuth, storiesController.getEdit)
router.put('/:id', ensureAuth, storiesController.put)
router.delete('/:id', ensureAuth, storiesController.delete)
router.get('/user/:userId', ensureAuth, storiesController.getUserStories)










module.exports = router