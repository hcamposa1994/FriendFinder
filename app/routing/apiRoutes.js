var friendData = require('../data/friends.js');


module.exports = (app) => {

    app.get('/api/friends', (req, res) => {
        res.json(friendData);
    });

    app.post('/api/friends',(req, res) => {
        let bestMatch ={
            name: "",
            photo: "",
            friendDifference: 1000
        };
        console.log(req.body);

        let userData = req.body;
        let userScores = userData.scores;

        console.log(userScores);

        let totalDifference = 0;

        for (let i = 0; i < friendData.length; i++) {
            console.log(friendData[i]);
            totalDifference = 0;
            for (let j = 0; j < friendData[i].scores[j]; j++) {
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendData[i].scores[j]));
                if (totalDifference <= bestMatch.friendDifference) {
                    bestMatch.name = friendData[i].name;
                    bestMatch.photo = friendData[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        friendData.push(userData);
        res.json(bestMatch);
    })
}