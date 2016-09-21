export class Piece {
    constructor (name, row, column, properIndex){
        this.name = name;
        this.row = row;
        this.column = column;
        this.properIndex = properIndex;
        this.actualIndex = properIndex;
        this.imageName = `${name}-${column}-${row}.png`
    }
}