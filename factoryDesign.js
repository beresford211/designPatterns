// Why factory pattern?
  //

(function(win, $){
  var RedCircle = function() {
      this.item = $('<div class="circle"></div>');
  }, BlueCircle = function() {
      this.item = $('<div class="circle" style="background:blue"></div>');
  }, CircleFactory = function() {
    // 

    this.create = function(color){
      if(color === "blue"){
        return new BlueCircle();
      } else {
        return new RedCircle();
      }
    };
  };
  // idea is to create a public interface so that we can create
  // an endless amount of circles without working about specific details



  var circleGeneratorSingleton = (function(){
		var instance;
		// Idea behind this is that we want instantiate something late in the game


		function init(){
			var _aCircle = [], _stage = $('.advert'), cf = new CircleFactory();

      function _position(circle, left, top){
        circle.css('left', left);
        circle.css('top', top);
      }

			function create(left, top, color){
				var circle = _cf.create(color).item;
        _position(circle, left, top);
        return circle;
			}

			function add(circle){
				_stage.append(circle);
        _aCircle.push(circle);
			}

      function index(){
        return _aCircle.length - 1;
      }

			// returns the object and whatever we want to be accessible
			return {
        index: index,
        create: create,
        add: add
      };
		}

		return {
			getInstance: function(){
				if(!instance) {
					// through closure we check if the instance has been instantiated
					// if it has then we return the instance below
						// otherwise we just instantiate the init function
					instance = init();
				}
				return instance;
			}

		};

	})();

	$(win.document).ready(function(){
		$('.advert').click(function(e){
      var circleGenerator = circleGeneratorSingleton.getInstance();
      console.log("what is circleGenerator", circleGenerator);
      var circle = circleGenerator.create(e.pageX-25, e.pageY-25);
      circleGenerator.add(circle);
		});

    document.addEventListener("keypress", function(e){
      if(e.key == "a"){
        var cg = circleGeneratorSingleton.getInstance();
        var circle = cg.create(Math.floor(Math.random()* 600), Math.floor(Math.random()* 600));

        cg.add(circle);
      }
    });

  });

})(window, jQuery);