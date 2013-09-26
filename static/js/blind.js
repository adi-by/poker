function Level($scope, $rootScope, initial_level) {
    $scope.level = initial_level;
    $rootScope.$on('levelUp', function(_, level) {
        $scope.level = level;
    });
}

function BlindValue($scope, $rootScope, $element, blinds, initial_level) {
    $scope.init = function(name, is_next) {
        $scope.name = name;
        $scope.is_next = is_next;
        $scope.update_level(initial_level);
    }

    $scope.update_level = function(level) {
        if (!$scope.is_next) {
            $scope.value = blinds[level - 1].fields[$scope.name];
        } else {
            if (level < blinds.length) {
                $scope.value = blinds[level].fields[$scope.name];
                $element.show();
            } else {
                $scope.value = null;
                $element.hide();
            }
        }
    }

    $rootScope.$on('timeUpdate', function(_, data) {
        $scope.update_level(data.level);
    });

    $rootScope.$on('levelUp', function(_, level) {
        $scope.update_level(level);
    });
}

function AnteValue($scope, $rootScope, $element, blinds, initial_level) {
    BlindValue($scope, $rootScope, $element, blinds, initial_level);
    $scope._super_update_level = $scope.update_level;
    $scope.update_level = function (level) {
        $scope._super_update_level(level);
        if ($scope.value == null || $scope.value == 0) {
            $element.hide();
        } else {
            $element.show();
        }
    }
}
