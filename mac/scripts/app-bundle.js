define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'Picture Puzzle';
      config.options.pushState = true;
      config.map([{ route: '', name: 'home', moduleId: 'routes/home/home', nav: true, title: 'Home' }, { route: 'game', name: 'game', moduleId: 'routes/game/game', nav: true, title: 'Game' }, { route: 'scores', name: 'scores', moduleId: 'routes/scores/scores', nav: true, title: 'Scores' }]);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-dialog', function (config) {
      config.useDefaults();
      config.settings.lock = false;
    });

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/drag-and-drop',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './events', 'dragula'], function (exports, _aureliaFramework, _aureliaEventAggregator, _events, _dragula) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DragAndDrop = undefined;

    var _dragula2 = _interopRequireDefault(_dragula);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var DragAndDrop = exports.DragAndDrop = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function DragAndDrop(eventAggregator) {
            var _this = this;

            _classCallCheck(this, DragAndDrop);

            this.disabled = false;


            this.eventAggregator = eventAggregator;

            var drake = (0, _dragula2.default)({

                isContainer: function isContainer(el) {

                    if (_this.disabled) {
                        return false;
                    }

                    if (!el) {
                        return false;
                    }

                    return el.classList.contains('drag-and-drop-source');
                },
                revertOnSpill: true
            });

            this.trackDrop(drake);
        }

        DragAndDrop.prototype.trackDrop = function trackDrop(drake) {
            var _this2 = this;

            drake.on('drop', function (el, target, source, sibling) {

                var from = -1;
                var to = -1;

                if (el) {
                    from = el.attributes["data-actual-index"].value;
                    console.log('drag cancelled from ' + from);
                }

                if (sibling) {
                    to = sibling.attributes["data-actual-index"].value;
                    console.log('drag cancelled to ' + to);
                }

                _this2.eventAggregator.publish(new _events.PicturePiecePositionChangedEvent(from, to));
                drake.cancel();
            });
        };

        return DragAndDrop;
    }()) || _class);
});
define('resources/events',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var PicturePiecePositionChangedEvent = exports.PicturePiecePositionChangedEvent = function PicturePiecePositionChangedEvent(from, to) {
        _classCallCheck(this, PicturePiecePositionChangedEvent);

        this.from = 0;
        this.to = 0;

        this.from = from;
        this.to = to;
    };

    var PicturePiecesCorrectEvent = exports.PicturePiecesCorrectEvent = function PicturePiecesCorrectEvent() {
        _classCallCheck(this, PicturePiecesCorrectEvent);
    };
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['resources/elements/nav-bar.html', 'resources/elements/picture/piece-view.html']);
  }
});
define('resources/dialogs/game-complete',['exports', 'aurelia-framework', '../elements/score', 'aurelia-dialog'], function (exports, _aureliaFramework, _score, _aureliaDialog) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.GameComplete = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var GameComplete = exports.GameComplete = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
        function GameComplete(controller) {
            _classCallCheck(this, GameComplete);

            this.score = new _score.Score("", 0);

            this.controller = controller;
        }

        GameComplete.prototype.activate = function activate(score) {
            this.score = score;
        };

        return GameComplete;
    }()) || _class);
});
define('resources/elements/score',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Score = exports.Score = function Score(playerName, total) {
        _classCallCheck(this, Score);

        this.playerName = "";
        this.total = 0;

        this.playerName = playerName;
        this.total = total;
    };
});
define('routes/game/game',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-event-aggregator', '../../resources/events', '../../resources/elements/puzzle/puzzle', '../../resources/elements/score', 'aurelia-dialog', '../../resources/dialogs/game-complete', '../../resources/score-counter'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaEventAggregator, _events, _puzzle, _score, _aureliaDialog, _gameComplete, _scoreCounter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Game = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Game = exports.Game = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaEventAggregator.EventAggregator, _puzzle.Puzzle, _aureliaDialog.DialogService, _scoreCounter.ScoreCounter), _dec(_class = function () {
        function Game(router, eventAggregator, puzzle, dialogService, scoreCounter) {
            _classCallCheck(this, Game);

            this.router = router;
            this.eventAggregator = eventAggregator;
            this.puzzle = puzzle;
            this.dialogService = dialogService;
            this.scoreCounter = scoreCounter;

            this.title = "";
            this.playerName = "";

            this.score = new _score.Score(this.playerName, 0);
        }

        Game.prototype.activate = function activate(params, routeConfig) {
            this.title = routeConfig.navModel.title;
        };

        Game.prototype.attached = function attached() {
            var _this = this;

            this.subscriber = this.eventAggregator.subscribe(_events.PicturePiecesCorrectEvent, function (evt) {
                _this.grid.completeGame();
                console.log("GAME COMPLETED!");

                _this.dialogService.open({ viewModel: _gameComplete.GameComplete, model: _this.score }).then(function (response) {
                    if (!response.wasCancelled) {
                        _this.score.playerName = response.output.playerName;
                        _this.scoreCounter.scores.push(response.output);
                        console.log("response.output = %O", response.output);
                    }
                });
            });
        };

        Game.prototype.detached = function detached() {
            this.subscriber.dispose();
        };

        return Game;
    }()) || _class);
});
define('routes/home/home',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
        function Home(router) {
            _classCallCheck(this, Home);

            this.router = router;
            console.log("home::ctor::router %O", this.router);
        }

        Home.prototype.activate = function activate(params, routeConfig) {
            console.log("home::activate::routeConfig %O", routeConfig);
            this.title = routeConfig.navModel.title;
        };

        return Home;
    }()) || _class);
});
define('routes/scores/scores',['exports', 'aurelia-framework', 'aurelia-router', '../../resources/score-counter'], function (exports, _aureliaFramework, _aureliaRouter, _scoreCounter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Scores = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Scores = exports.Scores = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _scoreCounter.ScoreCounter), _dec(_class = function () {
        function Scores(router, scoreCounter) {
            _classCallCheck(this, Scores);

            this.router = router;
            this.scoreCounter = scoreCounter;
        }

        Scores.prototype.activate = function activate(params, routeConfig) {
            this.title = routeConfig.navModel.title;
        };

        return Scores;
    }()) || _class);
});
define('resources/elements/game-state/game-state',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var GameState = exports.GameState = function GameState() {
        _classCallCheck(this, GameState);

        this.numberOfSeconds = 10;
        this.numberOfMoves = 0;
        this.scores = [{ name: "andy", score: 123 }, { name: "spencer", score: 500 }];
        this.currentPlayer = "andy";
    };
});
define('resources/elements/picture/picture',["exports", "./piece"], function (exports, _piece) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Picture = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Picture = exports.Picture = function () {
        function Picture(name, rows, columns) {
            _classCallCheck(this, Picture);

            this.name = name;
            this.rows = rows;
            this.columns = columns;
            this.pieces = [];
            this.numberOfCorrectPieces = 9;

            this.mainImage = name + ".png";

            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < columns; j++) {
                    console.log("working out the properIndex i %O j %O rows %O properIndex %O", i, j, this.rows, i * this.rows + j);
                    this.pieces.push(new _piece.Piece(name, i, j, i * this.rows + j));
                }
            }

            this.shufflePieces();
        }

        Picture.prototype.shufflePieces = function shufflePieces() {
            var i = 0,
                j = 0,
                temp = null;

            for (i = this.pieces.length - 1; i > 0; i -= 1) {
                j = Math.floor(Math.random() * (i + 1));
                temp = this.pieces[i];
                this.pieces[i] = this.pieces[j];
                this.pieces[j] = temp;
            }

            this.indexPieces();
        };

        Picture.prototype.movePieces = function movePieces(from, to) {
            this.arraymove(this.pieces, from, to);
            this.indexPieces();
        };

        Picture.prototype.indexPieces = function indexPieces() {
            this.numberOfCorrectPieces = 0;
            this.pieces.map(function (p, i) {
                return p.actualIndex = i;
            });
            this.numberOfCorrectPieces = this.pieces.filter(function (p) {
                return p.actualIndex == p.properIndex;
            }).length;
        };

        Picture.prototype.picturePiecesComplete = function picturePiecesComplete() {
            return true;
        };

        Picture.prototype.arraymove = function arraymove(arr, fromIndex, toIndex) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        };

        return Picture;
    }();
});
define('resources/elements/picture/piece',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Piece = exports.Piece = function Piece(name, row, column, properIndex) {
        _classCallCheck(this, Piece);

        this.name = name;
        this.row = row;
        this.column = column;
        this.properIndex = properIndex;
        this.actualIndex = properIndex;
        this.imageName = name + "-" + column + "-" + row + ".png";

        console.log("created a piece %O", this);
    };
});
define('routes/game/aside/aside',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Aside = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

    var Aside = exports.Aside = (_class = function Aside() {
        _classCallCheck(this, Aside);

        _initDefineProp(this, 'numberOfMoves', _descriptor, this);

        _initDefineProp(this, 'picture', _descriptor2, this);

        _initDefineProp(this, 'secondsElapsed', _descriptor3, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'numberOfMoves', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'picture', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'secondsElapsed', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('routes/game/grid/grid',['exports', 'aurelia-framework', '../../../resources/drag-and-drop', 'aurelia-event-aggregator', '../../../resources/events'], function (exports, _aureliaFramework, _dragAndDrop, _aureliaEventAggregator, _events) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Grid = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var Grid = exports.Grid = (_dec = (0, _aureliaFramework.inject)(_dragAndDrop.DragAndDrop, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function Grid(dragAndDrop, eventAggregator) {
            var _this = this;

            _classCallCheck(this, Grid);

            _initDefineProp(this, 'puzzle', _descriptor, this);

            this.dragAndDrop = dragAndDrop;
            this.dragAndDrop.disabled = false;
            this.eventAggregator = eventAggregator;
            this.numberOfMoves = 0;
            this.secondsElapsed = 0;
            this.gameCompleted = false;

            setInterval(function () {
                if (!_this.gameCompleted) _this.secondsElapsed++;
            }, 1000);
        }

        Grid.prototype.completeGame = function completeGame() {
            this.gameCompleted = true;
            this.dragAndDrop.disabled = true;
        };

        Grid.prototype.attached = function attached() {
            var _this2 = this;

            this.subscriber = this.eventAggregator.subscribe(_events.PicturePiecePositionChangedEvent, function (changed) {
                _this2.puzzle.movePieces(changed.from, changed.to);
                _this2.numberOfMoves++;
            });
        };

        Grid.prototype.detached = function detached() {
            this.subscriber.dispose();
        };

        return Grid;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'puzzle', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('aurelia-dialog/ai-dialog',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialog = undefined;

  

  var _dec, _dec2, _class;

  var AiDialog = exports.AiDialog = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n  </template>\n'), _dec(_class = _dec2(_class = function AiDialog() {
    
  }) || _class) || _class);
});
define('aurelia-dialog/ai-dialog-header',['exports', 'aurelia-templating', './dialog-controller'], function (exports, _aureliaTemplating, _dialogController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogHeader = undefined;

  

  var _dec, _dec2, _class, _class2, _temp;

  var AiDialogHeader = exports.AiDialogHeader = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-header'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <button type="button" class="dialog-close" aria-label="Close" if.bind="!controller.settings.lock" click.trigger="controller.cancel()">\n      <span aria-hidden="true">&times;</span>\n    </button>\n\n    <div class="dialog-header-content">\n      <slot></slot>\n    </div>\n  </template>\n'), _dec(_class = _dec2(_class = (_temp = _class2 = function AiDialogHeader(controller) {
    

    this.controller = controller;
  }, _class2.inject = [_dialogController.DialogController], _temp)) || _class) || _class);
});
define('aurelia-dialog/dialog-controller',['exports', './lifecycle', './dialog-result'], function (exports, _lifecycle, _dialogResult) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogController = undefined;

  

  var DialogController = exports.DialogController = function () {
    function DialogController(renderer, settings, resolve, reject) {
      

      this.renderer = renderer;
      this.settings = settings;
      this._resolve = resolve;
      this._reject = reject;
    }

    DialogController.prototype.ok = function ok(output) {
      return this.close(true, output);
    };

    DialogController.prototype.cancel = function cancel(output) {
      return this.close(false, output);
    };

    DialogController.prototype.error = function error(message) {
      var _this = this;

      return (0, _lifecycle.invokeLifecycle)(this.viewModel, 'deactivate').then(function () {
        return _this.renderer.hideDialog(_this);
      }).then(function () {
        _this.controller.unbind();
        _this._reject(message);
      });
    };

    DialogController.prototype.close = function close(ok, output) {
      var _this2 = this;

      if (this._closePromise) return this._closePromise;

      this._closePromise = (0, _lifecycle.invokeLifecycle)(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
        if (canDeactivate) {
          return (0, _lifecycle.invokeLifecycle)(_this2.viewModel, 'deactivate').then(function () {
            return _this2.renderer.hideDialog(_this2);
          }).then(function () {
            var result = new _dialogResult.DialogResult(!ok, output);
            _this2.controller.unbind();
            _this2._resolve(result);
            return result;
          });
        }

        return Promise.resolve();
      });

      return this._closePromise;
    };

    return DialogController;
  }();
});
define('aurelia-dialog/lifecycle',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.invokeLifecycle = invokeLifecycle;
  function invokeLifecycle(instance, name, model) {
    if (typeof instance[name] === 'function') {
      var result = instance[name](model);

      if (result instanceof Promise) {
        return result;
      }

      if (result !== null && result !== undefined) {
        return Promise.resolve(result);
      }

      return Promise.resolve(true);
    }

    return Promise.resolve(true);
  }
});
define('aurelia-dialog/dialog-result',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var DialogResult = exports.DialogResult = function DialogResult(cancelled, output) {
    

    this.wasCancelled = false;

    this.wasCancelled = cancelled;
    this.output = output;
  };
});
define('aurelia-dialog/ai-dialog-body',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogBody = undefined;

  

  var _dec, _dec2, _class;

  var AiDialogBody = exports.AiDialogBody = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-body'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n  </template>\n'), _dec(_class = _dec2(_class = function AiDialogBody() {
    
  }) || _class) || _class);
});
define('aurelia-dialog/ai-dialog-footer',['exports', 'aurelia-templating', './dialog-controller'], function (exports, _aureliaTemplating, _dialogController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogFooter = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _class3, _temp;

  var AiDialogFooter = exports.AiDialogFooter = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-footer'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n\n    <template if.bind="buttons.length > 0">\n      <button type="button" class="btn btn-default" repeat.for="button of buttons" click.trigger="close(button)">${button}</button>\n    </template>\n  </template>\n'), _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
    function AiDialogFooter(controller) {
      

      _initDefineProp(this, 'buttons', _descriptor, this);

      _initDefineProp(this, 'useDefaultButtons', _descriptor2, this);

      this.controller = controller;
    }

    AiDialogFooter.prototype.close = function close(buttonValue) {
      if (AiDialogFooter.isCancelButton(buttonValue)) {
        this.controller.cancel(buttonValue);
      } else {
        this.controller.ok(buttonValue);
      }
    };

    AiDialogFooter.prototype.useDefaultButtonsChanged = function useDefaultButtonsChanged(newValue) {
      if (newValue) {
        this.buttons = ['Cancel', 'Ok'];
      }
    };

    AiDialogFooter.isCancelButton = function isCancelButton(value) {
      return value === 'Cancel';
    };

    return AiDialogFooter;
  }(), _class3.inject = [_dialogController.DialogController], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'buttons', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return [];
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'useDefaultButtons', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class) || _class);
});
define('aurelia-dialog/attach-focus',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AttachFocus = undefined;

  

  var _dec, _class, _class2, _temp;

  var AttachFocus = exports.AttachFocus = (_dec = (0, _aureliaTemplating.customAttribute)('attach-focus'), _dec(_class = (_temp = _class2 = function () {
    function AttachFocus(element) {
      

      this.value = true;

      this.element = element;
    }

    AttachFocus.prototype.attached = function attached() {
      if (this.value && this.value !== 'false') {
        this.element.focus();
      }
    };

    AttachFocus.prototype.valueChanged = function valueChanged(newValue) {
      this.value = newValue;
    };

    return AttachFocus;
  }(), _class2.inject = [Element], _temp)) || _class);
});
define('aurelia-dialog/dialog-configuration',['exports', './renderer', './dialog-renderer', './dialog-options', 'aurelia-pal'], function (exports, _renderer, _dialogRenderer, _dialogOptions, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogConfiguration = undefined;

  

  var defaultRenderer = _dialogRenderer.DialogRenderer;

  var resources = {
    'ai-dialog': './ai-dialog',
    'ai-dialog-header': './ai-dialog-header',
    'ai-dialog-body': './ai-dialog-body',
    'ai-dialog-footer': './ai-dialog-footer',
    'attach-focus': './attach-focus'
  };

  var defaultCSSText = 'ai-dialog-container,ai-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0}ai-dialog,ai-dialog-container>div>div{min-width:300px;margin:auto;display:block}ai-dialog-overlay{opacity:0}ai-dialog-overlay.active{opacity:1}ai-dialog-container{display:block;transition:opacity .2s linear;opacity:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}ai-dialog-container.active{opacity:1}ai-dialog-container>div{padding:30px}ai-dialog-container>div>div{width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content}ai-dialog-container,ai-dialog-container>div,ai-dialog-container>div>div{outline:0}ai-dialog{box-shadow:0 5px 15px rgba(0,0,0,.5);border:1px solid rgba(0,0,0,.2);border-radius:5px;padding:3;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;background:#fff}ai-dialog>ai-dialog-header{display:block;padding:16px;border-bottom:1px solid #e5e5e5}ai-dialog>ai-dialog-header>button{float:right;border:none;display:block;width:32px;height:32px;background:0 0;font-size:22px;line-height:16px;margin:-14px -16px 0 0;padding:0;cursor:pointer}ai-dialog>ai-dialog-body{display:block;padding:16px}ai-dialog>ai-dialog-footer{display:block;padding:6px;border-top:1px solid #e5e5e5;text-align:right}ai-dialog>ai-dialog-footer button{color:#333;background-color:#fff;padding:6px 12px;font-size:14px;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid #ccc;border-radius:4px;margin:5px 0 5px 5px}ai-dialog>ai-dialog-footer button:disabled{cursor:default;opacity:.45}ai-dialog>ai-dialog-footer button:hover:enabled{color:#333;background-color:#e6e6e6;border-color:#adadad}.ai-dialog-open{overflow:hidden}';

  var DialogConfiguration = exports.DialogConfiguration = function () {
    function DialogConfiguration(aurelia) {
      

      this.aurelia = aurelia;
      this.settings = _dialogOptions.dialogOptions;
      this.resources = [];
      this.cssText = defaultCSSText;
      this.renderer = defaultRenderer;
    }

    DialogConfiguration.prototype.useDefaults = function useDefaults() {
      return this.useRenderer(defaultRenderer).useCSS(defaultCSSText).useStandardResources();
    };

    DialogConfiguration.prototype.useStandardResources = function useStandardResources() {
      return this.useResource('ai-dialog').useResource('ai-dialog-header').useResource('ai-dialog-body').useResource('ai-dialog-footer').useResource('attach-focus');
    };

    DialogConfiguration.prototype.useResource = function useResource(resourceName) {
      this.resources.push(resourceName);
      return this;
    };

    DialogConfiguration.prototype.useRenderer = function useRenderer(renderer, settings) {
      this.renderer = renderer;
      this.settings = Object.assign(this.settings, settings || {});
      return this;
    };

    DialogConfiguration.prototype.useCSS = function useCSS(cssText) {
      this.cssText = cssText;
      return this;
    };

    DialogConfiguration.prototype._apply = function _apply() {
      var _this = this;

      this.aurelia.transient(_renderer.Renderer, this.renderer);
      this.resources.forEach(function (resourceName) {
        return _this.aurelia.globalResources(resources[resourceName]);
      });

      if (this.cssText) {
        _aureliaPal.DOM.injectStyles(this.cssText);
      }
    };

    return DialogConfiguration;
  }();
});
define('aurelia-dialog/renderer',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var Renderer = exports.Renderer = function () {
    function Renderer() {
      
    }

    Renderer.prototype.getDialogContainer = function getDialogContainer() {
      throw new Error('DialogRenderer must implement getDialogContainer().');
    };

    Renderer.prototype.showDialog = function showDialog(dialogController) {
      throw new Error('DialogRenderer must implement showDialog().');
    };

    Renderer.prototype.hideDialog = function hideDialog(dialogController) {
      throw new Error('DialogRenderer must implement hideDialog().');
    };

    return Renderer;
  }();
});
define('aurelia-dialog/dialog-renderer',['exports', './dialog-options', 'aurelia-pal', 'aurelia-dependency-injection'], function (exports, _dialogOptions, _aureliaPal, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogRenderer = undefined;

  

  var _dec, _class;

  var containerTagName = 'ai-dialog-container';
  var overlayTagName = 'ai-dialog-overlay';
  var transitionEvent = function () {
    var transition = null;

    return function () {
      if (transition) return transition;

      var t = void 0;
      var el = _aureliaPal.DOM.createElement('fakeelement');
      var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };
      for (t in transitions) {
        if (el.style[t] !== undefined) {
          transition = transitions[t];
          return transition;
        }
      }
    };
  }();

  var DialogRenderer = exports.DialogRenderer = (_dec = (0, _aureliaDependencyInjection.transient)(), _dec(_class = function () {
    function DialogRenderer() {
      var _this = this;

      

      this.dialogControllers = [];

      this.escapeKeyEvent = function (e) {
        if (e.keyCode === 27) {
          var top = _this.dialogControllers[_this.dialogControllers.length - 1];
          if (top && top.settings.lock !== true) {
            top.cancel();
          }
        }
      };

      this.defaultSettings = _dialogOptions.dialogOptions;
    }

    DialogRenderer.prototype.getDialogContainer = function getDialogContainer() {
      return _aureliaPal.DOM.createElement('div');
    };

    DialogRenderer.prototype.showDialog = function showDialog(dialogController) {
      var _this2 = this;

      var settings = Object.assign({}, this.defaultSettings, dialogController.settings);
      var body = _aureliaPal.DOM.querySelectorAll('body')[0];
      var wrapper = document.createElement('div');

      this.modalOverlay = _aureliaPal.DOM.createElement(overlayTagName);
      this.modalContainer = _aureliaPal.DOM.createElement(containerTagName);
      this.anchor = dialogController.slot.anchor;
      wrapper.appendChild(this.anchor);
      this.modalContainer.appendChild(wrapper);

      this.stopPropagation = function (e) {
        e._aureliaDialogHostClicked = true;
      };
      this.closeModalClick = function (e) {
        if (!settings.lock && !e._aureliaDialogHostClicked) {
          dialogController.cancel();
        } else {
          return false;
        }
      };

      dialogController.centerDialog = function () {
        if (settings.centerHorizontalOnly) return;
        centerDialog(_this2.modalContainer);
      };

      this.modalOverlay.style.zIndex = this.defaultSettings.startingZIndex;
      this.modalContainer.style.zIndex = this.defaultSettings.startingZIndex;

      var lastContainer = Array.from(body.querySelectorAll(containerTagName)).pop();

      if (lastContainer) {
        lastContainer.parentNode.insertBefore(this.modalContainer, lastContainer.nextSibling);
        lastContainer.parentNode.insertBefore(this.modalOverlay, lastContainer.nextSibling);
      } else {
        body.insertBefore(this.modalContainer, body.firstChild);
        body.insertBefore(this.modalOverlay, body.firstChild);
      }

      if (!this.dialogControllers.length) {
        _aureliaPal.DOM.addEventListener('keyup', this.escapeKeyEvent);
      }

      this.dialogControllers.push(dialogController);

      dialogController.slot.attached();

      if (typeof settings.position === 'function') {
        settings.position(this.modalContainer, this.modalOverlay);
      } else {
        dialogController.centerDialog();
      }

      this.modalContainer.addEventListener('click', this.closeModalClick);
      this.anchor.addEventListener('click', this.stopPropagation);

      return new Promise(function (resolve) {
        var renderer = _this2;
        if (settings.ignoreTransitions) {
          resolve();
        } else {
          _this2.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
        }

        _this2.modalOverlay.classList.add('active');
        _this2.modalContainer.classList.add('active');
        body.classList.add('ai-dialog-open');

        function onTransitionEnd(e) {
          if (e.target !== renderer.modalContainer) {
            return;
          }
          renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }
      });
    };

    DialogRenderer.prototype.hideDialog = function hideDialog(dialogController) {
      var _this3 = this;

      var settings = Object.assign({}, this.defaultSettings, dialogController.settings);
      var body = _aureliaPal.DOM.querySelectorAll('body')[0];

      this.modalContainer.removeEventListener('click', this.closeModalClick);
      this.anchor.removeEventListener('click', this.stopPropagation);

      var i = this.dialogControllers.indexOf(dialogController);
      if (i !== -1) {
        this.dialogControllers.splice(i, 1);
      }

      if (!this.dialogControllers.length) {
        _aureliaPal.DOM.removeEventListener('keyup', this.escapeKeyEvent);
      }

      return new Promise(function (resolve) {
        var renderer = _this3;
        if (settings.ignoreTransitions) {
          resolve();
        } else {
          _this3.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
        }

        _this3.modalOverlay.classList.remove('active');
        _this3.modalContainer.classList.remove('active');

        function onTransitionEnd() {
          renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }
      }).then(function () {
        body.removeChild(_this3.modalOverlay);
        body.removeChild(_this3.modalContainer);
        dialogController.slot.detached();

        if (!_this3.dialogControllers.length) {
          body.classList.remove('ai-dialog-open');
        }

        return Promise.resolve();
      });
    };

    return DialogRenderer;
  }()) || _class);


  function centerDialog(modalContainer) {
    var child = modalContainer.children[0];
    var vh = Math.max(_aureliaPal.DOM.querySelectorAll('html')[0].clientHeight, window.innerHeight || 0);

    child.style.marginTop = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
    child.style.marginBottom = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
  }
});
define('aurelia-dialog/dialog-options',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var dialogOptions = exports.dialogOptions = {
    lock: true,
    centerHorizontalOnly: false,
    startingZIndex: 1000,
    ignoreTransitions: false
  };
});
define('aurelia-dialog/dialog-service',['exports', 'aurelia-metadata', 'aurelia-dependency-injection', 'aurelia-templating', './dialog-controller', './renderer', './lifecycle', './dialog-result'], function (exports, _aureliaMetadata, _aureliaDependencyInjection, _aureliaTemplating, _dialogController, _renderer, _lifecycle, _dialogResult) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogService = undefined;

  

  var _class, _temp;

  var DialogService = exports.DialogService = (_temp = _class = function () {
    function DialogService(container, compositionEngine) {
      

      this.container = container;
      this.compositionEngine = compositionEngine;
      this.controllers = [];
      this.hasActiveDialog = false;
    }

    DialogService.prototype.open = function open(settings) {
      var _this = this;

      var dialogController = void 0;

      var promise = new Promise(function (resolve, reject) {
        var childContainer = _this.container.createChild();
        dialogController = new _dialogController.DialogController(childContainer.get(_renderer.Renderer), settings, resolve, reject);
        childContainer.registerInstance(_dialogController.DialogController, dialogController);
        return _openDialog(_this, childContainer, dialogController);
      });

      return promise.then(function (result) {
        var i = _this.controllers.indexOf(dialogController);
        if (i !== -1) {
          _this.controllers.splice(i, 1);
          _this.hasActiveDialog = !!_this.controllers.length;
        }

        return result;
      });
    };

    DialogService.prototype.openAndYieldController = function openAndYieldController(settings) {
      var _this2 = this;

      var childContainer = this.container.createChild();
      var dialogController = new _dialogController.DialogController(childContainer.get(_renderer.Renderer), settings, null, null);
      childContainer.registerInstance(_dialogController.DialogController, dialogController);

      dialogController.result = new Promise(function (resolve, reject) {
        dialogController._resolve = resolve;
        dialogController._reject = reject;
      }).then(function (result) {
        var i = _this2.controllers.indexOf(dialogController);
        if (i !== -1) {
          _this2.controllers.splice(i, 1);
          _this2.hasActiveDialog = !!_this2.controllers.length;
        }
        return result;
      });

      return _openDialog(this, childContainer, dialogController).then(function () {
        return dialogController;
      });
    };

    return DialogService;
  }(), _class.inject = [_aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine], _temp);


  function _openDialog(service, childContainer, dialogController) {
    var host = dialogController.renderer.getDialogContainer();
    var instruction = {
      container: service.container,
      childContainer: childContainer,
      model: dialogController.settings.model,
      view: dialogController.settings.view,
      viewModel: dialogController.settings.viewModel,
      viewSlot: new _aureliaTemplating.ViewSlot(host, true),
      host: host
    };

    return _getViewModel(instruction, service.compositionEngine).then(function (returnedInstruction) {
      dialogController.viewModel = returnedInstruction.viewModel;
      dialogController.slot = returnedInstruction.viewSlot;

      return (0, _lifecycle.invokeLifecycle)(dialogController.viewModel, 'canActivate', dialogController.settings.model).then(function (canActivate) {
        if (canActivate) {
          service.controllers.push(dialogController);
          service.hasActiveDialog = !!service.controllers.length;

          return service.compositionEngine.compose(returnedInstruction).then(function (controller) {
            dialogController.controller = controller;
            dialogController.view = controller.view;

            return dialogController.renderer.showDialog(dialogController);
          });
        }
      });
    });
  }

  function _getViewModel(instruction, compositionEngine) {
    if (typeof instruction.viewModel === 'function') {
      instruction.viewModel = _aureliaMetadata.Origin.get(instruction.viewModel).moduleId;
    }

    if (typeof instruction.viewModel === 'string') {
      return compositionEngine.ensureViewModel(instruction);
    }

    return Promise.resolve(instruction);
  }
});
define('resources/elements/puzzle/puzzle',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../events', '../picture/picture'], function (exports, _aureliaFramework, _aureliaEventAggregator, _events, _picture) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Puzzle = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Puzzle = exports.Puzzle = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function Puzzle(aggregator) {
            _classCallCheck(this, Puzzle);

            this.eventAggregator = aggregator;
            this.picture = new _picture.Picture("aurelia_logo", 3, 3);
        }

        Puzzle.prototype.movePieces = function movePieces() {
            var from = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];
            var to = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];


            if (from < 0 && to < 0) return;

            if (from > -1) {
                from = this.picture.pieces.map(function (m) {
                    return m.actualIndex;
                }).indexOf(parseInt(from, 10));
            }

            if (to > -1) {
                to = this.picture.pieces.map(function (m) {
                    return m.actualIndex;
                }).indexOf(parseInt(to, 10));
            }

            if (to === -1) {
                to = this.picture.pieces.length - 1;
            } else if (to > 0 && to > from) {
                to = to - 1;
            }

            this.picture.movePieces(from, to);

            if (this.picture.picturePiecesComplete()) {
                this.eventAggregator.publish(new _events.PicturePiecesCorrectEvent());
            }
        };

        return Puzzle;
    }()) || _class);
});
define('resources/score-counter',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ScoreCounter = exports.ScoreCounter = function ScoreCounter() {
        _classCallCheck(this, ScoreCounter);

        this.scores = [];
    };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"font-awesome/css/font-awesome.css\"></require>\n  <div class=\"container\">\n      <nav-bar router.bind=\"router\"></nav-bar>\n      <main>\n        <router-view></router-view>\n      </main>\n  </div>\n</template>\n"; });
define('text!styles/main.css', ['module'], function(module) { module.exports = ".grid {\r\n    width: 390px;\r\n    height: 500px;\r\n    display: block;\r\n}\r\n\r\n.grid-cell {\r\n    padding:2px;\r\n}\r\n\r\n.puzzle-piece {\r\n    -webkit-box-shadow: 1px 1px 5px 1px rgba(0,0,0,0.29);\r\n    -moz-box-shadow: 1px 1px 5px 1px rgba(0,0,0,0.29);\r\n    box-shadow: 1px 1px 5px 1px rgba(0,0,0,0.29);  \r\n}"; });
define('text!resources/dialogs/game-complete.html', ['module'], function(module) { module.exports = "<template>\n  <ai-dialog>\n    <ai-dialog-body>\n        <h1>Score: ${score.total}</h1>\n      <h2>Player Name</h2>\n      <input value.bind=\"score.playerName\" />\n    </ai-dialog-body>\n\n    <ai-dialog-footer>\n      <button click.trigger=\"controller.cancel()\">Cancel</button>\n      <button click.trigger=\"controller.ok(score)\">Ok</button>\n    </ai-dialog-footer>\n  </ai-dialog>\n</template>"; });
define('text!resources/elements/nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n  <nav class=\"navbar navbar-default\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n        <span class=\"sr-only\">Toggle Navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-home\"></i>\n        <span>${router.title}</span>\n      </a>\n    </div>\n\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n      <ul class=\"nav navbar-nav\">\n        <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n          <a href.bind=\"row.href\">${row.title}</a>\n        </li>\n      </ul>\n\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li class=\"loader\" if.bind=\"router.isNavigating\">\n          <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n        </li>\n      </ul>\n    </div>\n  </nav>\n</template>"; });
define('text!routes/home/home.html', ['module'], function(module) { module.exports = "<template>\n    <h1>Welcome to ${title}</h1>\n</template>\n"; });
define('text!routes/game/game.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"styles/main.css\"></require>\n    <require from=\"dragula/dragula.css\"></require>\n    <require from=\"./grid/grid\"></require>\n    <require from=\"./aside/aside\"></require>\n    <h1>Welcome to ${title}</h1>\n\n<div class=\"col-xs-8\">\n    <grid puzzle.bind=\"puzzle\" view-model.ref=\"grid\"></grid>\n</div>\n<div class=\"col-xs-4\">\n    <aside number-of-moves.bind=\"grid.numberOfMoves\" seconds-elapsed.bind=\"grid.secondsElapsed\" picture.bind=\"puzzle.picture\"></aside>\n</div>\n</template>\n"; });
define('text!routes/scores/scores.html', ['module'], function(module) { module.exports = "<template>\n    <h1>Welcome to ${title}</h1>\n\n<div if.bind=\"scoreCounter.scores.length > 0\">\n    <div class=\"row\">\n        <div class=\"col-xs-4\">Name</div>\n        <div class=\"col-xs-8\"></div>\n    </div>\n\n    <div class=\"row\" repeat.for=\"score of scoreCounter.scores\">\n        <div class=\"col-xs-4\">${score.playerName}</div>\n        <div class=\"col-xs-8\">${score.total}</div>\n    </div>\n</div>\n\n</template>\n"; });
define('text!resources/elements/picture/picture.html', ['module'], function(module) { module.exports = ""; });
define('text!resources/elements/picture/piece-view.html', ['module'], function(module) { module.exports = "<template bindable=\"piece\" class=\"grid-cell\" data-actual-index.bind=\"piece.actualIndex\">\n    <img class=\"puzzle-piece\" src=\"content/images/${piece.imageName}\" />\n    <span style=\"position:absolute\">${piece.properIndex}</span>\n</template>\n"; });
define('text!resources/elements/picture/piece.html', ['module'], function(module) { module.exports = "<template bindable=\"piece\" class=\"col-33\">\n    <img class=\"puzzle-piece\" src.bind=\"imageName\" />\n</template>\n"; });
define('text!routes/game/aside/aside.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"well well-sm\">Number of moves: ${numberOfMoves}</div>\n    <div class=\"well well-sm\">Correct pieces: ${picture.numberOfCorrectPieces}</div>\n    <div class=\"well well-sm\">Seconds Elapsed: ${secondsElapsed}</div>\n    <div class=\"well well-lg\">\n        <img src=\"/content/images/${picture.mainImage}\" style=\"width:90%;\"/>\n    </div>\n</template>\n"; });
define('text!routes/game/grid/grid.html', ['module'], function(module) { module.exports = "<template class=\"drag-and-drop-source grid\">\n    <piece-view repeat.for=\"piece of puzzle.picture.pieces\" piece.bind=\"piece\"></piece-view>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map