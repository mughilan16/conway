class Conway {
    constructor() {
        this.matrix = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
            [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        this.container = document.querySelector("#container");
        this.ROW = 15;
        this.COL = 15;
        // Setting up event handlers
        this.tick();
    }

    tick() {
        for (let i = 0; i < this.ROW; i++) {
            for (let j = 0; j < this.COL; j++) {
                let count = this.countAliveNeighbour(i, j);
                if (this.matrix[i][j] == 1 && !(count == 2 || count == 3)) {
                    this.matrix[i][j] = false;
                }
                if (this.matrix[i][j] == 0 && count == 3) {
                    this.matrix[i][j] = true;
                }
            }
        }
        this.updateHTML();
    }
    updateHTML() {
        this.container.innerHTML = "";
        this.matrix.map((row, i) =>
            row.map((element, j) => {
                const div = document.createElement("div");
                div.onclick = () => this.elementClickHandler(i, j);
                div.classList.add("element");
                if (element == 1) div.classList.add("alive");
                else div.classList.add("dead");
                container.appendChild(div);
            }),
        );
    }

    elementClickHandler(x, y) {
        if (this.matrix[x][y] == 0) {
            this.matrix[x][y] = 1;
        } else {
            this.matrix[x][y] = 0;
        }
        this.updateHTML();
    }

    countAliveNeighbour(x, y) {
        let count = 0;
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (
                    (i == this.ROW && j == this.COL) ||
                    i < 0 ||
                    j < 0 ||
                    i >= this.ROW ||
                    j >= this.COL
                ) {
                    continue;
                }
                if (this.matrix[i][j] == 1) {
                    count++;
                }
            }
        }
        return count;
    }
    clear() {
        for (let i = 0; i < this.COL; i++) {
            for (let j = 0; j < this.ROW; j++) {
                this.matrix[i][j] = 0;
            }
        }
        this.updateHTML();
    }
}

class Interval {
    constructor(fn, duration) {
        this.isRunning = false;
        this.interval = null;
        this.fn = fn;
        this.duration = duration;
    }
    start() {
        if (this.isRunning === false) {
            this.interval = setInterval(this.fn, this.duration);
            this.isRunning = true;
        }
    }

    stop() {
        this.isRunning = false;
        clearInterval(this.interval);
    }

    next() {
        if (this.isRunning === false) {
            this.fn();
        }
    }
}
document.querySelector("#start").addEventListener("click", startHandler);
document.querySelector("#stop").addEventListener("click", stopHandler);
document.querySelector("#next").addEventListener("click", nextHandler);
document.querySelector("#clear").addEventListener("click", clearHandler);

const conway = new Conway();
const interval = new Interval(tick, 300);

function tick() {
    conway.tick();
}
function startHandler() {
    interval.start();
}
function stopHandler() {
    interval.stop();
}
function nextHandler() {
    interval.next();
}

function clearHandler() {
    conway.clear();
}
