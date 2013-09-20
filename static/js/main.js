$(window).resize(function() {
    $(".blind-text-class").css("z-index", 1);
});

angular.module('Poker', [])
    .filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            return Array(len - num).join('0') + num;
        };
    }).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    }).
    value('dataModel', dataModel);


function Audio($rootScope, $element) {
    $rootScope.$on('levelUp', function() {
       $element[0].play();
    });
};
