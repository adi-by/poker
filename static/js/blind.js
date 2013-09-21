function Blind($scope, $rootScope, blinds) {
    $scope.update_level = function(level) {
        var level_blinds = blinds[level - 1].fields;
        $scope.small = level_blinds.small;
        $scope.big = level_blinds.big;
    }
    $scope.update_level(1); // TODO: get from server.
    $rootScope.$on('levelUp', function(_, level) {
        $scope.update_level(level);
    });
}

function Ante($scope, $rootScope, $element, blinds) {
    $scope.set_ante = function(ante) {
        $scope.ante = ante;
        if (ante > 0) {
            $element.show();
        } else {
            $element.hide();
        }
    }

    $scope.update_level = function(level) {
        $scope.set_ante(blinds[level - 1].fields.ante);
    }
    $scope.update_level(1); // TODO: get from server.

    $rootScope.$on('levelUp', function(_, level) {
        $scope.update_level(level);
    });
}
