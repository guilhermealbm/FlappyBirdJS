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
        var leadsRef = firebase.database().ref('games');
        leadsRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            console.log(childData.score);
            });
        });
    }

    game_database.new = newRecord;
    game_database.getRecords = getRecords;


})()