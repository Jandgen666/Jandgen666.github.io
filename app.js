(function(angular) {
  'use strict';

  // 主模块
  angular.module('moviecat', [
    'ngRoute',
    'moviecat.movie_list',
    'moviecat.movie_detail',
    'moviecat.directives.auto_active'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/in_theaters' });
  }])
    .controller('searchController',['$scope','$route',function ($scope,$route) {
      $scope.input = '';
      $scope.search = function () {
        $route.updateParams({
          catogery:'search',
          q : $scope.input
        })
      }
    }]);

}(angular));
