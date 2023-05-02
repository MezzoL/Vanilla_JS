import GameObject from "./GameObject.js";

export default class Player extends GameObject {
    constructor(canvas) {
        super(canvas);
        this.type = GameObject.ObjectType.TEXTURE;
        this.state = GameObject.ObjectState.LOADING;
        this.loadResources();
    }

    getBoundingBox() {
        return [
            [this.x - this.size[0] / 2 - 5, this.y - this.size[1] / 2 - 5],
            [this.x + this.size[0] / 2 - 5, this.y + this.size[1] / 2 - 5]
        ];
    }

    loadResources() {
        this.image = new Image();
        this.image.addEventListener('load', function() {
            this.state = GameObject.ObjectState.READY;
        }.bind(this));
        this.image.addEventListener('error', function() {
            this.state = GameObject.ObjectState.ERROR;
        }.bind(this));

        this.image.src = './app/SkateboardGame/res/player.png';
    }
}