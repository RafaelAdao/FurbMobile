angular.module("furbMobile")
    .controller("resolverPerguntaCtrl", ["$scope", "tarefaAPI", "$ionicLoading", function ($scope, tarefaAPI, $ionicLoading) {

        $scope.resolverPergunta = function (resposta) {
            $ionicLoading.show({
                template: '<p>Confirmando resposta...</p><ion-spinner></ion-spinner>'
            });
            tarefaAPI.resolverPergunta($scope.tarefaGrupo.id, resposta).then(
                function onSuccess(params) {
                    $ionicLoading.hide();
                    $scope.fecharModal();                    
                }
            );
        };

    }]);