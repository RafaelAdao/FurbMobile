angular.module("furbMobile").factory("usuarioAPI", ["$http", "config", "ngFB", function ($http, config, ngFB) {

    var _getUsuario = function () {
        return ngFB.api({ path: '/me', params: { fields: 'id' } })
            .then(
            function (user) {
                var facebookToken = localStorage.getItem("fbAccessToken");
                var usuario = {idFacebook: user.id, facebookToken: facebookToken};
                return $http.post(config.baseUrl + "usuario/obtercadastrarporidfacebook/", usuario);
            },
            function (error) {
                alert('Facebook error: ' + error.message);
            });
    };
    
    var _getUsuariosDisponiveis = function(grupo){
        return $http.get(config.baseUrl + "usuario/obterdisponiveis/" + grupo.id);
    };
    
    return {
        getUsuario: _getUsuario,
        getUsuariosDisponiveis: _getUsuariosDisponiveis
    };
}]);