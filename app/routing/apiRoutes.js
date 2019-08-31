var friendData = require('../data/friends.js');


module.exports = (app) => {

    app.get('/api/friends', (req, res) => {
        res.json(friendData);
    });

    app.post('/api/friends',(req, res) => {
        friendData.push(req.body);
    })
}