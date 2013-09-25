angular.module('Poker', [])
    .filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            num_str = '' + num;
            return Array(len - num_str.length + 1).join('0') + num_str;
        };
    }).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    }).
    value('game_key', game_key).
    value('blinds', blinds).
    value('players', players).
    value('initial_level', initial_state[0]).
    value('initial_time', initial_state[1]).
    value('initial_is_running', initial_is_running);


function Audio($rootScope, $element) {
    $rootScope.$on('levelUp', function() {
       $element[0].play();
    });
};

function Server($scope, $rootScope, $http, $timeout) {
    $scope.get_time = function() {
        $http({method: 'GET', url: 'get_time'}).
            success(function(data, status, headers, config) {
                $rootScope.$emit('timeUpdate', data);
                $timeout($scope.get_time, 5000);
            });
    }
    $scope.get_time();
};
