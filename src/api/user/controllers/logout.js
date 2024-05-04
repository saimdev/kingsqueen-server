

const logout = (req, res)=> {
    res.clearCookie('_auth');
    res.status(200).json({ message: 'Logout success' });
}

module.exports = logout;