import {Piece} from './piece';

export class Picture {
    constructor (name, rows, columns){

        this.name = name;
        this.rows = rows;
        this.columns = columns;
        this.pieces = [];
        this.numberOfCorrectPieces = 9;

        this.mainImage = `${name}.png`;

        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < columns; j++){
                console.log("working out the properIndex i %O j %O rows %O properIndex %O",i,j,this.rows,(i*this.rows)+j)
                this.pieces.push(new Piece(name,i,j,(i*this.rows)+j));
            }
        }

        this.shufflePieces();
    }

    shufflePieces(){
        let i = 0
        , j = 0
        , temp = null

        for (i = this.pieces.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = this.pieces[i]
            this.pieces[i] = this.pieces[j]
            this.pieces[j] = temp
        }

        this.indexPieces();
    }

    movePieces(from,to){
        this.arraymove(this.pieces,from,to);
        this.indexPieces();
    }

    indexPieces(){
        this.numberOfCorrectPieces = 0;
        this.pieces.map((p,i) => p.actualIndex = i);
        this.numberOfCorrectPieces = this.pieces.filter(p => p.actualIndex == p.properIndex).length;
    }

    picturePiecesComplete() {
        //return true;
        return this.numberOfCorrectPieces === this.pieces.length;
    }

    arraymove(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }
}
