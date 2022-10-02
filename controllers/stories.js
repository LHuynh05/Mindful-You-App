const express = require('express')
const Story = require('../models/Story')

module.exports = {
    getAdd: (req,res) => {
        res.render('stories/add')
    },
    post: async (req, res) => {
        try{
            req.body.user = req.user.id
            await Story.create(req.body)
            res.redirect('/dashboard')
        } catch (err){
            console.error(err)
            res.render('error/500')
        }
    },
    getStories: async (req, res) => {
        try{
            const stories = await Story.find({status: 'private'})
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean()
        res.render('stories/index', {
            stories
        })
        } catch (err){
            console.error(err)
            res.render('error/500')
        }
    },
    getSingleStories: async (req, res) => {
        try{
            let story = await Story.findById(req.params.id)
                .populate('user')
                .lean()

            if (!story) {
                return res.render('error/404')
                }
            
            res.render('stories/show', {
                story
            })
        } catch (err) {
            console.error(err)
            res.render('error/404')
        }
    },
    getEdit: async (req, res) => {
        try{
            const story = await Story.findOne({
                _id: req.params.id,
            }).lean()

            if (!story) {
                return res.render('error/404')
            }

            if (story.user != req.user.id) {
                res.redirect('/stories')
            } else {
                res.render('stories/edit', {
                    story,
                })
            }
        } catch (err) {
            console.error(err)
            return res.render('error/500')
        }
    },
    put: async (req, res) => {
        try{
            let story = await Story.findById(req.params.id).lean()

            if(!story){
                return res.render('error/404')
            } else {
                story = await Story.findOneAndUpdate({_id: req.params.id}, req.body,{
                    new: true,
                    runValidators: true,
                })

            res.redirect('/dashboard')
            }
        } catch (err){
            console.error(err)
            return res.render('error/500')
        }
    }, 
    delete: async (req, res) => {
        try{
            await Story.remove({ _id: req.params.id})
            res.redirect('/dashboard')
        } catch (err) {
            console.error(err)
            return res.render('error/500')
        }
    },
    getUserStories: async (req, res) => {
        try{
            const stories = await Story.find({
                user: rq.params.userId,
                status: 'private',
            })
            .populate('user')
            .lean()
        res.render('stories/index', {
            stories,
        })
        } catch (err) {
            console.error(err)
            res.render('error/500')
        }
    }
}

