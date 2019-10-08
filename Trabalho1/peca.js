class Peca{
    constructor(tipo, posI, posJ, id){
        this._tipo = tipo
        this._posI = posI;
        this._posJ = posJ;
        this._id = id;
    }
    
    get getTipo(){
        return this._tipo;
    }
    get getPosI(){
        return this._posI;
    }
    get getPosJ(){
        return this._posJ;
    }
    get getId(){
        return this._id;
    }
    
    set setPosI(posI){
        this._posI = posI;
    }
    set setPosJ(posJ){
        this._posJ = posJ;
    }
}

class Rei extends Peca{
    constructor(tipo, posI, posJ, id){
        super(tipo, posI, posJ, id);
    }
    
    mover = function(tabuleiro, destI, destJ){
        if (Math.abs(this.getPosI - destI) === 1 || Math.abs(this.getPosJ - destJ) === 1){
            if(tabuleiro[destI][destJ] < 7 && //Tentar atacar peca da mesma cor 
                tabuleiro[destI][destJ] > 0 &&
                this.getTipo === "Branca" ||                
                tabuleiro[destI][destJ] > 6 &&
                this.getTipo === "Preta") return false; 
        }			
        else return false;
        

        
        return true;

    }
    
}

class Peao extends Peca{
    constructor(tipo, posI, posJ, id){
        super(tipo, posI, posJ, id);
    }
    
    mover = function(tabuleiro, destI, destJ){
        if(this.getTipo === "Branca"){
            if ((destI - this.getPosI) <= 0) return false;//Voltar casa
            if (tabuleiro[destI][destJ] != 0 && this.getPosJ === destJ) return false			
            if ((destI - this.getPosI) <= 1 && this.getPosJ === destJ) return true;		
            if (this.getPosI === 1 && (destI - this.getPosI) <= 2 && this.getPosJ === destJ)return true;
            if (tabuleiro[destI][destJ] != 0 && 
                Math.abs(destI - this.getPosI) == 1 && 
                Math.abs(destJ - this.getPosJ) == 1) return true;        
            return false;
        }
        else{
            if ((destI - this.getPosI) >= 0) return false;//Voltar casa
            if (tabuleiro[destI][destJ] != 0 && this.getPosJ === destJ) return false			
            if ((destI - this.getPosI) >= -1 && this.getPosJ === destJ) return true;		
            if (this.getPosI === 6 && (destI - this.getPosI) >= -2 && this.getPosJ === destJ)return true;
            if (tabuleiro[destI][destJ] != 0 && 
                Math.abs(destI - this.getPosI) == 1 && 
                Math.abs(destJ - this.getPosJ) == 1) return true;                    
            return false;
        }
    }
}

class Torre extends Peca{
    constructor(tipo, posI, posJ, id){
        super(tipo, posI, posJ, id);
    }
    mover = function(tabuleiro, destI, destJ){
        var i = this.getPosI;
        var j = this.getPosJ;
    
        if((this.getPosI === destI)  &&  (this.getPosJ - destJ) > 0){//Testa pecas no caminho ←
            j--;
            while(j > destJ) {
                //alert("Pos = " + i + "." + j + "Tabuleiro: " + tabuleiro[i][j]);
                if (tabuleiro[this.getPosI][j] != 0) return false;	
                j--;
            }
        }
    
        if((this.getPosI === destI)  &&  (this.getPosJ - destJ) < 0){//Testa pecas no caminho →
            j++;
            while(j < destJ) {
                //alert("Pos = " + i + "." + j + "Tabuleiro: " + tabuleiro[i][j]);
                if (tabuleiro[this.getPosI][j] != 0) return false;	
                j++;
            }
        }
    
        if((this.getPosJ === destJ)  &&  (this.getPosI - destI) < 0){//Testa pecas no caminho ↓
            i++;
            while(i < destI) {
                //alert("Pos = " + i + "." + j + "Tabuleiro: " + tabuleiro[i][j]);
                if (tabuleiro[i][this.getPosJ] != 0) return false;	
                i++;
            }
        }
    
        if((this.getPosJ === destJ)  &&  (this.getPosI - destI) > 0){//Testa pecas no caminho ↑
            i--;
            while(i > destI) {
                //alert("Pos = " + i + "." + j + "Tabuleiro: " + tabuleiro[i][j]);
                if (tabuleiro[i][this.getPosJ] != 0) return false;	
                i--;
            }
        }
        
        if (this.getPosI === destI || this.getPosJ === destJ ) return true;
        return false;
    }
}

class Bispo extends Peca{
    constructor(tipo, posI, posJ, id){
        super(tipo, posI, posJ, id);
    }

    mover = function(tabuleiro, destI, destJ){
        var i = this.getPosI;
        var j = this.getPosJ;     

        if (Math.abs(this.getPosI - destI) != Math.abs(this.getPosJ - destJ)) return false;
    
        if((this.getPosI - destI) === (this.getPosJ - destJ) && (this.getPosI - destI) < 0){ //Testa pecas no caminho ↘
            i++;
            j++;
            while(i < destI) {
                if (tabuleiro[i][j] != 0) return false;	
                i++;
                j++;
            }
        }        
    
        if((this.getPosI - destI) === (this.getPosJ - destJ) && (this.getPosI - destI) > 0){//Testa pecas no caminho ↖
            i--;
            j--;
            while(i > destI) {
                if (tabuleiro[i][j] != 0) return false;	
                i--;
                j--;
            }
        }
    
        if((this.getPosI - destI) === -(this.getPosJ - destJ) && (this.getPosI - destI) > 0){//Testa pecas no caminho ↗
            i--;
            j++;
            while(i > destI) {
                if (tabuleiro[i][j] != 0) return false;	
                i--;
                j++;
            }
        }
    
        if(-(this.getPosI - destI) === (this.getPosJ - destJ) && (this.getPosI - destI) < 0){//Testa pecas no caminho ↙
            i++;
            j--;
            while(i < destI) {
                if (tabuleiro[i][j] != 0) return false;	
                i++;
                j--;
            }
        }
        return true;
    }
}

class Cavalo extends Peca{
    constructor(tipo, posI, posJ, id){
        super(tipo, posI, posJ, id);
    }

    mover = function(tabuleiro, destI, destJ){
        if (Math.abs(this.getPosI - destI) === 2 && Math.abs(this.getPosJ - destJ) === 1) return true;
        if (Math.abs(this.getPosI - destI) === 1 && Math.abs(this.getPosJ - destJ) === 2) return true;
        return false;
    }
}

class Rainha extends Peca{
    constructor(tipo, posI, posJ, id){
        super(tipo, posI, posJ, id);
    }
    mover = function(tabuleiro, destI, destJ){
        var i = this.getPosI;
        var j = this.getPosJ;    
 
    
        if((this.getPosI === destI)  &&  (this.getPosJ - destJ) > 0){//Testa pecas no caminho ←
            j--;
            while(j > destJ) {
                if (tabuleiro[this.getPosI][j] != 0) return false;	
                j--;
            }
        }
    
        if((this.getPosI === destI)  &&  (this.getPosJ - destJ) < 0){//Testa pecas no caminho →
            j++;
            while(j < destJ) {
                if (tabuleiro[this.getPosI][j] != 0) return false;	
                j++;
            }
        }
    
        if((this.getPosJ === destJ)  &&  (this.getPosI - destI) < 0){//Testa pecas no caminho ↓
            i++;
            while(i < destI) {
                if (tabuleiro[i][this.getPosJ] != 0) return false;	
                i++;
            }
        }
    
        if((this.getPosJ === destJ)  &&  (this.getPosI - destI) > 0){//Testa pecas no caminho ↑
            i--;
            while(i > destI) {
                if (tabuleiro[i][this.getPosJ] != 0) return false;	
                i--;
            }
        }
        
        if (this.getPosI === destI || this.getPosJ === destJ ) return true;

        if (Math.abs(this.getPosI - destI) != Math.abs(this.getPosJ - destJ)) return false;
    
        if((this.getPosI - destI) === (this.getPosJ - destJ) && (this.getPosI - destI) < 0){ //Testa pecas no caminho ↘
            i++;
            j++;
            while(i < destI) {
                if (tabuleiro[i][j] != 0) return false;	
                i++;
                j++;
            }
        }        
    
        if((this.getPosI - destI) === (this.getPosJ - destJ) && (this.getPosI - destI) > 0){//Testa pecas no caminho ↖
            i--;
            j--;
            while(i > destI) {
                if (tabuleiro[i][j] != 0) return false;	
                i--;
                j--;
            }
        }
    
        if((this.getPosI - destI) === -(this.getPosJ - destJ) && (this.getPosI - destI) > 0){//Testa pecas no caminho ↗
            i--;
            j++;
            while(i > destI) {
                if (tabuleiro[i][j] != 0) return false;	
                i--;
                j++;
            }
        }
    
        if(-(this.getPosI - destI) === (this.getPosJ - destJ) && (this.getPosI - destI) < 0){//Testa pecas no caminho ↙
            i++;
            j--;
            while(i < destI) {
                if (tabuleiro[i][j] != 0) return false;	
                i++;
                j--;
            }
        }
        return true;
    }

}