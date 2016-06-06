define(['jquery'],function($){
  return app;
  function app(options){
    return new App(options);
  };
  function App(options){
    this.options = options;
    this.el = this.options.el;
    this.$el = $(this.el);
  };
});