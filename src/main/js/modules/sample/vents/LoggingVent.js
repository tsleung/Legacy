define([
  'modules/legacy/marionette/VentBehavior',
  'modules/legacy/core/Channel',
  'module'
],function(
  Super,
  Channel,
  module
){
  return Super.extend({
    defaults : function() {
      return {
        channels: [Channel],
        channelName : module.id,
        validate : function(){
          return (arguments.length<2);
        }
      }
    }
  });
});