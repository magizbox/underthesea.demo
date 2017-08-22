app.controller("WordSentCtrl", function ($scope) {
    var bratConfig = {
        entity_types: [
            {
                type: 'Token',
                labels: ['_'],
                bgColor: '#00B0FF',
                borderColor: 'darken'
            }
        ],
        "relation_types": []
    };
    var defaultData = {
        "doc": {
            text: "Nhật ký SEA Games ngày 21 / 8 : Ánh Viên thắng giòn giã ở vòng loại",
            entities:
                [
                    ["T1", "Token", [[0, 7]]],
                    ["T2", "Token", [[8, 11]]],
                    ["T3", "Token", [[12, 17]]],
                    ["T4", "Token", [[18, 22]]],
                    ["T5", "Token", [[23, 25]]],
                    ["T6", "Token", [[26, 27]]],
                    ["T7", "Token", [[28, 29]]],
                    ["T8", "Token", [[30, 31]]],
                    ["T9", "Token", [[32, 40]]],
                    ["T10", "Token", [[41, 46]]],
                    ["T11", "Token", [[47, 55]]],
                    ["T12", "Token", [[56, 57]]],
                    ["T13", "Token", [[58, 62]]],
                    ["T14", "Token", [[63, 67]]]]
        }
    };
    defaultData["config"] = bratConfig;

    var generateOutput = function(text){
        $.ajax({
            type: "POST",
            url: "../word_sent",
            data: JSON.stringify({"text": text}),
            contentType: 'application/json'
        }).done(function (data) {
            console.log(data);
            try {
                window.start = 0;
                var tags = data["output"];
                input = {
                    "config": {},
                    "doc": {}
                };
                input["config"] = bratConfig;

                var entities = _.map(tags, function (tag, i) {
                    var entity = [];
                    entity[0] = "T" + (i + 1);
                    entity[1] = "Token";
                    entity[2] = [[window.start, window.start + tag.length]];
                    window.start += tag.length + 1;
                    return entity;
                });
                input["doc"]["text"] = tags.join(" ");
                input["doc"]["entities"] = entities;

                $("#output #word_sent").remove();
                $("#output").append("<div id='word_sent'></div>");
                Util.embed("word_sent", input["config"], input["doc"], []);
            } catch (e) {
                console.log(e);
            }
        }).fail(function () {
        });

    };

    Util.embed('word_sent', defaultData["config"], defaultData["doc"], []);
    $scope.do = function () {
        var text = $("#text").val();
        generateOutput(text);
    }
});
