function Level(num, small, big, ante, time) {
    this.num = num;
    this.small = small;
    this.big = big;
    this.ante = ante;
    this.time = time;
}

function BlindsEdit($scope) {
    $scope.levels = [new Level(1, 1, 2, 0, 15),
        new Level(2, 2, 4, 0, 15),
        new Level(3, 4, 8, 1, 20)];
    $scope.edit = function() {
        $scope.editable = true;
    }
    $scope.save = function() {
        $scope.editable = false;
    }
    $scope.create = function() {
        console.log("create schema " + $scope.schema);
        $scope.editable = false;
    }
    $scope.cancel = function() {
        $scope.editable = false;
    }
    $scope.editable = false;
}
