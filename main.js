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
        

    }
    //Modificar el prototype de la funcion
    self.Bar.prototype = {
        //Funciones para mover el rectangulo
        down: function () {

        },
        up: function () {

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

self.addEventListener("load", main);

    
    function main() {
        var board = new Board(800, 500);
        var bar = new Bar(20, 100, 40, 100, board);
        const canvas = document.getElementById('canvas')
        const board_view = new BoardView(canvas, board);
        //Dibujar todos los elementos
        board_view.draw();
        console.log(board);
    }
