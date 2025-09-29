from flask import Flask, render_template, request, jsonify
from solve import solve_sudoku

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/solve", methods=["POST"])
def solve():
    data = request.json
    grid = data.get("grid")
    if solve_sudoku(grid):
        return jsonify({"solution": grid})
    return jsonify({"error": "No solution exists"}), 400

if __name__ == "__main__":
    app.run(debug=True)
