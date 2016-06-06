define([
  './Behavior',
  'utilities/legacy/connect',
  'module'
],function(
  Super,
  connect,
  module
){
  return Super.extend({
    defaults : function(){
      return {
        channels : [],
        allowEcho : false,
        channelName : module.id,
        validate : function(){return true;}
      };
    },
    initialize : function(options,view){
      Super.prototype.initialize.apply(this,arguments);
      for(var i = 0; i < this.options.channels.length;i++){
        var channel = new (this.options.channels[i])(this.options.channelName);
        (!this.options.publisher) ||
          this.bindPublisher(this.view,this.options.publisher.call(view),channel,this.options.validate);
        (!this.options.subscriber) ||
          this.bindSubscriber(this.view,this.options.subscriber.call(view),channel,this.options.allowEcho,this.options.validate);
      }
    },
    bindPublisher : function(view,publisher,channel,validate){
      connect(view,publisher,function(){
        (!validate.apply(null,arguments)) || channel.sendMessage.apply(channel,[view].concat([].slice.call(arguments)));
      }.bind(this));
    },
    bindSubscriber : function(view,subscriber,channel,echo){
      var onMessage =function(){
        var args = [].slice.call(arguments);
        if( args.shift()!=view || echo){
          subscriber.apply(view,args)
        }
      }.bind(this);
      connect(channel,channel.onMessage,onMessage);
    }
  })
})