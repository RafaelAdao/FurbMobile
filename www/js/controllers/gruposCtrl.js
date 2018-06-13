angular.module("furbMobile")
	.controller("gruposCtrl", ["$scope", "$rootScope", "$state", "grupoAPI", "$ionicLoading", function ($scope, $rootScope, $state, grupoAPI, $ionicLoading) {

        $ionicLoading.show({
            template: '<p>Carregando grupos...</p><ion-spinner></ion-spinner>'
        });
		grupoAPI.getGrupos($scope.gincana).then(
			function onSuccess(params) {
				$scope.grupos = params.data;
				$ionicLoading.hide();
			}
		);

		$scope.entrarGrupo = function () {
			$ionicLoading.show({
				template: '<p>Entrando no grupo...</p><ion-spinner></ion-spinner>'
			});
			grupoAPI.vincular($rootScope.usuario.id, $scope.grupos.selecionado).then(
				function onSuccess(params) {
					$ionicLoading.hide();
					$scope.fecharModal();
				}
			);
		};

		$scope.doRefresh = function () {
			grupoAPI.getGrupos($scope.gincana).then(
				function onSuccess(params) {
					$scope.grupos = params.data;
				}
			)
				.finally(function () {
					// Stop the ion-refresher from spinning
					$scope.$broadcast('scroll.refreshComplete');
				});
		};
	}]);