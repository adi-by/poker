function PlayersSelect($scope) {
    $scope.players = [{name: 'Sion', key: 1},
        {name: 'Adi', key:2},
        {name: 'Lior', key:3}];
}

function AddPlayer($scope, $state) {
    $scope.save = function() {
        console.log('Added player ' + $scope.name);
        $state.go('start');
    }
}
