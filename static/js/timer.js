function Timer($scope, $timeout, $rootScope) {
    $scope.level = 12;
    $scope.time = 4;
    $scope.seconds = function() {
        return $scope.time % 60;
    };
    $scope.minutes = function() {
        return Math.floor($scope.time / 60);
    };

    $scope.paused = true;
    $scope.flip = function() {
        $scope.paused = !$scope.paused;
        if (!$scope.paused) {
            $scope.onTimeout = function() {
                $scope.time--;
                $scope._timeout = $timeout($scope.onTimeout, 1000);
                if ($scope.time == 0) {
                    $scope.time = 4;
                    $scope.level++;
                    $rootScope.$emit('levelUp', $scope.level);
                }
            }
            $scope._timeout = $timeout($scope.onTimeout, 1000);
        } else {
            $timeout.cancel($scope._timeout);
        }
    };
    $scope.btn = function() {
        if ($scope.paused) {
            return 'start';
        } else {
            return 'pause';
        }
    }
}

