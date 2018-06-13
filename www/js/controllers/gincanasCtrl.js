angular.module("furbMobile")
	.controller("gincanasCtrl", ["$scope", "$rootScope", "$state", "$ionicModal", "gincanaAPI", "grupoAPI", "usuario", "$ionicLoading", function ($scope, $rootScope, $state, $ionicModal, gincanaAPI, grupoAPI, usuario, $ionicLoading) {

		$rootScope.usuario = usuario.data;
		/**
		 * Substitui o token de usuário de curta duração por um token de longa duração
		 */
		localStorage.setItem("fbAccessToken", $rootScope.usuario.facebookToken);

        $ionicLoading.show({
            template: '<p>Carregando gincanas...</p><ion-spinner></ion-spinner>'
        });
		gincanaAPI.getGincanas().then(
			function onSuccess(params) {
				$scope.gincanas = params.data;
				$ionicLoading.hide();
			}
		);

		$scope.abrirGincana = function (gincana) {
			grupoAPI.getGrupoUsuario(gincana.id, $rootScope.usuario.id).then(
				function onSuccess(params) {
					$scope.gincana = gincana;
					if (params.data == "") {
						$scope.fecharModal = function () {
							$scope.modal.remove().then(
								function onSuccess(params) {
									grupoAPI.getGrupoUsuario(gincana.id, $rootScope.usuario.id).then(
										function onSuccess(params) {
											$state.go("tarefas", { grupo: params.data, gincana: gincana });
										}
									);
								}
							)

						}
						$ionicModal.fromTemplateUrl('templates/grupos.html', {
							scope: $scope
						}).then(function (modal) {
							$scope.modal = modal;
							$scope.modal.show();
						});
					} else {
						$state.go("tarefas", { grupo: params.data, gincana: gincana });
					}
				}
			);
		};

		$scope.doRefresh = function () {
			gincanaAPI.getGincanas().then(
				function onSuccess(params) {
					$scope.gincanas = params.data;
				})
				.finally(function () {
					// Stop the ion-refresher from spinning
					$scope.$broadcast('scroll.refreshComplete');
				});
		};

	}]);