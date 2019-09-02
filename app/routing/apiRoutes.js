const friendData = require('../data/friends.js');


module.exports = (app) => {

    app.get('/api/friends', (req, res) => {
        res.json(friendData);
    });

    app.post('/api/friends',(req, res) => {
        let bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        let userData = req.body;
        let userScores = userData.scores;

        // console.log(userScores);

        for (let i = 0; i < friendData.length; i++) {
            // console.log(friendData[i]);
            let difference = 0;
            for (let j = 0; j < userScores.length; j++) {
                difference += Math.abs(parseInt(friendData[i].scores[j]) - parseInt(userScores[j]));
                // console.log("difference of: " + i +" " + difference);
                // console.log(parseInt(friendData[i].scores[j]))
                // console.log(parseInt(userScores[j]));
            }
            if (difference < bestMatch.friendDifference) {
                bestMatch.name = friendData[i].name;
                bestMatch.photo = friendData[i].photo;
                bestMatch.friendDifference = difference;
            }
        }
        friendData.push(userData);
        res.json(bestMatch);
    })
}