/**
 * 
 * Welcome to Tic Tac Toe!
 * 
 * A typical game could look like this:
 * 
 * init()               -> 
 * 
 * playerMove()         -> 
 * renderBoard()        ->
 * checkWinner()        -> No winner found
 * 
 * randomOpponentMove() -> 
 * renderBoard()        ->
 * checkWinner()        -> No winner found
 * 
 * playerMove()         -> 
 * renderBoard()        ->
 * checkWinner()        -> No winner found
 * 
 * randomOpponentMove() -> 
 * renderBoard()        ->
 * checkWinner()        -> No winner found
 * 
 * playerMove()         -> 
 * renderBoard()        ->
 * checkWinner()        -> Winner found!
 * 
 * reset()
 * 
 *  
 */

const PLAYER_SYMBOL   = 'x';
const OPPONENT_SYMBOL = 'o';

const PLAYER_WON      = 'Player won!';
const OPPONENT_WON    = 'Computer won!';

const ITS_A_TIE       = 'Nobody won, it\'s a tie!';
const INVALID_MOVE    = 'Invalid move!';

class TicTacToe {
    // You can pass in a board state when constructing a new instance
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
        this.renderBoard();

        // When a cell is clicked, call playerMove() with the cell's row and column
        this.boardHTML.addEventListener('click', event => {
            const { row, col } = event.target.dataset;

            this.playerMove(row, col);
        });
    }

    playerMove(row, col) {
        // Don't allow player move if the opponent is "thinking" about theirs
        if (this.opponentThinking) {
            return;
        }

        // Only allow moves on empty cells
        if (this.board[row][col] !== null) {
            alert(INVALID_MOVE);
        }

        this.board[row][col] = this.player;
        this.moves++;
        this.renderBoard();
        this.checkWinner()

        // If the match is decided, reset and stop the function from continuing
        if (this.matchDecided) {
            this.reset();
            return;
        }

        // setTimeout to simulate opponent thinking...
        this.opponentThinking = true;
        setTimeout(() => {
            this.randomOpponentMove();
            this.opponentThinking = false;
        }, this.opponentDelay);
    }

    // Takes this.board and "prints" it to the DOM
    renderBoard() {
        // For each row in the board (i)... 
        for (let i = 0; i < this.board.length; i++) {
            // For each cell in the row (j)...
            for (let j = 0; j < this.board[i].length; j++) {
                // Find the HTML cell that corresponds to the current board cell
                const selector = `[data-row="${i}"][data-col="${j}"]`;
                const htmlCell = this.boardHTML.querySelector(selector);
                
                // Set the HTML cell's text to the current board cell's value
                htmlCell.innerHTML = this.board[i][j];
            }
        }
    }

    // Picks a random empty cell and sets it to the opponent's symbol
    randomOpponentMove() {
        let row = 0;
        let col = 0;

        // Loop until an empty cell is found
        while (true) {
            // Pick a random row and column
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);

            // If the cell is empty, set it to the opponent's symbol and break
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

    // Checks if the match has been decided
    checkWinner() {
        // Check each row of the board
        for (const row of this.board) {
            if (row.every(cell => cell === this.player)) {
                this.matchDecided = PLAYER_WON;
            } else if (row.every(cell => cell === this.opponent)) {
                this.matchDecided = OPPONENT_WON;
            }
        };

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

    // Reset the board to its initial state
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

/**
 * 
 * You can also pass in a starting board state if you wish. For example:
 * 
const game = new TicTacToe([   
    [PLAYER_SYMBOL, null, OPPONENT_SYMBOL],
    [PLAYER_SYMBOL, null, OPPONENT_SYMBOL],
    [null, null, null]
]);
 * 
 */

const game = new TicTacToe();

game.init();