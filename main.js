//Funcion Anonima
(function () {
    //self se asigna a window
    self.Board = function(width, height){
        
            //Variables del objeto
            this.width = width;
            this.height = height;
            this.playing = false;
            this.game_over = false;
            this.bars = [];
            this.ball = null;
        
    }
    //Metodo para retonar baaras y pelotas dentro del tablero
    Board.prototype = {
        get elements() {
            var elemets = this.bars;
            this.elements.push(ball);
            return this.elements;
        }
    }

})();
//Clase para crear el tablero
(function(){
    self.BoardView = function(canvas, board){
            //Variables del objeto
            this.canvas = canvas;
            this.canvas.width = board.width;
            this.canvas.height = board.height;
            this.board = board;
            //Objeto contexto para dibujar en JS
            this.ctx = canvas.getContext("2d") 
    
        

    } 
})();

window.addEventListener("load", main);



function main() {
    const board = new Board(800,500);
    var canvas = document.getElementById('canvas')
    const board_view = new BoardView(canvas, board);
}
