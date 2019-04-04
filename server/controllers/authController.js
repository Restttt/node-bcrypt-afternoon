const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {

        const db = req.app.get('db');
        const { username, password, isAdmin } = req.body;

        let checkUsername = await db.get_user(username);
        let user = checkUsername[0];

        if (user) {
            res.status(409).send('Username taken');
        } else {

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const result = await db.register_user(isAdmin, username, hash);
            const registeredUser = result[0];

            delete registeredUser.hash;
        
            req.session.user = registeredUser;
            res.status(200).send(registeredUser);
        }
    },
    login: async (req, res) => {

        const db = req.app.get('db');
        const { username, password } = req.body;

        let checkUsername = await db.get_user(username);
        let user = checkUsername[0];

        if (!user) {
            res.status(401).send('User not found. Please register as a new user before logging in');
        } else {
            const isAuthenticated = bcrypt.compareSync(password, user.hash);
            if (!isAuthenticated) {
                res.status(403).send('Incorrect Password'); 
            } else {
                delete user.hash;
                req.session.user = user;
                res.status(200).send(req.session.user);
            };
        };
    },
    logout: async (req, res) => {
        await req.session.destroy();
        return res.sendStatus(200);
    }
};