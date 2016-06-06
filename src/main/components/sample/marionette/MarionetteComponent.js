define([
  'modules/legacy/marionette/Model',
  './MarionetteComponentBase',
  'modules/sample/vents/LoggingVent'
],function(
  Model,
  Super,
  VentBehavior
){
  var ViewModel = Model.extend({

  });
  var Component = Super.extend({
    ui : {
      form : 'form'
    },
    triggers : {
      'submit form' : 'formSubmit'
    },
    events : {
      'formSubmit' : 'onFormSubmit'
    },
    behaviors : {
      'VentBehavior' :{
        behaviorClass : VentBehavior,
        publisher : function(){
          return this.vent;
        },
        subscriber : function(){
          return this.onVent;
        }
      }
    },
    onFormSubmit : function(){
      console.log('onFormSubmit',this,arguments)
      this.vent({
        "randomEventName" : 'SomethingHappened',
        "extraInfo" : {
          date : new Date()
        }

      })
    },
    vent : function(){
      console.log('vent',this,arguments);
      this.onVent.apply(this,arguments);
    },
    onVent : function(){
      console.log('onVent',this,arguments);
    },
    initialize : function(){
      this.model = new ViewModel(this.options.model)
   //   this.vent();
    }
  });

  return Component;
});