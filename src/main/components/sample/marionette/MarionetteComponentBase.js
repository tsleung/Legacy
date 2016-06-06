define([
  'marionette',
  'modules/legacy/marionette/Model'
],function(
  Marionette,
  Model
){
  return Marionette.ItemView.extend({
    initialize : function(){
      this.model = new Model(this.options.model)
    }
  });
});