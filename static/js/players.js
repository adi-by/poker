function Player(name, key) {
    this.name = name;
    this.key = key;
}

function Players($scope, $element, $http, game_key, players) {
    $scope.players = players;
    $scope.update = function () {
        if ($scope.players.length == 0) {
            $element.hide();
        }
    }
    $scope.update();

    $scope.remove = function(player) {
        $http({method: 'GET', url: 'remove/' + player.key}).
            success(function(data, status, headers, config) {
            $scope.players.splice($scope.players.indexOf(player), 1);
            $scope.update();
        });
    }
}

function CountPlayers($scope, players) {
    $scope.count = function() {
        return players.length;
    }
}

function Stack($scope, players, total_chips) {
    $scope.average = function() {
         if (players.length == 0) {
             return 0;
         }
        return Math.round(total_chips / players.length);
    }
}