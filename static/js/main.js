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
    value('players', players);


function Audio($rootScope, $element) {
    $rootScope.$on('levelUp', function() {
       $element[0].play();
    });
};
