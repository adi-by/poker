function Player(name, key) {
    this.name = name;
    this.key = key;
}

function Players($scope, $element, $http, game_key, players) {
    $scope.players = players;
    $scope.remove = function(player) {
        $http({method: 'GET', url: 'remove/' + player.key}).
            success(function(data, status, headers, config) {
            $scope.players.splice($scope.players.indexOf(player), 1);
            if ($scope.players.length == 0) {
                $element.hide();
            }
        });
    }
}

function CountPlayers($scope, players) {
    $scope.count = function() {
        return players.length;
    }
}