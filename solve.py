def find_empty(grid):
    for i in range(9):
        for j in range(9):
            if grid[i][j] == 0:
                return i, j
    return None

def is_valid(grid, num, pos):
    row, col = pos
    if num in grid[row]:
        return False
    for i in range(9):
        if grid[i][col] == num:
            return False
    box_row, box_col = (row // 3) * 3, (col // 3) * 3
    for i in range(box_row, box_row + 3):
        for j in range(box_col, box_col + 3):
            if grid[i][j] == num:
                return False
    return True

def solve_sudoku(grid):
    empty = find_empty(grid)
    if not empty:
        return True
    row, col = empty
    for num in range(1, 10):
        if is_valid(grid, num, (row, col)):
            grid[row][col] = num
            if solve_sudoku(grid):
                return True
            grid[row][col] = 0
    return False
