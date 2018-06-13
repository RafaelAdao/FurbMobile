angular
    .module("furbMobile")
    .controller("resolverGeolocalizacaoCtrl", ["$scope", "tarefaAPI", "NgMap", "$timeout", "$ionicLoading", function($scope, tarefaAPI, NgMap, $timeout, $ionicLoading) {

        $scope.obj = { renderizarMapa: false, renderizarCaminho: false };

        $scope.atualizarLocalizacao = function() {
            $timeout(function() {
                if ($scope.map == undefined) {
                    NgMap.getMap("mapa").then(function(map) {
                        $scope.map = map;
                    });
                } else {
                    NgMap.getGeoLocation().then(function onSuccess(params) {
                        $scope.map.markers[0].setPosition(params);
                    })
                }

                $scope.atualizarLocalizacao();
            }, 2000);

        };

        $scope.resolverGeolocalizacao = function() {
            if (!$scope.map.shapes.circle.getBounds().contains($scope.map.markers[0].position)) {
                alert("Você não está dentro da área da tarefa!");
                return;
            }

            $ionicLoading.show({
                template: '<p>Confirmando resposta...</p><ion-spinner></ion-spinner>'
            });
            tarefaAPI.resolverGeolocalizacao($scope.tarefaGrupo.id, $scope.map.markers[0].position).then(
                function onSuccess(params) {
                    $ionicLoading.hide();
                    $scope.fecharModal();
                }
            );
        };

        $scope.centralizarPosicao = function() {
            var onSuccess = function(position) {
                $scope.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                /*
                alert('Latitude: ' + position.coords.latitude + '\n' +
                    'Longitude: ' + position.coords.longitude + '\n' +
                    'Altitude: ' + position.coords.altitude + '\n' +
                    'Accuracy: ' + position.coords.accuracy + '\n' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                    'Heading: ' + position.coords.heading + '\n' +
                    'Speed: ' + position.coords.speed + '\n' +
                    'Timestamp: ' + position.timestamp + '\n');
                    */
            };

            // onError Callback receives a PositionError object
            //
            var onError = function(error) {
                alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        };

        $scope.centralizarObjetivo = function() {
            $scope.map.setCenter(new google.maps.LatLng($scope.tarefaGrupo.tarefa.latitude, $scope.tarefaGrupo.tarefa.longitude));
        };
        /*
                $scope.caminhar = function () {
                    var directionsDisplay = new google.maps.DirectionsRenderer();
                    var directionsService = new google.maps.DirectionsService();
        
                    directionsDisplay.setMap($scope.map);
        
                    var request = {
                        origin:  $scope.map.markers[0].getPosition(),
                        destination: new google.maps.LatLng($scope.tarefaGrupo.tarefa.latitude, $scope.tarefaGrupo.tarefa.longitude),
                        optimizeWaypoints: true,
                        travelMode: google.maps.TravelMode.DRIVING
                    };
        
                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                        }
                    });
                }
        
        $scope.atualizarLocalizacao();*/

    }]);