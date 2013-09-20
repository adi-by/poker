function Blind($scope, $rootScope) {
    $scope.small = 100
    $scope.big = 200
    $rootScope.$on('levelUp', function(_, level) {
        $scope.small *=  2;
        $scope.big *= 2;
    });
}

function Ante($scope, $rootScope, $element) {
    $scope.set_ante = function(ante) {
        $scope.ante = ante;
        if (ante > 0) {
            $element.show();
        } else {
            $element.hide();
        }
    }
    $scope.set_ante(1);

    $rootScope.$on('levelUp', function(_, level) {
        $scope.set_ante(0);
    });
}
