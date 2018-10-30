var app = angular.module('app', []);

//Erstellen von Neue Directiv, eigene //gemäss(https://www.w3schools.com/angular/angular_directives.asp)

app.directive('ticTacToe', [function() {
    return {
       
        templateUrl: 'tictactoe.html',
        controller: 'TicTacToeCtrl'
    };
}]);


//Binden von Controller

app.controller('TicTacToeCtrl', ['$scope', '$timeout', function($scope, $timeout) {

    
//Durch änderung von Grid Size, kann man die spiele erweitern ( es ist nur versuch)
    
    $scope.grid_size = 3;

    $scope.init = function() {

        $scope.empty();

        $scope.scores = {
            X: 0,
            O: 0
        };

        $scope.dummyArray = new Array($scope.grid_size);

    };

    $scope.empty = function() {
        $scope.data = {};
        $scope.moves = 0;
    };

    $scope.mark = function(row_index, column_index) {

        if ($scope.data[row_index + '' + column_index]) {
            return;
        }

        $scope.moves++;

        var current_mark = $scope.moves % 2 === 1 ? 'X' : 'O';

        $scope.data[row_index + '' + column_index] = current_mark;

        $timeout(function() {
            if ($scope.didWin(current_mark)) {
                alert(current_mark + " HAT GEWONNEN");
                $scope.scores[current_mark]++;
                $scope.empty();
            } 
        }.bind(this),300);

    };


    $scope.didWin = function(mark) {

        var vertical_count = 0,
            horizontal_count = 0,
            right_to_left_count = 0,
            left_to_right_count = 0;


        for (var i = 0; i < $scope.grid_size; i++) {

            vertical_count = 0;
            horizontal_count = 0;

            for (var j = 0; j < $scope.grid_size; j++) {

                if ($scope.data[i + '' + j] == mark) {
                    horizontal_count++;
                }

                if ($scope.data[j + '' + i] == mark) {
                    vertical_count++;
                }

            }

            if ($scope.data[i + '' + i] == mark) {
                left_to_right_count++;
            }

            if ($scope.data[($scope.grid_size - 1 - i) + '' + i] == mark) {
                right_to_left_count++;
            }

            if (horizontal_count == $scope.grid_size || vertical_count == $scope.grid_size) {
                return true;
            }

        }

        if (left_to_right_count == $scope.grid_size || right_to_left_count == $scope.grid_size) {
            return true;
        }

        return false;
    };

    $scope.init();
}]);
