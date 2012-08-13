(function(){
  'use strict';

  _.extend(Backbone.Router.prototype, Backbone.Events,
  {
    namedParam: /(:\w+|\*)/g,

// var namedParam    = /:\w+/g;
// var splatParam    = /\*\w+/g;

    /**
     * give method name and it return the associated routes
     *
     * @param   string  method name
     * @return  array
     */
    reverse: function(_method)
    {
      var matching = [];
      for(var path in this.routes)
      {
        if(this.routes[path] == _method)
        {
          matching.push(path);
        }
      }
      return matching;
    },

    /**
     * @param   string  route pattern
     * @param   array   arguments
     * @return  string
     */
    createUri: function(_route, _hash)
    {
      var replace = _route.match( this.namedParam );

      if(!_.isNull(replace))
      {
        for(var i = -1, l = _hash.length; ++i< l;)
        {  
          _route = _route.replace(replace[i], encodeURIComponent(_hash[i]));
        }
      }
      
      _route = _route.replace(this.namedParam, '').replace(/\/$/, '');

      if(!_.isUndefined(Backbone.history.options))
      {
        _route = Backbone.history.options.root+_route;
      }

      return _route;
    },

    /**
     * wrap reverse and createUri methods in a single call
     * if multiple possibilities, try to find the good route
     * by comparing the numbers of arguments with giving hash 
     *
     * @param   string  route pattern
     * @param   array   arguments
     * @return  string
     */
    setRoute: function(_method, _hash)
    {
      var routes   = this.reverse(_method),
          nbArgs   = _hash.length,
          nbRoutes = routes.length;

      if(nbRoutes == 1)
      {
        return this.createUri(routes[0], _hash);
      }
      else
      {
        for(var i = -1; ++i< nbRoutes;)
        {
          var _l = routes[i].match(this.namedParam);

          if(!_.isNull(_l) && _l.length == nbArgs)
          {
            // console.log('found %d args in route %s', _l.length, routes[i])
            return this.createUri(routes[i], _hash);
          }
        }
      }

      return false;
    },

    /**
     * return the arguments list for
     * a route method
     *
     * @param   string  route pattern
     * @return  array
     */
    getArgs: function(_route)
    {
      var route  = (_.isArray(_route)) ? _route[0] : _route,
          args   = _route[0].match(this.namedParam),
          nbArgs = args.length;

      if(!_.isNull(args) && nbArgs > 0)
      {
        for(var i = -1; ++i < nbArgs;)
        {
          args[i] = args[i].replace(':', '');
        }
        return args;
      }
      return false;
    }
  });

}).call(this);
