// /**
//  * Created by JS on 2016/04/15/0015.
//  */
(function (angular) {
  'use strict';
  angular.module('moviecat.services.http',[])
    .service('HttpService',['$window',function ($window) {
      this.jsonp = function(url,params,callback) {
        /*将匿名的callback函数挂载到全局作用域上，否则拿不到*/
        var cbName = 'JSONP_'+ Math.random().toString().substr(2);
        $window[cbName] = function(data) {
          callback(data);
          $window.document.body.removeChild(scriptElement);
        };

        // 1. 组合最终请求的url地址
        var querystring = '';
        for (var key in params) {
          querystring += key + '=' + params[key] + '&';
        };

        querystring += 'callback=' + cbName;
        url = url + '?' + querystring;
        /*创建script标签*/
        var scriptElement = $window.document.createElement('script');
        scriptElement.src = url;
        $window.document.body.appendChild(scriptElement);
      };
    }]);
})(angular);



