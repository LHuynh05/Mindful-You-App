const Story = require('../models/Story')
module.exports = {
    getIndex: (req, res) => {
        res.render('login',{layout: 'login'});
    },
    getDashBoard: async (req, res) => {
        try {
            const stories = await Story.find({user: req.user.id}).lean()
            console.log(req.user.id)
            console.log(stories)
            res.render('dashboard', {
                name: req.user.firstName,
                stories,
            })
        } catch (err) {
            console.log(err)
            res.render('error/500')
        }
    },
};