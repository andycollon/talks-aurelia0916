import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PicturePiecesCorrectEvent} from '../../events';
import {Picture} from '../picture/picture';

@inject(EventAggregator)
export class Puzzle{

    constructor(aggregator){
        this.eventAggregator = aggregator;
        this.picture = new Picture("aurelia_logo",3,3);
    }

    movePieces(from = -1,to = -1){

        if (from < 0 && to < 0) return;
        
        if (from > -1){
            from = this.picture.pieces.map(m => m.actualIndex).indexOf(parseInt(from,10));
        }
        
        if (to > -1){
            to = this.picture.pieces.map(m => m.actualIndex).indexOf(parseInt(to,10));
        }
        
        if (to === -1){
            to = this.picture.pieces.length - 1;
        } else if (to > 0 && to > from) {
            to = to -1;
        }

        this.picture.movePieces(from,to);

        if (this.picture.picturePiecesComplete()){
            this.eventAggregator.publish(new PicturePiecesCorrectEvent());
        }
    }
}
