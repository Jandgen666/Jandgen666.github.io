
(function (angular) {
  // 定义一个模块
  angular.module('moviecat.movie_list',['ngRoute','moviecat.services.http'])
    .config(['$routeProvider',function ($routeProvider) {
      $routeProvider
        .when('/:catogery/:page?',{
          controller:'mainController',
          // template:'<h1>{{title}}<h1/>'
          templateUrl: 'movie_list/view.html'
        })
    }])
    .controller('mainController',[
      '$scope',
      '$route',
      '$routeParams',
      'HttpService',
      function ($scope,$route,$routeParams,HttpService) {
        $scope.page = ($routeParams.page || 1) - 0;
        $scope.start = ($scope.page - 1) * 5;
        var count = 5;
        $scope.pageArr = [];
        $scope.totalCount = 0;
        $scope.loading = true;
        $scope.title = 'Loading...';
        $scope.movies = [];
      HttpService.jsonp(
        'http://api.douban.com/v2/movie/' + $routeParams.catogery,
        {start:$scope.start,count:count,q:$routeParams.q},
        function (data) {
          $scope.loading = false;
          $scope.title = data.title;
          $scope.totalCount = data.total;
          $scope.totalPage = Math.ceil($scope.totalCount / count);
          for(var i = 0,len =$scope.totalPage ; i < len; i++) {
            $scope.pageArr.push(i);
          }
          $scope.movies = data.subjects;
          $scope.$apply(); // 强制同步数据到界面
        }
      )
        $scope.go = function (page) {
          if(page >= 1 && page <= $scope.totalPage) {
            $route.updateParams({
              page : page
            })
          }
        }
    }])
})(angular);


