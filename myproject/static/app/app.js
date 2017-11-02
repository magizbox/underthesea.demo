window.app = angular.module("myApp", ['ui.router']);

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});

UndertheseaConfig = {
    'showFB': true,
    'showGithub': true,
    'name': 'underthesea'
};

CustomConfig = {
    'showFB': false,
    'showGithub': false,
    'name': 'NLP Framework'
};

app.constant('Config', CustomConfig);
// app.constant('Config', UndertheseaConfig);

app.controller("MainController", function ($rootScope, Config) {
    $rootScope.config = Config;
    // $rootScope.a = "haha";
    // console.log($scope.config);
});