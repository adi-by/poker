function PlayersSelect($scope, $rootScope) {
    if (!('players' in $rootScope)) {
        $rootScope.players = [{name: 'Sion', key: 1, playing: true},
            {name: 'Adi', key:2, playing: true},
            {name: 'Lior', key:3, playing: false}];
    }
    $scope.players = $rootScope.players;

    $scope.typeaheadValue = '';
    $scope.typeahead = [];
    $scope.$watch('typeaheadValue', function(value, old) {
        value = value.toLowerCase();
        var matching = [];
        $scope.players.forEach(function(player) {
            if (!player.playing && player.name.toLowerCase().indexOf(value) != -1) {
                matching.push(player.name);
            }
        });
       $scope.typeahead = matching;
    });
    $scope.add = function () {
        $scope.players.forEach(function(player) {
            if (player.name == $scope.typeaheadValue) {
                player.playing = true;
                $scope.typeaheadValue = '';
            }
        });
    }

    $scope.playing = function() {
        var output = [];
        $scope.players.forEach(function(player) {
            if (player.playing) {
                output.push(player);
            }
        });
        return output;
    }
    $scope.remove = function(player) {
        player.playing = false;
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
