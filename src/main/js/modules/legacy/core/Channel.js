define([
  'marionette',
  'backbone',
  'backbone.radio',
  'module'
],function(
  Marionette,
  Backbone,
  Radio,
  module
){

  Channel.prototype = {
    onMessage : onMessage,
    sendMessage : sendMessage
  }
  return Channel;
  function Channel(channelName){
    this.channel = Radio.channel(channelName);
    this.channel.on(module.id,function(){
      this.onMessage.apply(this,arguments);
    }.bind(this));
  };
  function onMessage(){

  };
  function sendMessage(){
    this.channel.trigger.apply(this.channel,[module.id].concat([].slice.call(arguments)));
  };
});