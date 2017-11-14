
class Canvas {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = canvas.getContext("2d");
    }
    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }
    color(col) {
        this.ctx.fillStyle = col;
    }
    fill(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    beginPath() {
        this.ctx.beginPath();
    }
    stroke() {
        this.ctx.fill();
    }
    circle(x, y, r) {
        this.ctx.ellipse(x, y, r, r, 0, 0, 2*Math.PI);
    }
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get magnitude() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    set magnitude(len) {
        let m = this.magnitude;
        if (m != 0) {
            this.x *= len/m;
            this.y *= len/m;
        }
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
    }
    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
    }
    static sum(a, b) {
        return new Vector(a.x + b.x, a.y + b.y);
    }
    static difference(a, b) {
        return new Vector(a.x - b.x, a.y - b.y);
    }
}

class Snake {
    constructor(x, y, length) {
        this.length = length;
        this.points = [];
        for (let i = 0; i < length; i ++) {
            this.points.push(new Vector(x, y + i * 5));
        }
    }
    draw(canvas) {
        canvas.color("red");
        for (let i = 0; i < this.length; i ++) {
            canvas.beginPath();
            canvas.circle(this.points[i].x, this.points[i].y, 5);
            canvas.stroke();
        }
    }
    moveTo(x, y) {
        this.points[0] = new Vector(x, y);
        for (let i = 1; i < this.length; i ++) {
            this.points[i] = Vector.difference(this.points[i], this.points[i-1]);
            this.points[i].magnitude = 5;
            this.points[i] = Vector.sum(this.points[i-1], this.points[i]);
        }
    }
}

function update() {
    c.fill("#333");
    s.draw(c);
    var q = Math.random() * 2 * Math.PI;
    if (Vector.difference(t, new Vector(300, 300)).magnitude < 300)
        var p = new Vector(Math.cos(q), Math.sin(q));
    else {
        var p = Vector.difference(new Vector(300, 300), t);
        p.magnitude = 1;
    }
    v.magnitude = 5;
    v.add(p);
    t.add(v);
    s.moveTo(t.x, t.y);
    s.draw(c);
    requestAnimationFrame(update);
}

var c = new Canvas("canvas");
var s = new Snake(50, 50, 10);
var t = new Vector(300, 300);
var v = new Vector(0, 0);
update();
