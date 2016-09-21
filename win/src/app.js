export class App {
  router;

  configureRouter(config, router) {
      this.router = router;
      config.title = 'Picture Puzzle';
      config.options.pushState = true;
      config.map([
        { route: '', name: 'home', moduleId:'routes/home/home', nav:true,  title:'Home' },
        { route: 'game', name: 'game', moduleId:'routes/game/game', nav:true,  title:'Game' },
        { route: 'scores', name: 'scores', moduleId:'routes/scores/scores', nav:true,  title:'Scores' }
      ]);
      
    }
}
