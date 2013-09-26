function Prizes($scope, prizes) {
    $scope.prizes = [];
    for (var i = 0; i < prizes.length; i++) {
        $scope.prizes.push(prizes[i].fields);
    }
}
