
(function (angular) {
  // 定义一个模块
  angular.module('moviecat.movie_detail',[])
    .config(['$routeProvider',function ($routeProvider) {
      $routeProvider
        .when('/detail/:id',{
          controller:'datailController',
          // template:'<h1>{{title}}<h1/>'
          templateUrl: 'movie_detail/view.html'
        })
    }])
    .controller('datailController',[
      '$scope',
      '$routeParams',
      'HttpService',
      function ($scope,$routeParams,HttpService) {
        $scope.loading = true;
        $scope.title = 'Loading...';
        $scope.movie = [];
      HttpService.jsonp(
        'http://api.douban.com/v2/movie/subject/' + $routeParams.id,
        {},
        function (data) {
          $scope.loading = false;
          $scope.title = data.title;
          $scope.movie = data;
          $scope.$apply(); // 强制同步数据到界面
        }
      )
    }])
})(angular);


