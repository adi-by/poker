function BlindValue($scope, $rootScope, $element, blinds) {
    $scope.init = function(name, is_next) {
        $scope.name = name;
        $scope.is_next = is_next;
        $scope.update_level(1); // TODO: get from server.
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

    $rootScope.$on('levelUp', function(_, level) {
        $scope.update_level(level);
    });
}

function AnteValue($scope, $rootScope, $element, blinds) {
    BlindValue($scope, $rootScope, $element, blinds);
    $scope._super_update_level = $scope.update_level;
    $scope.update_level = function (level) {
        $scope._super_update_level(level);
        if ($scope.value == 0) {
            $element.parent().hide();
        } else {
            $element.parent().show();
        }
    }
}
