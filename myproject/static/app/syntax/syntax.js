app.controller("WordSentCtrl", function ($scope, $uibModal, $rootScope) {
  $scope.openModal = {};
  $scope.posY = {};
  $scope.posX = {};
  $scope.openComponentModal = function (type) {
    $scope.openModal[type] = true;
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './static/app/modal-annotation.html',
      controller: 'ModalInstanceCtrl',
      size: 'md',
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      windowTopClass: 'top-modal',
      resolve: {
        items: function () {
          return "";
        }
      }
    });

    modalInstance.opened.then(function () {
      $(".modal").css("top", $scope.posY[type]);
      $(".modal").css("left", $scope.posX[type]);
    }, function () {

    });

    modalInstance.result.then(function (selectedItem) {
      $scope.openModal[type] = false;
    }, function () {
      $scope.openModal[type] = false;
    });
  };
  var generateOutput = function (text) {
    $.ajax({
      type: "POST",
      url: "../chunking",
      data: JSON.stringify({"text": text}),
      contentType: 'application/json'
    }).done(function (data) {
      try {
        var tags = data["output"];
        var tokens = _.map(tags, function (tag) {
          return tag[0]
        });
        var text = tokens.join(" ");

        var wordTags = _.map(tags, function (tag) {
          return [tag[0], "Token"]
        });
        var wordEntities = generateEntitiesFromTags(wordTags);
        var wordSent = {
          "config": WordSentBratConfig,
          "doc": {
            "text": text,
            "entities": wordEntities
          }
        };

        var posTags = tags;
        var posEntities = generateEntitiesFromTags(posTags);
        var pos = {
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
        var chunking = {
          "config": ChunkingBratConfig,
          "doc": {
            "text": text,
            "entities": chunkEntities
          }
        };


        $scope.$apply(function () {
          $scope.configWordSent = WordSentBratConfig;
          $scope.docWordSent = {
            "text": text,
            "entities": wordEntities
          };
        });
        console.log($scope.configWordSent);

        $rootScope.$broadcast('getDataSuccess');

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

  $scope.modalAnnotation = function (element, position) {
    if (!$scope.openModal[element]) {
      $scope.posX[element] = position.pageX;
      $scope.posY[element] = position.pageY + 20;
      $scope.openComponentModal(element);
    }
  };
});
app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});