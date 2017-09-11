app.controller("ClassificationCtrl", function ($scope) {
    var generateOutput = function(text){
        $scope.tag = "";
        $.ajax({
            type: "POST",
            url: "../classification",
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

    $scope.getTagDescription = function(pos){
        var POS = {
            "N": "danh từ",
            "A": "tính từ",
            "V": "động từ",
            "P": "đại từ",
            "E": "giới từ",
            "I": "thán từ",
            "L": "định từ",
            "M": "số từ",
            "T": "trợ từ",
            "Z": "yếu tố cấu tạo từ",
            "R": "phó từ",
            "X": "từ không phân loại được",
            "C": "liên từ"
        };
        return POS[pos];
    };
    $scope.do = function () {
        var text = $("#text").val();
        generateOutput(text);
    }

    $scope.init = function(){
        $scope.tag = "";
        $scope.do();
    };
    $scope.init();
});
