angular.module("furbMobile")
    .controller("tarefasCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "$ionicModal", "tarefaAPI", function ($scope, $rootScope, $state, $stateParams, $ionicModal, tarefaAPI) {

        $scope.gincana = $stateParams.gincana;

        if ($stateParams.grupo.idLider == 0) {
            $stateParams.grupo.idLider = $rootScope.usuario.id;
        }

        $scope.ehusuarioLider = $stateParams.grupo.idLider == $rootScope.usuario.id;
        $scope.ehusuarioLider = false;

        tarefaAPI.getTarefas($stateParams.grupo.id, $rootScope.usuario.id).then(
            function onSuccess(params) {
                $scope.tarefasGrupo = params.data;
            }
        );

        $scope.fecharModal = function () {
            $scope.modal.remove().then(
                function onSuccess(params) {
                    tarefaAPI.getTarefas($stateParams.grupo.id, $rootScope.usuario.id).then(
                        function onSuccess(params) {
                            $scope.tarefasGrupo = params.data;
                        }
                    );
                }
            )
        };

        $scope.resolverTarefa = function (tarefaGrupo) {
            var _templateUrl;
            $scope.tarefaGrupo = tarefaGrupo;

            if ($scope.ehusuarioLider) {
                $scope.grupo = $stateParams.grupo;
                _templateUrl = 'templates/delegarTarefa.html';
            } else
                if (tarefaGrupo.tarefa.tipoTarefa == "PERGUNTA") {
                    _templateUrl = 'templates/resolverPergunta.html';
                } else
                    if (tarefaGrupo.tarefa.tipoTarefa == "IMAGEM") {
                        _templateUrl = 'templates/resolverImagem.html';
                    } else
                        if (tarefaGrupo.tarefa.tipoTarefa == "VIDEO") {
                            _templateUrl = 'templates/resolverVideo.html';
                        } else
                            if (tarefaGrupo.tarefa.tipoTarefa == "GEOLOCALIZACAO") {
                                _templateUrl = 'templates/resolverGeolocalizacao.html';
                            };


            $ionicModal.fromTemplateUrl(_templateUrl, {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        };

        $scope.doRefresh = function () {
            tarefaAPI.getTarefas($stateParams.grupo.id, $rootScope.usuario.id).then(
                function onSuccess(params) {
                    $scope.tarefasGrupo = params.data;
                })
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

    }]);