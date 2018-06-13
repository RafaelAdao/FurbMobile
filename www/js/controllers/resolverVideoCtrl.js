angular.module("furbMobile")
    .controller("resolverVideoCtrl", ["$scope", "tarefaAPI", "$http", "$q", "$ionicLoading", function ($scope, tarefaAPI, $http, $q, $ionicLoading) {

        $scope.videos = [];
        $scope.nextPageToken = undefined;
        $scope.prevPageToken = undefined;

        $scope.youtubeParams = {
            key: 'AIzaSyAueU10e1r89L0AVh8dhVfTD2YKjiXTk7k',
            type: 'video',
            maxResults: '5',
            part: 'id,snippet',
            q: '',
            order: 'relevance'
        }

        $scope.getVideos = function (query) {

            $ionicLoading.show({
                template: '<p>Carregando ' + query + '...</p><ion-spinner></ion-spinner>'
            });
            $scope.youtubeParams.q = query;
            $scope.videos = [];
            $http.get('https://www.googleapis.com/youtube/v3/search', { params: $scope.youtubeParams }).success(function (response) {
                $scope.nextPageToken = response.nextPageToken;
                $scope.prevPageToken = response.prevPageToken;
                angular.forEach(response.items, function (child) {
                    $scope.videos.push(child);
                });
                $q.all($scope.videos).then(function () {
                    $ionicLoading.hide();
                });
            });
        };

        $scope.trocarPagina = function (pageToken) {
            var youtubeTokenParams = {
                key: 'AIzaSyAueU10e1r89L0AVh8dhVfTD2YKjiXTk7k',
                type: 'video',
                maxResults: '5',
                part: 'id,snippet',
                q: '',
                pageToken: pageToken,
                order: 'relevance'
            };
            $ionicLoading.show({
                template: '<p>Carregando...</p><ion-spinner></ion-spinner>'
            });
            $scope.videos = [];
            $http.get('https://www.googleapis.com/youtube/v3/search', { params: youtubeTokenParams }).success(function (response) {
                $scope.nextPageToken = response.nextPageToken;
                $scope.prevPageToken = response.prevPageToken;
                angular.forEach(response.items, function (child) {
                    $scope.videos.push(child);
                });
                $q.all($scope.videos).then(function () {
                    $ionicLoading.hide();
                });
            });

        }

        $scope.resolverVideo = function () {
            $ionicLoading.show({
                template: '<p>Confirmando resposta...</p><ion-spinner></ion-spinner>'
            });
            tarefaAPI.resolverVideo($scope.tarefaGrupo.id, $scope.videos.selecionado).then(
                function onSuccess(params) {
                    $ionicLoading.hide();
                    $scope.fecharModal();
                }
            );
        };

    }]);