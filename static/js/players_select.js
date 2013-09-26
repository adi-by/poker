function PlayersSelect($scope, $rootScope) {
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

function AddPlayer($scope, $rootScope, $state) {
    var key = 10;

    $scope.save = function() {
        console.log('New player ' + $scope.name);
        key++;
        $state.go('start');
    }
}
