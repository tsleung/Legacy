define([
  'jquery',
  'utilities/legacy/bootstrapComponent'
],function(
  $,
  bootstrapComponent
){

  return function(options){
    var app = new App();
    app.options = options;

    // bootstrapping the dom
    bootstrapDom(window.document.body).done(function(){
      //console.clear();
      console.log('app ready')

      // here we add different systems

      // running metrics on events

      // watching event communications

      // applying enforcement to modules to ease development

      //

    });


    return app;
  };

  // Apps assign classes for styling, modules for js controllers, and templates for rendering
  function App(){

  };
  function bootstrapDom(el){
// should create an observable here to witness components being bootstrapped
    var componentBootstrapping = [];
    $(el).find('section.component').each(function() {
      var def = bootstrapComponent(
        this,
        $(this).data('module'),
        (function(moduleName){

          var template = moduleName.substring(0,1).toLowerCase()+moduleName.substring(1);
          // need to rename this to lowercase for non Windows file systems
          console.log(
            'templateName',template
          )
          return template;
        })($(this).data('template') || $(this).data('module')),
        $(this).data('classification') || $(this).data('module').replace(/\//ig,'-')
      );
      componentBootstrapping.push(
        def
      );
      def.then(function(component){
        // push to obs
        // obs.publish(component);
      })
    });
    return $.when.apply(null,componentBootstrapping);
  };

});


