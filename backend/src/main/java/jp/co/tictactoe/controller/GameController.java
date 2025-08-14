package jp.co.tictactoe.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/game")
public class GameController {
    private char[][] board = new char[3][3];
    private char currentPlayer = 'X';
    @GetMapping("/board")
    public String[][] getBoard() {
        String[][] result = new String[3][3];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                result[i][j] = board[i][j] == '\0' ? "" : String.valueOf(board[i][j]);
            }
        }
        return result;
    }
    @PostMapping("/move")
    public String makeMove(@RequestParam int row, @RequestParam int col) {
        if(row < 0 || row > 2 || col < 0 || col > 2) {
            return "無効な行または列";
        }
        if (board[row][col] == '\0') {
            board[row][col] = currentPlayer;
            currentPlayer = (currentPlayer == 'X') ? 'O': 'X';
            String winner = checkWinner();
            
            return winner != null ? winner : "Move made";
        }
        return "Invalid move";
    }
    private String checkWinner() {
        for (int i = 0; i < 3; i++) {
            if (board[i][0] != '\0' && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
                return board[i][0] + " の勝利";
            }
            if (board[0][i] != '\0' && board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
                return board[0][i] + " の勝利";
            }
        }
        if (board[0][0] != '\0' && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
            return board[0][0] + " の勝利";
        }
        if (board[0][2] != '\0' && board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
            return board[0][2] + " の勝利";
        }
        return null;
    }
}
