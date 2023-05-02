import Application from "../Application.js";
import Player from "./Player.js";

export default class SkateboardGame extends Application {
    init() {
        super.init();

        const canvasElem = document.createElement('canvas');
        canvasElem.style.backgroundColor = '#ffffff';
        this.canvas = canvasElem;
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

        this.player = new Player(canvasElem);
        this.player.size = [100, 150];
        this.player.spawn();
        this.obstacles = [];

        this.intervalKey = setInterval(this.update.bind(this), 50);

        this.render();
    }

    update() {
        for (let obs in this.obstacles) {
            obs.move(2);
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.beginPath();
        this.player.draw();
        for (let obs in this.obstacles) {
            obs.draw();
        }
        this.animationKey = requestAnimationFrame(this.render.bind(this));
    }

    destroy() {
        super.destroy();

        clearInterval(this.intervalKey);
        cancelAnimationFrame(this.animationKey);
    }
}
