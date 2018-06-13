angular.module("furbMobile")
    .controller("resolverImagemCtrl", ["$scope", "tarefaAPI", "$cordovaCamera", "$ionicLoading", function ($scope, tarefaAPI, $cordovaCamera, $ionicLoading) {

        $scope.tirarFoto = function () {
            var options = {
                quality: 10,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                encodingType: 0,     // 0=JPG 1=PNG
                correctOrientation: true
            }

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.imageData = imageData;
                $scope.srcImagem = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                console.log("ERR", err);
            });

        }

        $scope.resolverImagem = function () {
            $ionicLoading.show({
                template: '<p>Confirmando resposta...</p><ion-spinner></ion-spinner>'
            });
            tarefaAPI.resolverImagem($scope.tarefaGrupo.id, $scope.imageData).then(
                function onSuccess(params) {
                    $ionicLoading.hide();
                    $scope.fecharModal();
                }
            );
        }

    }]);