function Blind($scope, $rootScope) {
    $scope.small = 100
    $scope.big = 200
    $rootScope.$on('levelUp', function(_, level) {
        $scope.small *=  2;
        $scope.big *= 2;
    });
}
