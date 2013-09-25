function Timer($scope, $timeout, $rootScope, $http, blinds, initial_level, initial_time) {
    $scope.level = initial_level;
    $scope.time_left = initial_time;
    $scope.seconds = function() {
        return Math.floor($scope.time_left / 1000) % 60;
    };
    $scope.minutes = function() {
        return Math.floor($scope.time_left / 1000 / 60);
    };

    $scope.paused = true;
    $scope._timeout = null;
    $scope.set_time = function(level, time) {
        if (level != $scope.level) {
            $scope.level = level;
            $rootScope.$emit('levelUp', $scope.level);
        }
        $scope.time_left = time;
    };

    $rootScope.$on('timeUpdate', function(_, data) {
        $scope.set_time(data.level, data.time);
    });


    $scope._start_timeout = function() {
        var timeout = 1000;
        if (($scope.time_left % 1000) != 0) {
            timeout += Math.min($scope.time_left % 1000, 150); // adjust by at most 150ms.
        }
        $scope._delta = timeout;
        $scope._timeout = $timeout($scope.onTimeout, timeout);
    }

    $scope.flip = function() {
        $http({method: 'GET', url: 'clock/', params: {is_running: $scope.paused}}).
            success(function(data, status, headers, config) {
                $scope.paused = !$scope.paused;
                if ($scope._timeout != null) {
                    $timeout.cancel($scope._timeout);
                    $scope._timeout = null;
                }
                if (!$scope.paused) {
                    $scope.onTimeout = function() {
                        var finished = false;
                        $scope.time_left -= $scope._delta;
                        if ($scope.time_left == 0) {
                            if ($scope.level < blinds.length) {
                                $scope.set_time($scope.level + 1, blinds[$scope.level].fields.time);
                            } else {
                                finished = true;
                            }
                        }
                        if (!finished) {
                            $scope._start_timeout();
                        }
                    }
                    $scope._start_timeout();
                }
            });
    };
    $scope.btn = function() {
        if ($scope.paused) {
            return 'Start';
        } else {
            return 'Pause';
        }
    }
}

