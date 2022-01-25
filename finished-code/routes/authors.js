const express = require('express');
const Author = require('../models/author.js');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const authors = await Author.find({});
        res.json({
            authors
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'there was an internal server error'
        });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (author != null) {
            res.json({
                author
            });
        } else {
            res.status(404).json({
                error: 'there is no author with that id'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'there was an internal server error'
        });
    }
});


router.post('/',
    body('firstname', 'firstname must be at least 3 characters').isLength({ min: 3}),
    body('lastname', 'lastname must be at least 3 characters').isLength({ min: 3 }),
    body('bio', 'bio must not be empty').notEmpty(),
    async (req, res) => {

    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            console.log(errors);
            res.status(400).json({
                errors: errors.array()
            });
        } else {
            const author = new Author(req.body);
            await author.save();

            res.status(201).json({
                message: 'author created',
                author
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'there was an internal server error'
        });
    }
});



router.delete('/:id', async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);

        if (author == null) {
            return res.send('no author found');
        }

        return res.json({
            author,
            msg: 'author deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'there was an internal server error'
        });
    }
})

module.exports = router;