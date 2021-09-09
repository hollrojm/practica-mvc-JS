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
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3
        this.board = board;
        this.direction = 1;
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI / 12;
        this.speed = 3.0;

        board.ball = this;
        this.kind = "circle";


    }
    //Metodo para definir moviento y colisión de pelota.
    self.Ball.prototype = {
        move: function () {
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y);

        },
        get width() {
            return this.radius * 2;
        },
        get height() {
            return this.radius * 2;
        },
        collision: function (bar) {
            //Reacciona a la colisión con una barra que recibe como parametro
            var relative_intersect_y = (bar.y + (bar.height / 2)) - this.y;

            var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

            this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

            //Calcula velocidad tanto x como en y
            this.speed_y = this.speed * -Math.sin(this.bounce_angle);
            this.speed_x = this.speed * Math.cos(this.bounce_angle);

            //Cambiar la direccion según la posicion de la barra
            if (this.x > (this.board.width / 2)) {
                this.direction = -1;
                this.speed += 0.2;
            } else {
                this.direction = 1;
                this.speed += 0.2;
            }

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
            console.log("hola mundo");
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
            this.ctx.clearRect(0, 0, this.board.width, this.board.height,);

        },
        //Validar
        draw: function () {
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var drawElement = this.board.elements[i];

                draw(this.ctx, drawElement);

            };
        },
        check_collisions: function () {
            scoreOne = document.querySelector(".scoreOne");
            scoreTwo = document.querySelector(".scoreTwo");

            //iterar las barras
            for (var i = this.board.bars.length - 1; i >= 0; i--) {
                var bar = this.board.bars[i];
                if (hit(bar, this.board.ball)) {
                    this.board.ball.collision(bar);
                }
            }
            if (this.board.ball.y <= 10) {
                this.board.ball.speed_y = this.board.ball.speed_y * -1;
            }
            else if (this.board.ball.y >= 390) {
                this.board.ball.speed_y = this.board.ball.speed_y * -1;
            }
            if (this.board.ball.x <= -15) {

                board.playing = !board.playing;
                this.board.ball.x = 350;
                this.board.ball.y = 150;
                this.board.bars.y = 100;
                swal({
                    title: "punto para el jugador 2",
                    icon: "success",
                    button: "Continuar",
                  });
                this.board.ball.speed = 3;
                board_view.draw();
                this.board.ball.speed_x = this.board.ball.speed_x * -1;
                scoreTwo.innerHTML =(Number(scoreTwo.innerHTML) + 1);

            }
            if (this.board.ball.x >= 815) {
                
                board.playing = !board.playing;
                this.board.ball.x = 350;
                this.board.ball.y = 150;
                //this.board.bar.y = 100;
                swal({
                    title: "punto para el jugador 1",
                    icon: "success",
                    button: "Continuar",
                  });
                this.board.ball.speed = 3;
                board_view.draw();
                this.board.ball.speed_x = this.board.ball.speed_x * -1;
                scoreOne.innerHTML = (Number(scoreOne.innerHTML) + 1);
            }

        },
        play: function () {
            if (this.board.playing) {
                //Limpiar Board
                this.clean();
                //Dibujar Board 
                this.draw();
                //Colisión
                this.check_collisions();
                //Movimiento de la pelota
                this.board.ball.move();
            }

        }
    }

    function hit(a, b) {
        //Revisa si a colisiona con b.
        var hit = false;
        //Colisiones horizontales
        if (b.x + b.width >= a.x && b.x < a.x + a.width) {
            //Colisiones verticales
            if (b.y + b.height >= a.y && b.y < a.y + a.height)
                hit = true;
        }
        //Colisión de a con b
        if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
            if (b.y <= a.y && b.y + b.height >= a.y + a.height)
                hit = true;
        }
        //Colisión de b con a
        if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
            if (a.y <= b.y && a.y + a.height >= b.y + b.height)
                hit = true;
        }
        return hit;


    }

    //Dibujar elementos
    function draw(ctx, element) {
        //Validar si el objeto a dibujar tiene una propiedad kind
        //background(220);
        switch (element.kind) {
            case "rectangle":
                ctx.fillStyle = "white";
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
            case "circle":
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.arc(element.x, element.y, element.radius, 0, 7);
                ctx.fill();
                ctx.closePath();
                break;
        }
    }

})();
// 
var board = new Board(800, 400);
var bar = new Bar(10, 100, 20, 100, board);
var bar_2 = new Bar(770, 100, 20, 100, board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas, board);
var ball = new Ball(350, 100, 10, board);




//Funcion de moviento de barras
document.addEventListener("keydown", function (ev) {
    //cancelar movimiento en el navegador

    if (ev.keyCode == 87) {
        ev.preventDefault();
        bar.up();
    } else if (ev.keyCode == 83) {
        ev.preventDefault();
        bar.down();

        //Asignacion de teclas a la barra numero 2 (S,W)
    } else if (ev.keyCode == 38) {
        ev.preventDefault();
        //W
        bar_2.up();

    } else if (ev.keyCode == 40) {
        ev.preventDefault();
        //S
        bar_2.down();

    } else if (ev.keyCode == 32) {
        //Pausa con SpaceBar
        ev.preventDefault();
        board.playing = !board.playing;
    }

});

board_view.draw();

//Request Animation frame
window.requestAnimationFrame(controller);



function controller() {

    board_view.play();

    //Actualizacion en tiempo real
    window.requestAnimationFrame(controller);


}
