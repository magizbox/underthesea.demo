app.controller("POSTagCtrl", function ($scope) {
    var generateOutput = function(text){
        $.ajax({
            type: "POST",
            url: "../pos_tag",
            data: JSON.stringify({"text": text}),
            contentType: 'application/json'
        }).done(function (data) {
            try {
                window.start = 0;
                var tags = data["output"];
                var tokens = _.map(tags, function(tag){ return tag[0] });
                var text = tokens.join(" ");

                var entities = generateEntitiesFromTags(tags);
                var pos = {
                    "config": POSTagBratConfig,
                    "doc": {
                       "text": text,
                       "entities": entities
                    }
                };

                $("#output #pos_tag").remove();
                $("#output").append("<div id='pos_tag'></div>");
                Util.embed("pos_tag", pos["config"], pos["doc"], []);
            } catch (e) {
                console.log(e);
            }
        }).fail(function () {
        });

    };

    Util.embed('pos_tag', POSExample["config"], POSExample["doc"], []);
    $scope.do = function () {
        var text = $("#text").val();
        generateOutput(text);
    }
});
