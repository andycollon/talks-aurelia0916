export class PicturePiecePositionChangedEvent {
    
    from = 0;
    to = 0;

    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
}

export class PicturePiecesCorrectEvent {}