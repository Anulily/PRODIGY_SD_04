document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("sudoku-grid");
    const solveBtn = document.getElementById("solveBtn");
    const resetBtn = document.getElementById("resetBtn");
    const message = document.getElementById("message");

    // Create Sudoku grid input fields
    for (let i = 0; i < 81; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 9;
        input.classList.add("cell");
        grid.appendChild(input);
    }

    function getGridValues() {
        const cells = document.querySelectorAll(".cell");
        let gridData = [];
        for (let i = 0; i < 9; i++) {
            gridData.push([]);
            for (let j = 0; j < 9; j++) {
                const value = cells[i * 9 + j].value;
                gridData[i].push(value ? parseInt(value) : 0);
            }
        }
        return gridData;
    }

    function fillGrid(solution) {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, i) => {
            const row = Math.floor(i / 9);
            const col = i % 9;
            cell.value = solution[row][col];
            cell.style.background = "#dfffe0";
            cell.style.transition = "background 0.5s ease";
        });
    }

    solveBtn.addEventListener("click", async () => {
        message.textContent = "Solving...";
        const gridData = getGridValues();

        const res = await fetch("/solve", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ grid: gridData })
        });

        const data = await res.json();
        if (res.ok) {
            message.textContent = "✅ Sudoku Solved!";
            fillGrid(data.solution);
        } else {
            message.textContent = "❌ No solution exists.";
        }
    });

    resetBtn.addEventListener("click", () => {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.value = "";
            cell.style.background = "white";
        });
        message.textContent = "";
    });
});
