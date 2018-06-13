angular.module("furbMobile").factory("grupoAPI", ["$http", "config", function ($http, config) {

    var _getGrupoUsuario = function (idGincana, idUsuario) {
        var usuarioGrupo = { idGincana: idGincana, idUsuario: idUsuario };
        return $http.post(config.baseUrl + "grupo/retornargrupousuario", usuarioGrupo);
    };

    var _vincular = function (idUsuario, idGrupo) {
        var usuarioGrupo = { idUsuario: idUsuario, idGrupo: idGrupo };
        return $http.post(config.baseUrl + "grupo/vincular", usuarioGrupo);
    };

    var _getGrupos = function (gincana) {
        return $http.get(config.baseUrl + "grupo/listarporgincana/" + gincana.id);
    };

    return {
        getGrupoUsuario: _getGrupoUsuario,
        vincular: _vincular,
        getGrupos: _getGrupos
    };
}]);