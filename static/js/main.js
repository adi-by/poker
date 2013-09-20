$(window).resize(function() {
    $(".blind-text-class").css("z-index", 1);
});

angular.module('Poker', [])
    .filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
    });

function Audio($rootScope, $element) {
    $rootScope.$on('levelUp', function() {
       $element[0].play();
    });
};
