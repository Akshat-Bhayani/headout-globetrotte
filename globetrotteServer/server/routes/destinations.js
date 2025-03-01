const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// Get random destination - Must come before /:id route
router.get('/random', async (req, res) => {
    try {
        const count = await Destination.countDocuments();
        const random = Math.floor(Math.random() * count);
        const destination = await Destination.findOne().skip(random);
        if (!destination) {
            return res.status(404).json({ message: 'No destinations found' });
        }
        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Verify answer
router.post('/verify/:id', async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id).lean();
        console.log('destination',destination);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        const userAnswer = req.body.answer?.toLowerCase().trim() || '';
        const correctAnswer = destination.destination?.toLowerCase().trim() || '';

        const isCorrect = userAnswer === correctAnswer;

        if(isCorrect){
            
        }
        else{

        }

        res.status(200).json({
            isCorrect,
            destination: destination.destination,
            funFacts: destination.funFacts || [],
            trivia: destination.trivia || ''
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all destinations
router.get('/', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single destination by ID
router.get('/:id', async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new destination
router.post('/', async (req, res) => {
    const { destination, clues, funFacts, trivia } = req.body;

    const newDestination = new Destination({
        destination,
        clues,
        funFacts,
        trivia
    });

    try {
        const savedDestination = await newDestination.save();
        res.status(201).json(savedDestination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing destination
router.patch('/:id', async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        // Only update if fields are provided in request body
        if (req.body.destination) destination.destination = req.body.destination;
        if (req.body.clues) destination.clues = req.body.clues;
        if (req.body.funFacts) destination.funFacts = req.body.funFacts;
        if (req.body.trivia) destination.trivia = req.body.trivia;

        const updatedDestination = await destination.save();
        res.status(200).json(updatedDestination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a destination
router.delete('/:id', async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        await destination.deleteOne();
        res.status(200).json({ message: 'Destination deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
