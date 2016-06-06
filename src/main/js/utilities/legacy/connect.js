define([],function(){

  // replace an object's function with a wrapped function that evaluates a list of side functions
  // if the function has already been wrapped, add function as a side function

  return connect;
  function connect(obj, fn, connectFn){
    var connection;

    for(var key in obj){
      if(typeof obj[key] != 'function'){continue};
      !(typeof obj[key].connected == 'function' && obj[key].connected(fn))
        || addToExisting.call(connection,fn);
      !(obj[key] == fn)
        || createNewConnectedFunction(connection,obj,key,fn,connectFn);

    };
  };
  function connected(fn){
    // closure for function list
    return this.connectedFunctions.indexOf(fn) > -1;
  };
  // add function to the connected
  function addToExisting(fn){
    return this.connectedFunctions.unshift(fn);
  };

  function createNewConnectedFunction(connection,obj,key,fn,wrap){
    // create a new instance to hold the connections
    connection = new (function(){})(); // change this to {}?
    // adding a list to store connected functions
    connection.connectedFunctions = [wrap,fn];
    // reassign the current object key to a wrapper function. This function is called instead of the original

    obj[key] = function(){
      var args = arguments;
      // copy the existing connected functions
      var copiedConnectedFunctions = [].concat(connection.connectedFunctions);
      // get the original function
      // run all the connected functions
      while(copiedConnectedFunctions.length>1){
        copiedConnectedFunctions.shift().apply(obj,args)
      }
      // run the original and return
      return copiedConnectedFunctions.shift().apply(obj,args);
    };
    obj[key].connected = function(fn){
      // if a function argument isn't passed, since this method is defined we know that a connection is enabled, so return true
      // if a function argument is supplied use the connected function to evaluate if this function is the one connected
      return (!fn) || connected.call(connection,fn);
    }
    return connection;
  };

// hiiiyeneewashereeee:)
});