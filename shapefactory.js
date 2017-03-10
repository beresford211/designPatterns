

ShapeFactory = function() {
  this.types = {};
  this.create = function(type){
    return new this.types[type]().get();
  };

  this.register = function(type, cls){
    if(cls.prototype.init && cls.prototype.get){
      this.types[type] = cls;
    }
  }

}
