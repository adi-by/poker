angular.module('Poker', ['ngTable', 'ui.router']).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    }).
    config(function($stateProvider, $routeProvider) {
        $stateProvider
            .state('start', {
                url: "",
                views: {
                    "players-view": { templateUrl: "/static/js/start.players.html",
                        controller:PlayersSelect}
                }
            })
            .state('add_player', {
                url: "",
                views: {
                    "players-view": { templateUrl: "/static/js/add_player.html",
                        controller:AddPlayer}
                }
            })
    }).
    value('games', games);