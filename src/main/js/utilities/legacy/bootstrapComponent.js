define([
  'jquery',
  'Mustache'
],function(
  $,
  Mustache
){
  return bootstrapComponent;
  /**
   * bootstrapping a component in Legacy
   *
   * @param el
   * @param modulePath
   * @param templatePath
   * @param classification
   *
   * @returns {$.Deferred}
   */
  function bootstrapComponent(el,modulePath,templatePath,classification){
    var def = new $.Deferred();
    require([
      modulePath,
      'text!'+templatePath+'.mustache',
    ],function(
      Component,
      template
    ){
      Mustache.parse(template);   // optional, speeds up future uses
      $(el).attr('class',classification);
      $(el).addClass('component');
      var model = {
        module : modulePath
      };

      var component = new Component({
        el : el,
        template: function templateFn(model){
          return Mustache.render(template,model);
        },
        model : model
      });
      component.render();

      def.resolve(component);
      return;

    });
    return def;
  };
  // bootstrap should be genericized to allow pluggable loading of optional stores for applying/getting [controller, template, styling, el]
  // iterate through list  of get/apply [[styleGet,styleApply],[templateGet,templateApply],[controllerGet,controllerApply]]
});