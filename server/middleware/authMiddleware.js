module.exports = {
    usersOnly: (req, res, next) => {
        if (!req.session.user) {
            res.status(401).send('Please log in');
        } else {
            next();
        }
    },
    adminsOnly: (req, res, next) => {
        if (!req.session.user.is_admin) {
            res.status(403).send('You are not an admin');
        } else {
            next();
        }
    }
};