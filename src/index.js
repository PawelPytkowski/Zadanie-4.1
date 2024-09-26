class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isMine = false;
        this.isRevealed = false;
    }

    render() {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.onclick = () => this.reveal();
        return cellElement;
    }

    reveal() {
        this.isRevealed = true;
        if (this.isMine) {
            alert('Przegrałeś!');
        }
    }
}

class Board {
    constructor(rows, cols, mines) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.cells = [];
        this.initialize();
    }

    initialize() {
        for (let r = 0; r < this.rows; r++) {
            const row = [];
            for (let c = 0; c < this.cols; c++) {
                row.push(new Cell(r, c));
            }
            this.cells.push(row);
        }
        this.placeMines();
    }

    placeMines() {
        let minesPlaced = 0;
        while (minesPlaced < this.mines) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);
            if (!this.cells[row][col].isMine) {
                this.cells[row][col].isMine = true;
                minesPlaced++;
            }
        }
    }

    render() {
        const boardElement = document.createElement('div');
        boardElement.className = 'board';
        this.cells.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.className = 'row';
            row.forEach(cell => {
                rowElement.appendChild(cell.render());
            });
            boardElement.appendChild(rowElement);
        });
        return boardElement;
    }
}

const app = document.getElementById('app');
const board = new Board(10, 10, 10);
app.appendChild(board.render());
