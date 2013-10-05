angular.module('Poker', ['$strap.directives', 'ngTable', 'ui.router']).
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
                        controller:PlayersSelect},
                    "blinds-view": { templateUrl: "/static/js/start.blinds.html",
                        controller:BlindsEdit}
                }
            })
            .state('add_player', {
                url: "",
                views: {
                    "players-view": { templateUrl: "/static/js/add_player.html",
                        controller:AddPlayer},
                    "blinds-view": { templateUrl: "/static/js/start.blinds.html",
                        controller:BlindsEdit}
                }
            })
    }).
    value('games', games);