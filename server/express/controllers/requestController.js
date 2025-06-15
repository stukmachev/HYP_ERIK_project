const { Request } = require('../models');

exports.createRequest = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ status: 'error', error: 'Empty request. Please, fill in data.' });
        }

        const { fullname, email, text } = req.body;

        if (!fullname || !email || !text) {
            return res.status(400).json({ status: 'error', error: 'Fields fullname, email and text are required.' });
        }

        const newRequest = await Request.create({
            fullname,
            email,
            text
        });

        res.status(201).json({ status: 'success', data: newRequest });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ status: 'error', error: 'This email is already in use.' });
        }
        res.status(500).json({ status: 'error', error: error.message });
    }
};
