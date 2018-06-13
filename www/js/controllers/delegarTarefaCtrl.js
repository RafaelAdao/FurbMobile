angular.module("furbMobile")
    .controller("delegarTarefaCtrl", ["$scope", "usuarioAPI", "tarefaAPI", "$ionicLoading", function ($scope, usuarioAPI, tarefaAPI, $ionicLoading) {

        $ionicLoading.show({
            template: '<p>Carregando usuários...</p><ion-spinner></ion-spinner>'
        });
        usuarioAPI.getUsuariosDisponiveis($scope.grupo).then(
            function onSuccess(params) {
                $scope.usuarios = params.data;
                $scope.usuarios.selecionado = 0;
                $ionicLoading.hide();
            }
        );

        $scope.atribuirTarefa = function () {
            if ($scope.usuarios.selecionado != 0) {
                $ionicLoading.show({
                    template: '<p>Associando com usuário...</p><ion-spinner></ion-spinner>'
                });
                tarefaAPI.atribuirTarefa($scope.usuarios.selecionado, $scope.tarefaGrupo).then(
                    function onSuccess(params) {
                        $ionicLoading.hide();
                        $scope.fecharModal();
                    }
                )
            }
        };

        $scope.doRefresh = function () {
            usuarioAPI.getUsuariosDisponiveis($scope.grupo).then(
                function onSuccess(params) {
                    $scope.usuarios = params.data;
                    $scope.usuarios.selecionado = 0;
                })
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
    }]);