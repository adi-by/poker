angular.module('PokerGame', [])
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
    value('initial_is_running', initial_is_running).
    value('total_chips', total_chips);

function Server($scope, $rootScope, $http, $timeout, players) {
    $scope.get_time = function() {
        $http({method: 'GET', url: 'get_time'}).
            success(function(data, status, headers, config) {
                $rootScope.$emit('timeUpdate', data);
                $timeout($scope.get_time, 5000);
            });
    }
    $scope.get_time();

    source = new EventSource("data_stream");
    source.onmessage = function(event) {
        console.log("Got event " + event.data);
    };

    source.addEventListener('clock_update', function(e) {
        $scope.$apply(function () {
            data = JSON.parse(e.data);
            console.log("Got server event " + event.data);
            $rootScope.$emit('timeUpdate', data);
        });
    }, false);
    source.addEventListener('player_update', function(e) {
        $scope.$apply(function () {
            data = JSON.parse(e.data).players;
            console.log("Got server event " + event.data);
            var to_remove = [];
            for (var i = 0; i < players.length; i++) {
                var found = false;
                for (var j = 0; j < data.length; j++) {
                    if (data[j] == players[i].key) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    to_remove.push(players[i])
                }
            }
            for (var i = 0; i < to_remove.length; i++) {
                players.splice(players.indexOf(to_remove[i]), 1);
            }
            $rootScope.$emit('playerUpdate', data);
        });
    }, false);

    $rootScope.$on('levelUp', function() {
        new Audio(audio_file).play();
    });
};


