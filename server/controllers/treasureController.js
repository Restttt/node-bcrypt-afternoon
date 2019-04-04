module.exports = {
    dragonTreasure: async (req, res) => {
        const db = req.app.get('db');
        const treasure = await db.get_dragon_treasure(1);
        res.status(200).send(treasure);
    },
    getUserTreasure: async (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;
        const userTreasure = await db.get_user_treasure(id);
        res.status(200).send(userTreasure);
    },
    addMyTreasure: async (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;
        const { img } = req.body

        const addedImage = await db.add_user_treasure(img, id);

        res.status(200).send(addedImage);
    },
    getAllTreasure: async (req, res) => {
        const db = req.app.get('db');
        
        const allTreasure = await db.get_all_treasure();
        res.status(200).send(allTreasure);
    }
}