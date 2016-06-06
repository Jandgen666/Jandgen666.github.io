/**
 * Created by JS on 2016/04/15/0015.
 */
(function (angular) {
  angular.module('moviecat.directives.auto_active',[])
    .directive('autoActive',['$location',function ($location) {
      return {
        // 指令只會觸發一次，頁面不刷新
        link : function (scope,element,attributes) {
          scope.location = $location;
          // $watch只會監視scope上的對象的改變
          scope.$watch('location.url()',function (now,old) {
            var aLink = element.children().attr('href').substr(1);
            if(now.startsWith(aLink)) {
              element.parent().children().removeClass(attributes.autoActive);
              element.addClass(attributes.autoActive);
            }
          })
        }
      }
    }]);
})(angular);
