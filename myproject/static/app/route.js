app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            controller: 'WordSentCtrl',
            templateUrl: "./static/app/word_sent/word_sent.html"
        })
        .when("/pos_tag", {
            templateUrl: "./static/app/pos_tag/pos_tag.html"
        })
        .otherwise({redirectTo: '/'});
});
