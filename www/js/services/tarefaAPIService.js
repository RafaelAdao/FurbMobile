angular.module("furbMobile").factory("tarefaAPI", ["$http", "config", function ($http, config) {

    var _getTarefas = function (idGrupo, idUsuario) {
        var usuario = {
            idGrupo: idGrupo,
            idUsuario: idUsuario
        };
        return $http.post(config.baseUrl + "tarefa/listardisponiveisporusuario/", usuario);
    };

    var _atribuirTarefa = function (idUsuario, tarefaGrupo) {
        var tarefaUsuario = {
            id: tarefaGrupo.id,
            idUsuario: idUsuario
        };
        return $http.post(config.baseUrl + "tarefa/associarcomusuario", tarefaUsuario)
    };

    var _resolverQuestionario = function (idTarefaGrupo, resposta) {
        var tarefaGrupo = {
            id: idTarefaGrupo,
            resposta: resposta
        }
        return $http.post(config.baseUrl + "tarefa/resolver", tarefaGrupo)
    };

    var _resolverImagem = function (idTarefaGrupo, imageData) {
        var tarefaGrupo = {
            id: idTarefaGrupo,
            resposta: imageData
        };
        return $http.post(config.baseUrl + "tarefa/resolverimagem", tarefaGrupo);
    };

    var _resolverVideo = function (idTarefaGrupo, video) {
        var tarefaGrupo = {
            id: idTarefaGrupo,
            resposta: video
        }
        return $http.post(config.baseUrl + "tarefa/resolver", tarefaGrupo)
    };

    var _resolverGeolocalizacao = function (idTarefaGrupo, location) {
        var tarefaGrupo = {
            id: idTarefaGrupo,
            latitude: location.lat(),
            longitude: location.lng()             
        }
        return $http.post(config.baseUrl + "tarefa/resolver", tarefaGrupo)
    };

    return {
        getTarefas: _getTarefas,
        atribuirTarefa: _atribuirTarefa,
        resolverQuestionario: _resolverQuestionario,
        resolverImagem: _resolverImagem,
        resolverVideo: _resolverVideo,
        resolverGeolocalizacao: _resolverGeolocalizacao
    };

}]);