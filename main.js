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
            //elements.push(this.ball);
            return elements;
        }
    }

})();
//Metodo para crear el objeto pelota
(function (){
    self.Ball = function(x,y,radius,board){
    this.x = y;
    this.y = y;
    this.radius = radius;
    this.speed_y = 0;
    this.speed_x = 3
    this.board = board;

    board.ball = this;
    this.kind = "circle";
    }
})();

//Metodo para crear el objeto barras
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
        toString: function () {
            return "x: " + this.x + "y:" + this.y;
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
        //Limpiar el board canvas
        clean: function () {
            this.ctx.clearRect(0, 0, this.board.width, this.board.height);
        },
        //Validar
        draw: function () {
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var drawElement = this.board.elements[i];

                draw(this.ctx, drawElement);

            };
        },
        play: function () {
            //Limpiar Board
            this.clean();
            //Dibujar Board 
            this.draw();
        }
    }

    //Dibujar elementos
    function draw(ctx, element) {
        //Validar si el objeto a dibujar tiene una propiedad kind

        switch (element.kind) {
            case "rectangle":
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(element.x, element.y, element.radius, 0,7);
                ctx.fill();
                ctx.closePath();
                break;

        }
    }

})();
// 
var board = new Board(800, 500);
var bar = new Bar(20, 100, 40, 100, board);
var bar_2 = new Bar(735, 100, 40, 100, board);
var canvas = document.getElementById('canvas')
var board_view = new BoardView(canvas, board);
var ball = new Ball(350, 100, 10, board);




//Funcion de moviento de barras
document.addEventListener("keydown", function (ev) {
    //cancelar movimiento en el navegador
    ev.preventDefault();

    if (ev.keyCode == 38) {
        bar.up();
    } else if (ev.keyCode == 40) {
        bar.down();

        //Asignacion de teclas a la barra numero 2 (S,W)
    } else if (ev.keyCode == 87) {
        //W
        bar_2.up();
    } else if (ev.keyCode === 83) {
        //S
        bar_2.down();
    }

});

//self.addEventListener("load", main);

//Request Animation frame
window.requestAnimationFrame(controller);

function controller() {

    board_view.play();

    //Actualizacion en tiempo real
    window.requestAnimationFrame(controller);



}
