import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Home {
    router;
    title;

    constructor(router){
        this.router = router;
        console.log("home::ctor::router %O",this.router);
    }

    activate(params, routeConfig){
        console.log("home::activate::routeConfig %O",routeConfig);
        this.title = routeConfig.navModel.title;
    }
}
