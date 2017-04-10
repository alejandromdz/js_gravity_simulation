
var system = (function () {

    var Vector = function (x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.getLength = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    Vector.prototype.getUnitaryVector = function () {
        return {
            x: this.x / this.getLength(),
            y: this.y / this.getLength()
        }
    }

    var timer;
    var particles = [];

    var add = function (id, m, v, p) {
        var element = document.getElementById(id);
        element.cx.baseVal.value = p.x;
        element.cy.baseVal.value = p.y;
        particles.push({
            element: element,
            m: m,
            v: v,
            p: p
        })
    }
    var init = function () {
        timer = setInterval(function () {
            for (let i = 0; i < particles.length; i++) {
                var particle = particles[i];
                var element = particle.element;
                var m = particle.m
                var F = new Vector(0, 0)
                for (let j = 0; j < particles.length; j++) {
                    if (i !== j) {
                        var dx=particles[j].element.cx.baseVal.value - element.cx.baseVal.value;
                        var dy=particles[j].element.cy.baseVal.value - element.cy.baseVal.value;
                        var d = new Vector(dx,dy)
                        var distance = d.getLength();
                        var u = d.getUnitaryVector();

                        F.x += (0.01 * m * particles[j].m) * u.x / (distance * distance)
                        F.y += (0.01 * m * particles[j].m) * u.y / (distance * distance)

                    }
                }
                var a = new Vector(F.x / m, F.y / m)

                particle.v.x += a.x;
                particle.v.y += a.y;
                element.cx.baseVal.value += particle.v.x;
                element.cy.baseVal.value += particle.v.y;
            }

        }, 50);
    }
    var stop = function () {
        clearInterval(timer);
    }
    return {
        add: add,
        init: init
    }

})()

system.add('particle_1', 100, { x: 0.005, y: 0.005 }, { x: 44, y: 20 })
system.add('particle_2', 10, { x: -0.1, y: 0.10 }, { x: 71, y: 35 })
system.init()
