$(window).resize(function() {
    $(".blind-text-class").css("z-index", 1);
});

angular.module('Poker', [])
    .filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            num_str = '' + num;
            return Array(len - num_str.length).join('0') + num_str;
        };
    }).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    }).value('dataModel', dataModel);


function Audio($rootScope, $element) {
    $rootScope.$on('levelUp', function() {
       $element[0].play();
    });
};
