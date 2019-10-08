class Tabuleiro{
    
    constructor(){
        this._jogador = "Branca";
        this._tabuleiro = new Array(8);
        this._matriz = new Array(8);
        
        for(var i = 0; i < 8; i++) {//Cria tabuleiro vazio
            this._tabuleiro[i] = new Array(8);
            this._matriz[i] = new Array(8);
            for(var j = 0; j < 8; j++){
                this._tabuleiro[i][j] = 0;
                this._matriz[i][j] = 0;
            }

        }
    }

    addPeca = function(peca){
        this._tabuleiro[peca.getPosI][peca.getPosJ] = peca;
        this._matriz[peca.getPosI][peca.getPosJ] = peca.getId;
    }

    rmPeca = function(i, j){
        this._tabuleiro[i][j] = 0;
        this._matriz[i][j] = 0;
    }

    getPeca = function(i, j){
		return this._tabuleiro[i][j];
    }

    getRepresentacao = function(){
        return this._matriz; 
    }

    setJogador = function(Jogador) {
        this._jogador = Jogador;
    }

    getJogador = function() {
        return this._jogador;
    }

    procuraReis = function() {
        var branco = 0;
        var preto = 0;
        for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++){
                if (this._matriz[i][j] === 1) branco = 1;
                if (this._matriz[i][j] === 7) preto = 7;
            }
        }
        if (branco === 0)return 1; 
        if (preto === 0)return 7;
        return null; 
    }

    reiniciar = function () {
        for(var i = 0; i < 8; i++) {//Cria tabuleiro vazio
            for(var j = 0; j < 8; j++){
                this._tabuleiro[i][j] = 0;
                this._matriz[i][j] = 0;
            }

        }
    }
}