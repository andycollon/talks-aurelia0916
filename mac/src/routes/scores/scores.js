import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ScoreCounter} from '../../resources/score-counter';

@inject(Router, ScoreCounter)
export class Scores {
    router;
    title;

    constructor(router, scoreCounter){
        this.router = router;
        this.scoreCounter = scoreCounter;
    }

    activate(params, routeConfig){
        this.title = routeConfig.navModel.title;
    }
}