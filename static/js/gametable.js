function Game(key, start_time, starting_player_num, curr_player_num) {
    this.key = key;
    this.start_time = start_time;
    this.starting_player_num = starting_player_num;
    this.curr_player_num = curr_player_num;
}

function GameTable($scope, $window, games) {
    $scope.games = games;
    $scope.go = function(key) {
        $window.location.href = '/game/' + key;
    }
}

function GamePreview($element) {

}


