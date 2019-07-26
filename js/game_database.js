const game_database = {};

(function (){

    let game_id = false;

    function newRecord(player, score){
        const game_data = {
            player: player,
            score: score,
            createdat: firebase.database.ServerValue.TIMESTAMP,
        };

        if(!game_id){
            game_id = firebase.database().ref().child('games').push().key;
        }

        if(score=="")
            return { succes: false, message: 'Error. Null score'};

        let updates = {};
        updates['/games/' + game_id] = game_data;

        let game_ref = firebase.database().ref();

        game_ref.update(updates)
            .then(function (){
                return { succes: true, message: 'Score saved'};
            })
            .catch(function (error){
                return { succes: false, message: 'Error: ${error.message}'};
            })

    }

    function getRecords(){
        var scores = [[]];
        var leadsRef = firebase.database().ref('games').orderByChild('score').limitToLast(10);
        leadsRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                scores.push([childData.player, childData.score]);
            });

            scores = scores.slice(-(scores.length-1));
            scores.reverse()
            for (let [k, v] of scores) {
                console.log(k, v);
            }

        });


    }

    game_database.new = newRecord;
    game_database.getRecords = getRecords;


})()