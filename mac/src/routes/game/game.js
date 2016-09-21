import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PicturePiecesCorrectEvent} from '../../resources/events';
import {Puzzle} from '../../resources/elements/puzzle/puzzle';
import {Score} from '../../resources/elements/score';
import {DialogService} from 'aurelia-dialog';
import {GameComplete} from '../../resources/dialogs/game-complete';
import {ScoreCounter} from '../../resources/score-counter';

@inject(Router,EventAggregator,Puzzle,DialogService,ScoreCounter)
export class Game {

    constructor(router, eventAggregator,puzzle, dialogService, scoreCounter){
        this.router = router;
        this.eventAggregator = eventAggregator;
        this.puzzle = puzzle;
        this.dialogService = dialogService;
        this.scoreCounter = scoreCounter;

        this.title = "";
        this.playerName = "";

        this.score = new Score(this.playerName,0);
    }

    activate(params, routeConfig){
        this.title = routeConfig.navModel.title;
    }

    attached(){
        this.subscriber = this.eventAggregator.subscribe(PicturePiecesCorrectEvent, evt => {
            this.grid.completeGame();
            console.log("GAME COMPLETED!");
            this.score.total = 100000 / (this.grid.secondsElapsed + this.grid.numberOfMoves);

            this.dialogService.open({ viewModel: GameComplete, model: this.score}).then(response => {
              if (!response.wasCancelled) {
                  this.score.playerName = response.output.playerName;
                  this.scoreCounter.scores.push(response.output);
                  console.log("response.output = %O",response.output);
              } 
            });
        });
    }

    detached(){
        this.subscriber.dispose();
    }
}
