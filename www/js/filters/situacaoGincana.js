angular.module("furbMobile").filter("situacaoGincana", function () {
	return function(input) {
        if (input == "0")
            return "Não Ativada";
        if (input == "1")
            return "Ativada";
        if (input == "2")
            return "Finalizada"; 
    };
});