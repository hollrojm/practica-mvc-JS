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
        this.playing = false;

    }
    //Metodo para mostrar barras y esferas en el objeto Board
    self.Board.prototype = {
        get elements() {
            var elements = this.bars.map(function (bar) { return bar; });
            elements.push(this.ball);
            return elements;
        }
    }

})();
//Metodo para crear el objeto pelota
(function () {
    self.Ball = function (x, y, radius, board) {
        this.x = y;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3
        this.board = board;
        this.direction = 1;

        board.ball = this;
        this.kind = "circle";


    }
    self.Ball.prototype = {
        move: function () {
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);

        }
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
            if (this.board.playing) {
                //Limpiar Board
                this.clean();
                //Dibujar Board 
                this.draw();
                //Moviento de la pelota
                this.board.ball.move();
            }

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
                ctx.arc(element.x, element.y, element.radius, 0, 7);
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


    if (ev.keyCode == 38) {
        ev.preventDefault();
        bar.up();
    } else if (ev.keyCode == 40) {
        ev.preventDefault();
        bar.down();

        //Asignacion de teclas a la barra numero 2 (S,W)
    } else if (ev.keyCode == 87) {
        ev.preventDefault();
        //W
        bar_2.up();
    } else if (ev.keyCode === 83) {
        ev.preventDefault();
        //S
        bar_2.down();
    } else if (ev.keyCode == 32) {
        ev.preventDefault();
        board.playing = !board.playing;
    }

});

board_view.draw();

//Request Animation frame
window.requestAnimationFrame(controller);
setTimeout(function () {
    this.ball.direction = -1;
}, 4000); 

function controller() {

    board_view.play();

    //Actualizacion en tiempo real
    window.requestAnimationFrame(controller);



}
