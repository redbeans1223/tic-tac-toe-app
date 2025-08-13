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
                result[i][j] = String.valueOf(board[i][j]);
            }
        }
        return result;
    }
    @PostMapping("/move")
    public String makeMove(@RequestParam int row, @RequestParam int col) {
        if (board[row][col] == '\0') {
            board[row][col] = currentPlayer;
            currentPlayer = (currentPlayer == 'X') ? 'O': 'X';
            return "Move made";
        }
        return "Invalid move";
    }
}
