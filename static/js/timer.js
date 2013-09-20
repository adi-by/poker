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
    $scope._timeout = null;
    $scope.set_time = function(level, time) {
        if (level != $scope.level) {
            $scope.level = level;
            $rootScope.$emit('levelUp', $scope.level);
        }
        $scope.time = time;
    };
    $scope.flip = function() {
        $scope.paused = !$scope.paused;
        if ($scope._timeout != null) {
            $timeout.cancel($scope._timeout);
            $scope._timeout = null;
        }
        if (!$scope.paused) {
            $scope.onTimeout = function() {
                $scope.time--;
                $scope._timeout = $timeout($scope.onTimeout, 1000);
                if ($scope.time == 0) {
                    $scope.set_time($scope.level + 1, 4);
                }
            }
            $scope._timeout = $timeout($scope.onTimeout, 1000);
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

