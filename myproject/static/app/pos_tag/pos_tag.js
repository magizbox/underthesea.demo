app.controller("POSTagCtrl", function ($scope) {
    var defaultData = {
        "doc": {
            text: "Nhật ký SEA Games ngày 21 / 8 : Ánh Viên thắng giòn giã ở vòng loại",
            entities:
                [
                    ["T1", "E", [[0, 7]]],
                    ["T2", "Np", [[8, 11]]],
                    ["T3", "Np", [[12, 17]]],
                    ["T4", "N", [[18, 22]]],
                    ["T5", "M", [[23, 25]]],
                    ["T6", "CH", [[26, 27]]],
                    ["T7", "M", [[28, 29]]],
                    ["T8", "CH", [[30, 31]]],
                    ["T9", "Np", [[32, 40]]],
                    ["T10", "V", [[41, 46]]],
                    ["T11", "N", [[47, 55]]],
                    ["T12", "E", [[56, 57]]],
                    ["T13", "N", [[58, 62]]],
                    ["T14", "N", [[63, 67]]]]
        }
    };
    defaultData["config"] = POSTagBratConfig;

    var generateOutput = function(text){
        $.ajax({
            type: "POST",
            url: "../pos_tag",
            data: JSON.stringify({"text": text}),
            contentType: 'application/json'
        }).done(function (data) {
            console.log(data);
            try {
                window.start = 0;
                var tags = data["output"];
                var tokens = _.map(tags, function(tag){ return tag[0] });
                brat = {
                    "config": {},
                    "doc": {}
                };
                brat["config"] = POSTagBratConfig;

                var entities = _.map(tags, function (tag, i) {
                    var entity = [];
                    entity[0] = "T" + (i + 1);
                    entity[1] = tag[1];
                    entity[2] = [[window.start, window.start + tag[0].length]];
                    window.start += tag[0].length + 1;
                    return entity;
                });
                brat["doc"]["text"] = tokens.join(" ");
                brat["doc"]["entities"] = entities;

                $("#output #pos_tag").remove();
                $("#output").append("<div id='pos_tag'></div>");
                Util.embed("pos_tag", brat["config"], brat["doc"], []);
            } catch (e) {
                console.log(e);
            }
        }).fail(function () {
        });

    };

    Util.embed('pos_tag', defaultData["config"], defaultData["doc"], []);
    $scope.do = function () {
        var text = $("#text").val();
        generateOutput(text);
    }
});
