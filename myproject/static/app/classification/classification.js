app.controller("ClassificationCtrl", function ($scope) {
    var generateOutput = function(text, domain){
        $scope.tag = "";
        $.ajax({
            type: "POST",
            url: "../classification",
            data: JSON.stringify({
                "text": text,
                "domain": domain
            }),
            contentType: 'application/json'
        }).done(function (data) {
            try {
                console.log(data);
                $scope.tags = data["output"];
                $scope.$apply();
            } catch (e) {
                console.log(e);
            }
        }).fail(function () {
        });
    };
    $scope.domains = ["GENERAL", "BANK"];
    $scope.currentDomain = "GENERAL";
    $scope.defaultText = {
        "GENERAL": "Việt Nam hạ Indonesia 3-0, rộng cửa vào bán kết U18 Đông Nam Á. Cả Việt Nam lẫn Indonesia đang có hai chiến thắng, và chia nhau hai vị trí dẫn đầu bảng B. Vì thế, cuộc đối đầu giữa hai đội được xem như trận quyết định đến ngôi đầu bảng.",
        "BANK": "tôi chuyển tiền sang viettinbank không thành công mà vẫn mất phí 7.7K nè. "
    };
    $scope.text = "Việt Nam hạ Indonesia 3-0, rộng cửa vào bán kết U18 Đông Nam Á. Cả Việt Nam lẫn Indonesia đang có hai chiến thắng, và chia nhau hai vị trí dẫn đầu bảng B. Vì thế, cuộc đối đầu giữa hai đội được xem như trận quyết định đến ngôi đầu bảng.";
    $scope.select = function(domain){
        $scope.currentDomain = domain;
        $scope.text = $scope.defaultText[domain];
        $scope.tags = [];
    };
    $scope.do = function () {
        generateOutput($scope.text, $scope.currentDomain);
    };

    $scope.init = function(){
        $scope.tag = "";
        $scope.do();
    };
    $scope.init();
});
