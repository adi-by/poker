function PlayersSelect($scope, $rootScope) {
    if (!('players' in $rootScope)) {
        $rootScope.players = [{name: 'Sion', key: 1, playing: false},
            {name: 'Adi', key:2, playing: false},
            {name: 'Lior', key:3, playing: false}];
    }
    $scope.players = $rootScope.players;

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

function AddPlayer($scope, $rootScope, $state) {
    var key = 10;
    if ('curr_key' in $rootScope) {
        key = $rootScope.curr_key;
    }

    $scope.save = function() {
        var player = {name: $scope.name, key: key, playing: false};
        console.log('New player', player);
        key++;
        $rootScope.curr_key = key;
        $rootScope.players.push(player);
        $state.go('start');
    }
}
