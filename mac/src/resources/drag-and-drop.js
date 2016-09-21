import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PicturePiecePositionChangedEvent} from './events';

import dragula from 'dragula';

@inject(EventAggregator)
export class DragAndDrop {
    disabled = false;

	constructor(eventAggregator) {

        this.eventAggregator = eventAggregator;
        
		let drake = dragula({
            
			isContainer: el => {
                
                if (this.disabled){
                    return false;
                }

                if (!el){
                    return false;
                }
                
				return el.classList.contains('drag-and-drop-source');
            },
			revertOnSpill: true
		});
        
		this.trackDrop(drake);
	}

	trackDrop(drake) {
		drake.on('drop', (el, target, source, sibling) => {

            let from = -1;
            let to = -1;
            
            if (el){
                from = el.attributes["data-actual-index"].value;
            }

            if (sibling){
                to = sibling.attributes["data-actual-index"].value;
            }

            this.eventAggregator.publish(new PicturePiecePositionChangedEvent(from, to));
			drake.cancel();
		});
	}
}

