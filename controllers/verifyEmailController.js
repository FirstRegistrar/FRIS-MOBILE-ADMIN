// controllers/verifyEmailController.js


const verifyEmail = async (req, res) => {
    const { mail } = req.body;

    return res.status(400).json({ error: 'Email is required' });
      
};

module.exports = verifyEmail;
