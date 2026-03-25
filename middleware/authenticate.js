
const isAuthenticated = (req, res, next) => {
    console.log("AUTH MIDDLEWARE EXECUTED:", req.method, req.originalUrl);

    if (!req.session.user || !req.session.user) {
        console.log("BLOCKED - USER NOT LOGGED IN");
        return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log("USER IS LOGGED IN:", req.session.user.displayName);
    next();
};

module.exports = isAuthenticated;