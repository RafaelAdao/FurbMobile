angular.module("furbMobile")
    .controller("furbmobileCtrl", ["$scope", "$state", "ngFB", function ($scope, $state, ngFB) {

        $scope.abrirGincanas = function () {
            ngFB.getLoginStatus().then(
                function (response) {
                    if (response.status === 'connected') {
                        $state.go('gincanas');
                    } else if (response.status === 'not_authorized') {
                        // está logado no  Facebook, 
                        // mas não autorizou o aplicativo
                        alert('Para utilizar Gincanas, você deve autorizar');
                    } else {
                        // the user isn't logged in to Facebook.
                        ngFB.login({ scope: 'public_profile' }).then(
                            function (response) {
                                if (response.status === 'connected') {
                                    console.log('Facebook login succeeded');
                                    localStorage.setItem('tokenfacebook', response.authResponse.accessToken)
                                    $state.go('gincanas');
                                } else {
                                    alert('Facebook login failed');
                                }
                            });
                    }
                });
        }

    }]);