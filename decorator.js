//Why use the decorator pattern
	// To add features to specific items
	// To add features without creating a subclass or changing the original interface
	// This is awesome for api calls because sometimes you get back different things than one would expect


(function(win, $){
	function clone(src,out){
		for(var attr in src.prototype){
			out.prototype[attr] = src.prototype[attr];
		}
	}
	function Circle(){
		this.item = $('<div class="circle"></div>');
	}
	Circle.prototype.color = function(clr){
		this.item.css('background', clr);
	}

	Circle.prototype.move = function(left, top){
				this.item.css('left',left);
				this.item.css('top',top);
	};

	Circle.prototype.get = function(){
		return this.item;
	}

	function Rect(){
		this.item = $('<div class="rect"></div>');
	}
	clone(Circle, Rect);

	function selfDestructDecorator(obj){
		console.log("what is the obj", obj);
		obj.item.click(function(){
			obj.kill();
		});

		obj.kill = function(){
			obj.item.remove();
		};
	}


	function RedCircleBuilder(){
		this.item = new Circle();
		this.init();
	}
	RedCircleBuilder.prototype.init = function() {
		//NOTHING
	};

	RedCircleBuilder.prototype.get = function() {
		return this.item;
	};

	function BlueCircleBuilder(){
		this.item = new Circle();

		this.init();
	}

	BlueCircleBuilder.prototype.init = function() {
		this.item.color("blue");

		var rect = new Rect();
				rect.color("yellow");
				rect.move(40,40);
				console.log("hello?")
				selfDestructDecorator(rect);
		this.item.get().append(rect.get());
	};

	BlueCircleBuilder.prototype.get = function() {
		return this.item;
	};


	ShapeFactory = function(){
			this.types = {};
			this.create = function(type){
				return new this.types[type]().get();
			};

			this.register = function(type, cls){
				if(cls.prototype.init && cls.prototype.get){
						this.types[type] = cls;
				}
			}
	};

	function StageAdapter(id){
		this.index = 0;
		this.context = $(id);
	};

	StageAdapter.prototype.SIG = 'stageItem_';
	StageAdapter.prototype.add = function(item) {
		++this.index;
		item.addClass(this.SIG + this.index);
		this.context.append(item);
	};

	StageAdapter.prototype.remove = function(index){
			this.context.remove('.'+ this.SIG + index);
	};

	function CompositeController(a){
		this.a = a;
	}

	CompositeController.prototype.action = function(act){
		var args = Array.prototype.slice.call(arguments);
		args.shift()
		// shift off first argument because we act

		for(var item in this.a){
			this.a[item][act].apply(this.a[item], args);
		}
	};


	var ShapeGeneratorSingleton = (function(){
		var instance;

		function init(){
			var _aCircle = [],
					_stage,
					_sf = new ShapeFactory(),
					_cc = new CompositeController(_aCircle);

			function _position(circle, left, top){
				circle.move(left, top);
			}

			function registerShape(name, cls){
				_sf.register(name, cls);
			}

			function setStage(stg){
				_stage = stg;
			}

			function create(left, top,type){
				var circle = _sf.create(type);
				circle.move(left, top);
				return circle;
			}

			function tint(clr){
				_cc.action('color', clr);
			}

			function move(left, top){
				_cc.action('move', left, top);
			};

			function add(circle){
				_stage.add(circle.get());
				_aCircle.push(circle);
			}

			function index(){
				return _aCircle.length;
			}

			return {
							index:index,
							create:create,
							add:add,
							registerShape:registerShape,
							setStage: setStage,
							tint: tint,
							move: move
						};
		}

		return {
			getInstance: function(){
				if(!instance){
					instance = init();
				}

				return instance;
			}
		}

	})();

	$(win.document).ready(function(){
		var _sg = ShapeGeneratorSingleton.getInstance();
		_sg.registerShape('red', RedCircleBuilder);
		_sg.registerShape('blue', BlueCircleBuilder);
		_sg.setStage(new StageAdapter('.advert'));

		$('.advert').click(function(e){
			var circle = _sg.create(e.pageX-25, e.pageY-25,"red");
			_sg.add(circle);
		});

		$(document).keydown(function(e){
			console.log(e);
			if(e.key=='a'){
				var circle = _sg.create(Math.floor(Math.random()*600), Math.floor(Math.random()*600),	"blue");
				_sg.add(circle);
			} else if (e.key === 't'){
				_sg.tint('black');
			} else if (e.keyCode === 37){
				_sg.move('-=5px', '+=0px');
			} else if (e.keyCode === 39){
				_sg.move('+=5px', '+=0px');
			}

		});

	});

})(window, jQuery);
