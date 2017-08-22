function generateOutput(text){
    $.ajax({
        type: "POST",
        url: "/word_sent",
        data: JSON.stringify({"text": text}),
        contentType: 'application/json'
    }).done(function (data) {
        try {
            window.start = 0;
            var tags = data["output"];
            input = {
                "config": {},
                "doc": {}
            };
            input["config"] = window.data["word_sent"]["config"];

            var entities = _.map(tags, function(tag, i){
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
        } catch(e){
            console.log(e);
        }
    }).fail(function () {
    });
};

$("#word_segmentation").click(function () {
    var text = $("#text").val();
    generateOutput(text);
});

function flashLabel(){
    var time = 400;
    for(var i=0; i<1; i++){
        $("#live-label").animate({"color": "#fff"}, time);
        $("#live-label").animate({"color": "#c0dbab"}, time);
    }
    $("#live-label").animate({"color": "#fff"}, time);
}

$(document).ready(function(){
    flashLabel();
});
