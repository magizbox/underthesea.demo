app.controller("DictionaryCtrl", function ($scope) {
    var generateOutput = function(text){
        $.ajax({
            type: "POST",
            url: "../dictionary",
            data: JSON.stringify({"text": text}),
            contentType: 'application/json'
        }).done(function (data) {
            try {
                console.log(data);
                if(!data["output"]){
                    $scope.notFound = true;
                } else {
                    $scope.word = data["output"];
                    $scope.found = true;
                }
                $scope.$apply();
            } catch (e) {
                console.log(e);
            }
        }).fail(function () {
        });
    };
    $scope.init = function(){
        $scope.notFound = false;
        $scope.found = false;
    };
    $scope.init();
    $scope.do = function () {
        var text = $("#text").val();
        generateOutput(text);
    }
});
