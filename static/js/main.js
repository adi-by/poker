angular.module('Poker', ['ngTable']).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    }).
    value('games', games);