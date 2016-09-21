import {inject} from 'aurelia-framework';
import {Score} from '../elements/score';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class GameComplete {
    score = new Score("",0);

    constructor(controller){
        this.controller = controller;
    }
    
    activate(score){
        this.score = score;
    }
}