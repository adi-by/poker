function PlayersSelect($scope) {
    $scope.players = [{name: 'Sion', key: 1, playing: false},
        {name: 'Adi', key:2, playing: false},
        {name: 'Lior', key:3, playing: false}];

    $scope.flip = function(player) {
        player.playing = !player.playing;
    }

    $scope.row_class = function(player) {
        if (player.playing) {
            return "selected-element";
        } else {
            return "";
        }
    }
}

function AddPlayer($scope, $state) {
    var key = 10;

    $scope.save = function() {
        $scope.players.push({name: $scope.name, key: key});
        key++;
        $state.go('start');
    }
}
