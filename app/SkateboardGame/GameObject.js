export default class GameObject {
    static ObjectType = {
        VECTOR: 0,
        TEXTURE: 1
    };

    static ObjectState = {
        LOADING: 0,
        READY: 1,
        ERROR: 2
    };

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.x = 0;
        this.y = 0;
        this.size = [0, 0];

        this.type = GameObject.ObjectType.VECTOR;
        this.state = GameObject.ObjectState.READY;
    }

    spawn() {
        /*this.x = Math.max(
            Math.min(
                Math.floor(Math.random() * this.canvas.width),
                Math.floor(this.size[0] / 2)
            ),
            Math.floor(this.canvas.width - this.size[0] / 2)
        );*/

        const drawingArea = [this.canvas.width - this.size[0], this.canvas.height - this.size[1]];
        this.x = Math.floor(Math.random() * drawingArea[0] + this.size[0] / 2);
        this.y = Math.floor(Math.random() * drawingArea[1] + this.size[1] / 2);
    }

    move(deltaX = 0, deltaY = 0) {
        this.x += deltaX;
        this.y += deltaY;
    }

    draw() {
        switch (this.type) {
            case GameObject.ObjectType.TEXTURE:
                if (this.state === GameObject.ObjectState.READY) {
                    this.ctx.drawImage(this.image, this.x - this.size[0] / 2,
                        this.y - this.size[1], this.size[0], this.size[1]);
                }
                break;
            case GameObject.ObjectType.VECTOR:
                this.ctx.strokeStyle = '#000000';
                this.ctx.fillStyle = '#000000';
                this.ctx.fillRect(this.image, this.x - this.size[0] / 2,
                    this.y - this.size[1], this.size[0], this.size[1]);
                break;
        }
    }

    /**
     * Calculates and retuns the BBOX of this object in an array.
     * @returns {Array<Array<number>>} Top-left and bottom-right BBOX coordinates.
     */
    getBoundingBox() {
        return [
            [this.x - this.size[0] / 2, this.y - this.size[1] / 2],
            [this.x + this.size[0] / 2, this.y + this.size[1] / 2]
        ];
    }

    intersects(otherObj) {
        if (!(otherObj instanceof GameObject)) {
            throw new Error('Can only intersect between GameObject types.');
        }

        const bboxThis = this.getBoundingBox();
        const bboxOther = otherObj.getBoundingBox();

        const minX = bboxOther[0][0];
        const minY = bboxOther[0][1];
        const maxX = bboxOther[1][0];
        const maxY = bboxOther[1][1];

        if ((bboxThis[0][0] > minX && bboxThis[0][0] < maxX) ||
            (bboxThis[1][0] > minX && bboxThis[1][0] < maxX )) {
            
            if ((bboxThis[0][1] > minY && bboxThis[0][1] < maxY) ||
                (bboxThis[1][1] > minY && bboxThis[1][1] < maxY )) {

                return true;
            }
        }

        return false;
    }
}