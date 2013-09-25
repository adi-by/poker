function Timer($scope, $timeout, $rootScope, $http, blinds,
               initial_level, initial_time, initial_is_running) {
    $scope.level = initial_level;
    $scope.time_left = initial_time;
    $scope.seconds = function() {
        return Math.ceil($scope.time_left / 1000) % 60;
    };
    $scope.minutes = function() {
        return Math.floor(Math.ceil($scope.time_left / 1000) / 60);
    };
    $scope.has_ended = function() {
        return $scope.level == blinds.length && $scope.time_left == 0;
    }

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
        $scope.update_paused(!data.is_running);
    });


    $scope._start_timeout = function() {
        var timeout = $scope.time_left % 1000;
        if (timeout == 0) {
            timeout = 1000;
        }
        console.log('waiting for ' + timeout);
        $scope._last_time = new Date().getTime();
        $scope._timeout = $timeout($scope.onTimeout, timeout);
    }

    $scope.update_paused = function(is_paused) {
        $scope.paused = is_paused;
        if ($scope._timeout != null) {
            $timeout.cancel($scope._timeout);
            $scope._timeout = null;
        }
        if (!$scope.paused && !$scope.has_ended()) {
            $scope.onTimeout = function() {
                var finished = false;
                $scope.time_left -=  new Date().getTime() - $scope._last_time;
                $scope.time_left = Math.max(0, $scope.time_left);
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
    }

    $scope.update_paused(!initial_is_running);

    $scope.flip = function() {
        if ($scope.has_ended()) {
            return;
        }

        $http({method: 'GET', url: 'clock/', params: {is_running: $scope.paused}}).
            success(function(data, status, headers, config) {
            });
    };
    $scope.btn = function() {
        if ($scope.has_ended()) {
            return 'Game Ended';
        }
        if ($scope.paused) {
            return 'Start';
        } else {
            return 'Pause';
        }
    }
}

