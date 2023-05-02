import Application from "../Application.js";

export default class Screensaver extends Application {
    init() {
        super.init();

        const canvasElem = document.createElement('canvas');
        window.addEventListener('resize', function() {
            // Update dims on window resize
            canvasElem.width = canvasElem.clientWidth;
            canvasElem.height = canvasElem.clientHeight;
            this.width = canvasElem.width;
            this.height = canvasElem.height;
        }.bind(this));
        this.target.appendChild(canvasElem);

        // Set up initial dimensions
        canvasElem.width = canvasElem.clientWidth;
        canvasElem.height = canvasElem.clientHeight;
        this.width = canvasElem.width;
        this.height = canvasElem.height;

        this.ctx = canvasElem.getContext('2d');
        this.ctx.strokeStyle = '#000000';

        this.shape = new BouncingCircle(this.ctx, 30);

        this.intervalKey = setInterval(this.update.bind(this), 16);

        this.render();
    }

    update() {
        this.shape.move(this.width, this.height);
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.beginPath();
        this.shape.draw();
        this.animationKey = requestAnimationFrame(this.render.bind(this));
    }

    destroy() {
        super.destroy();

        clearInterval(this.intervalKey);
        cancelAnimationFrame(this.animationKey);
    }
}

class BouncingCircle {
    constructor(ctx, radius) {
        this.ctx = ctx;
        this.radius = radius;

        this.x = 0;
        this.y = 0;
        this.dir = [1, 1];
    }

    move(canvasWidth, canvasHeight) {
        // Change direction, if needed
        if (this.x < 0 || this.x > canvasWidth) {
            this.dir[0] *= -1;
        }

        if (this.y < 0 || this.y > canvasHeight) {
            this.dir[1] *= -1;
        }

        this.x += 1 * this.dir[0];
        this.y += 1 * this.dir[1];
    }

    draw() {
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.stroke();
    }
}
