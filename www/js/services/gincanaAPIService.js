angular.module("furbMobile").factory("gincanaAPI", ["$http", "config", function ($http, config) {
	var _getGincanas = function () {
		return $http.get(config.baseUrl + "gincana/listar");
	};

	var _getGincana = function (id) {
		return $http.get(config.baseUrl + "gincana/" + id);
	};

	return {
		getGincanas: _getGincanas,
		getGincana: _getGincana
	};
}]);