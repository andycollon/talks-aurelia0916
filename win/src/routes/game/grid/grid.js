import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {DragAndDrop} from '../../../resources/drag-and-drop';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PicturePiecePositionChangedEvent} from '../../../resources/events';

@inject(DragAndDrop,EventAggregator)
export class Grid {
    @bindable puzzle;

    constructor(dragAndDrop,eventAggregator){
        this.dragAndDrop = dragAndDrop;
        this.dragAndDrop.disabled = false;
        this.eventAggregator = eventAggregator;
        this.numberOfMoves = 0;
        this.secondsElapsed = 0;
        this.gameCompleted = false;

        setInterval(() => {if (!this.gameCompleted) this.secondsElapsed++;}, 1000);
    }

    completeGame(){
        this.gameCompleted = true;
        this.dragAndDrop.disabled = true;
    }

    attached(){
        this.subscriber = this.eventAggregator.subscribe(PicturePiecePositionChangedEvent, changed => {
            this.puzzle.movePieces(changed.from,changed.to);
            this.numberOfMoves++;
        });
    }

    detached(){
        this.subscriber.dispose();
    }
}
