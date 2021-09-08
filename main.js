//Funcion Anonima
(function () {
    //Self se asigna a window.
    self.Board = function (width, height) {

        //Variables del objeto
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;

    }
    //Metodo para retonar barras y esferas adentro del tablero
    self.Board.prototype = {
        get elements() {
            var elements = this.bars;
            elements.push(this.ball);
            return elements;
        }
    }

})();
//metodo para crear el objeto barras
(function () {
    self.Bar = function (x, y, width, height, board) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        //Agregamos en el board un elemento con push.
        this.board.bars.push(this);
        //Variable para dibujar un rectangulo en canvas
        this.kind = "rectangle";
        //Variable para velocidad del movimeinto de las barras
        this.speed = 10;


    }
    //Modificar el prototype de la funcion
    self.Bar.prototype = {
        //Funciones para darle movimiento a las barras
        down: function () {
            this.y += this.speed;
        },
        up: function () {
            this.y -= this.speed;
        },
        //Imprimir en que cordenada se encuentra la barra
        toString: function(){
            return "x: "+ this.x + "y:"+ this.y;
        }
    }
})();
//Clase para crear el tablero(vista)
(function () {
    self.BoardView = function (canvas, board) {
        //Variables del objeto
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        //Objeto contexto para dibujar en JS
        this.ctx = canvas.getContext("2d");
    }

    //Modificar prototype de la clase BoardView
    self.BoardView.prototype = {
        //Validar
        draw: function () {
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var drawElement = this.board.elements[i];

                draw(this.ctx, drawElement);

            };
        }
    }

    //Dibujar elementos
    function draw(ctx, element) {
        //Validar si el objeto a dibujar tiene una propiedad kind
        if (element !== null && element.hasOwnProperty("kind")) {
            switch (element.kind) {
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                    break;
            }
        }
    }

})();
// 
var board = new Board(800, 500);
var bar = new Bar(20, 100, 40, 100, board);
var bar = new Bar(735, 100, 40, 100, board);
const canvas = document.getElementById('canvas')
const board_view = new BoardView(canvas, board);

document.addEventListener("keydown", function (ev) {
    console.log(ev.keyCode);
    if (ev.keyCode == 38) {
        bar.up();
    }
    else if (ev.keyCode == 40) {
        bar.down();
    }

});

self.addEventListener("load", main);


function main() {

    //Dibujar todos los elementos
    board_view.draw();
    console.log(board);
}
