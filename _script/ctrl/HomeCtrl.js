'use strict';

define(['app'], function (app) {

    return app.controller('HomeCtrl', ['$scope', '$rootScope', '$http',
        function ($scope, $rootScope, $http) {

            // REQUEST DATA

            // FUNCTIONS

            // CONSTRUCTOR

            $scope.init = function () {

            };

            $scope.reset = function () {

            };

            $scope.reload = function () {

                window.location.reload();

            };

            $scope.init();
    }]);

});