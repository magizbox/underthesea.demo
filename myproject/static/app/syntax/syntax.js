app.controller("WordSentCtrl", function ($scope, $uibModal, $rootScope) {

  var generateOutput = function (text) {
    $.ajax({
      type: "POST",
      url: "../chunking",
      data: JSON.stringify({"text": text}),
      contentType: 'application/json'
    }).done(function (data) {
      try {
        $scope.$apply(function () {
          var tags = data["output"];

          var tokens = _.map(tags, function (tag) {
            return tag[0]
          });
          var text = tokens.join(" ");

          var wordTags = _.map(tags, function (tag) {
            return [tag[0], "Token"]
          });
          var wordEntities = generateEntitiesFromTags(wordTags);
          $scope.wordSent = {
            "config": WordSentBratConfig,
            "doc": {
              "text": text,
              "entities": wordEntities
            }
          };

          var posTags = tags;
          var posEntities = generateEntitiesFromTags(posTags);
          $scope.pos_tag = {
            "config": POSTagBratConfig,
            "doc": {
              "text": text,
              "entities": posEntities
            }
          };

          var chunkingTags = _.map(tags, function (tag) {
            return [tag[0], tag[2]];
          });
          var chunkEntities = generateEntitiesFromIOBTags(chunkingTags);
          $scope.chunking = {
            "config": ChunkingBratConfig,
            "doc": {
              "text": text,
              "entities": chunkEntities
            }
          };
        });

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
