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
            var i = 0;
            for (let [k, v] of scores) {
                if(i < 10){
                    var tr = document.createElement("tr");
                    var td_name = tr.appendChild(document.createElement('td'));
                    var td_score = tr.appendChild(document.createElement('td'));
                    td_name.innerHTML = k;
                    td_score.innerHTML = v;
                    document.getElementById("ranking").appendChild(tr);
                    i++;
                }
            }

        });


    }

    game_database.new = newRecord;
    game_database.getRecords = getRecords;


})()