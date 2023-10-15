const PLAYER_SYMBOL   = 'x';
const OPPONENT_SYMBOL = 'o';

const PLAYER_WON      = 'Player won!';
const OPPONENT_WON    = 'Computer won!';

const ITS_A_TIE       = 'Nobody won, it\'s a tie!';
const INVALID_MOVE    = 'Invalid move!';

class TicTacToe {
    constructor(board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]) {
        this.board = board;
        this.moves         = 0;
        this.boardHTML     = document.querySelector('[data-board]');
        this.player        = PLAYER_SYMBOL;
        this.playerScore   = 0;
        this.opponent      = OPPONENT_SYMBOL;
        this.opponentScore = 0;
        this.opponentDelay = 500;
        this.resetDelay    = 250;
    }

    init() {
        this.boardHTML.addEventListener('click', event => {
            const { row, col } = event.target.dataset;

            this.playerMove(row, col);
        });
    }

    playerMove(row, col) {
        if (this.opponentThinking) {
            return;
        }

        if (this.board[row][col] !== null) {
            alert(INVALID_MOVE);
        }

        this.board[row][col] = this.player;
        this.moves++;
        this.renderBoard();
        this.checkWinner()

        if (this.matchDecided) {
            this.reset();
            return;
        }

        this.opponentThinking = true;
        setTimeout(() => {
            this.randomOpponentMove();
            this.opponentThinking = false;
        }, this.opponentDelay);
    }

    renderBoard() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                const selector = `[data-row="${i}"][data-col="${j}"]`;
                const htmlCell = this.boardHTML.querySelector(selector);
                
                htmlCell.innerHTML = this.board[i][j];
            }
        }
    }

    randomOpponentMove() {
        let row = 0;
        let col = 0;

        while (true) {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);

            if (this.board[row][col] === null) {
                this.board[row][col] = this.opponent;
                this.moves++;

                break;
            }
        }

        this.renderBoard();
        this.checkWinner();

        if (this.matchDecided) {
            this.reset();
        }
    }

    checkWinner() {
        // Check each row of the board
        this.board.forEach(row => {
            if (row.every(cell => cell === this.player)) {
                this.matchDecided = PLAYER_WON;
            } else if (row.every(cell => cell === this.opponent)) {
                this.matchDecided = OPPONENT_WON;
            }
        });

        // Check each column of the board
        for (let i = 0; i < this.board.length; i++) {
            if (this.board.every(row => row[i] === this.player)) {
                this.matchDecided = PLAYER_WON;
            } else if (this.board.every(row => row[i] === this.opponent)) {
                this.matchDecided = OPPONENT_WON;
            }
        }

        // Check \ diagonal of the board
        if (this.board[0][0] === this.player && 
            this.board[1][1] === this.player && 
            this.board[2][2] === this.player) {

            this.matchDecided = PLAYER_WON;
        } else if (this.board[0][0] === this.opponent && 
                   this.board[1][1] === this.opponent && 
                   this.board[2][2] === this.opponent) {

            this.matchDecided = OPPONENT_WON;
        }

        // Check / diagonal of the board
        if (this.board[0][2] === this.player && 
            this.board[1][1] === this.player && 
            this.board[2][0] === this.player) {

            this.matchDecided = PLAYER_WON;
        } else if (this.board[0][2] === this.opponent && 
                   this.board[1][1] === this.opponent && 
                   this.board[2][0] === this.opponent) {

            this.matchDecided = OPPONENT_WON;
        }

        // If no winner and all moves have been made, it's a tie
        if (this.moves === 9 && !this.matchDecided) {
            this.matchDecided = ITS_A_TIE;
        }
    }

    reset() {
        setTimeout(() => {
            alert(this.matchDecided);

            if (this.matchDecided === PLAYER_WON) {
                this.playerScore++;
            } else if (this.matchDecided === OPPONENT_WON) {
                this.opponentScore++;
            }
    
            this.board  = [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ];

            this.moves        = 0;
            this.matchDecided = '';
            this.renderBoard();
        }, this.resetDelay);
    }
}

const game = new TicTacToe();
game.init();