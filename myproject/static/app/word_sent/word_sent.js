app.controller("WordSentCtrl", function ($scope) {
    var generateOutput = function(text){
        $.ajax({
            type: "POST",
            url: "../word_sent",
            data: JSON.stringify({"text": text}),
            contentType: 'application/json'
        }).done(function (data) {
            try {
                var tags = data["output"];
                var text = tags.join(" ");

                var tags = _.map(tags, function(tag){
                    return [tag, "Token"]
                });
                var entities = generateEntitiesFromTags(tags);
                var wordSent = {
                    "config": WordSentBratConfig,
                    "doc": {
                        "text": text,
                        "entities": entities
                    }
                };

                $("#output #word_sent").remove();
                $("#output").append("<div id='word_sent'></div>");
                Util.embed("word_sent", wordSent["config"], wordSent["doc"], []);
            } catch (e) {
                console.log(e);
            }
        }).fail(function () {
        });
    };

    generateOutput("Nhật ký SEA Games ngày 21/8: Ánh Viên thắng giòn giã ở vòng loại.");
    $scope.do = function () {
        var text = $("#text").val();
        generateOutput(text);
    }
});
