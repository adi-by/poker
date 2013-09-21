function Players($scope, $element, players) {
    $scope.players = players;
    $scope.remove = function(player) {
        $scope.players.splice($scope.players.indexOf(player), 1);
        if ($scope.players.length == 0) {
            $element.hide();
        }
    }
}

function CountPlayers($scope, players) {
    $scope.count = function() {
        return players.length;
    }
}