app.controller("DialogActCtrl", function ($scope) {
    var generateOutput = function(text){
        $scope.tag = "";
        $.ajax({
            type: "POST",
            url: "../act",
            data: JSON.stringify({"text": text}),
            contentType: 'application/json'
        }).done(function (data) {
            try {
                console.log(data);
                $scope.tag = data["output"][0];
                $scope.$apply();
            } catch (e) {
                console.log(e);
            }
        }).fail(function () {
        });
    };

    generateOutput("vâng e cảm ơn ạ");

    $scope.do = function () {
        var text = $("#text").val();
        generateOutput(text);
    }
});
