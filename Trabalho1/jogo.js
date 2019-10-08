var tabuleiro = new Tabuleiro();

function JogoXadrez() {
	// Identificador de cada peça!
	const W_KING   = 1;  // "&#9812" ♔
	const W_QUEEN  = 2;  // "&#9813" ♕
	const W_ROOK   = 3;  // "&#9814" ♖
	const W_BISHOP = 4;  // "&#9815" ♗
	const W_KNIGHT = 5;  // "&#9816" ♘
	const W_PAWN   = 6;  // "&#9817" ♙
	const B_KING   = 7;  // "&#9818" ♚
	const B_QUEEN  = 8;  // "&#9819" ♛
	const B_ROOK   = 9;  // "&#9820" ♜
	const B_BISHOP = 10; // "&#9821" ♝
	const B_KNIGHT = 11; // "&#9822" ♞
	const B_PAWN   = 12; // "&#9823" ♟

	this.iniciaJogo = function(){//Adiciona as pecas nas posicoes iniciais
		for(var j = 0; j < 8; j++) {
			tabuleiro.addPeca(new Peao("Branca", 1, j, W_PAWN));
		}
	
		for(var j = 0; j < 8; j++) {
			tabuleiro.addPeca(new Peao("Preta", 6, j, B_PAWN));
		}
	
		tabuleiro.addPeca(new Torre("Branca", 0, 0, W_ROOK));
		tabuleiro.addPeca(new Torre("Branca", 0, 7, W_ROOK));
		tabuleiro.addPeca(new Cavalo("Branca", 0, 1, W_KNIGHT));
		tabuleiro.addPeca(new Cavalo("Branca", 0, 6, W_KNIGHT));
		tabuleiro.addPeca(new Bispo("Branca", 0, 2, W_BISHOP));
		tabuleiro.addPeca(new Bispo("Branca", 0, 5, W_BISHOP));
		tabuleiro.addPeca(new Rainha("Branca", 0, 3, W_QUEEN));
		tabuleiro.addPeca(new Rei("Branca", 0, 4, W_KING));
		tabuleiro.addPeca(new Torre("Preta", 7, 0, B_ROOK));
		tabuleiro.addPeca(new Torre("Preta", 7, 7, B_ROOK));
		tabuleiro.addPeca(new Cavalo("Preta", 7, 1, B_KNIGHT));
		tabuleiro.addPeca(new Cavalo("Preta", 7, 6, B_KNIGHT));
		tabuleiro.addPeca(new Bispo("Preta", 7, 2, B_BISHOP));
		tabuleiro.addPeca(new Bispo("Preta", 7, 5, B_BISHOP));
		tabuleiro.addPeca(new Rainha("Preta", 7, 3, B_QUEEN));
		tabuleiro.addPeca(new Rei("Preta", 7, 4, B_KING));
	}
	


	// Esse método retorna um array 8x8 contendo o estado do tabuleiro.
	this.getTabuleiro = function() {
		return tabuleiro.getRepresentacao();
	}

	this.verificaFim = function(){
		return tabuleiro.procuraReis();
	}

	// Esse método reinicia o jogo.
	this.reiniciar = function() {		
		tabuleiro.setJogador("Branca");
		tabuleiro.reiniciar();
	}

	// Esse método retorna uma referência para o objeto peça que está na posição i,j do tabuleiro.
	// Se a posição não tiver uma peça pertencente ao jogador atual, esse método deve retornar null;
	this.getPeca = function(i, j) {
		var peca = tabuleiro.getPeca(i,j);
		//alert("Jogador: " + tabuleiro.getJogador() + "\nPeca: " + peca.getTipo);
		if(tabuleiro.getJogador() != peca.getTipo)return null;
		if(peca === 0) return null;
		return peca;
	}

	// Esse método move a peça para a posição i, j do tabuleiro.
	// Se o movimento não for possível, esse método deve retornar false. Caso contrário, deve retornar true;
	// Não é necessário se preocupar com a existência de outra peça. Caso a posição final da peça esteja ocupada por outra, a peça deverá ser substituída pela nova.
	// Sempre que esse método for executado com sucesso (retornando true) o turno deve ser atualizado, passando o controle para o outro jogador. Obs: não é permitido que o usuário mova uma peça de outro jogador.
	this.moverPeca = function(peca, i, j) {
		
		// Não pode mover uma peça para fora do tabuleiro.
		if (i > 7 || i < 0 || j > 7 || j < 0)
			return false;

		// Não pode mover uma peça para o mesmo lugar.
		if (i == peca.getPosI && j == peca.getPosJ )return false;		
		matriz = tabuleiro.getRepresentacao();		
		
		if(peca.mover(matriz, i, j)){
			if(peca.getTipo === "Branca" && //Peca branca tentando atacar branca
			matriz[i][j] > 0 && 
			matriz[i][j] < 7) return false;

			if(peca.getTipo === "Preta" && //Peca preta tentando atacar preta
			matriz[i][j] > 6 && 
			matriz[i][j] < 13) return false;

			tabuleiro.rmPeca(peca.getPosI, peca.getPosJ);
			peca.setPosI =  i;
			peca.setPosJ =  j;
			tabuleiro.addPeca(peca);

			if(tabuleiro.getJogador() === "Branca"){//Muda o turno
				tabuleiro.setJogador("Preta");
			}else
			tabuleiro.setJogador("Branca");

			return true;
		}
		return false;		
	}	
}
