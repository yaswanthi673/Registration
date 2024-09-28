const express = require('express');
const User = require('../models/User');
const Address = require('../models/Address');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, address } = req.body;

    try {
        const user = await User.create({ name });
        await Address.create({ userId: user.id, address });
        res.status(201).json({ message: 'User and address registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user and address' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Address,
                required: false, // Include users even if they have no addresses
            }],
        });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

router.get('/user', async (req, res) => {
    const { name } = req.body;
    try {
        const users = await User.findAll({
            where: { name: name },
            include: [{
                model: Address,
                required: false, // Include users even if they have no addresses
            }],
        });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

module.exports = router;
