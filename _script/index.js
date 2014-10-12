'use strict';

/*----------------------------------------------------------------------------------*\
|
|  # HASH TAG UPDATE
|
\*----------------------------------------------------------------------------------*/

(function(){
    var current_link = window.location.href,
        new_link = current_link.replace('#/', '#!/');
    if(current_link != new_link){
        window.location.href = new_link;
    }
})();

/*----------------------------------------------------------------------------------*\
|
|  FRONT END ENVIRONMENTS
|  ! REQUIRES config
|
\*----------------------------------------------------------------------------------*/

function set_environment(routes){
    if (config != undefined) {
        for (var e in routes) {
            config.app[e] = routes[e];
        }
    }
    else{
        console.error("configuration file missing: variable 'config' is undefined");
    }
}

var $environments = {
    // SETS DEFAULT ENVIRONMENT, IF NOT RECOGNIZED
    default:'remote',
    // DEFINES CURRENT HOST
    host:location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/"
};

// ADD ENVIRONMENTS & AUTOMATICALLY DETECTS/SETS ENVIRONMENT
if (config != undefined && config.app.environments != undefined) {
    for (var e in config.app.environments) {
        $environments[e] = config.app.environments[e];
    }
    // DEFAULT SETTINGS
    set_environment($environments[($environments.default) ? $environments.default : $environments[0]]);
    for(var environment in $environments){
        if($environments.host == $environments[environment].host){
            set_environment($environments[environment]);
            break;
        }
    }
}
else{
    console.error("configuration file missing: variable 'config' is undefined");
}

/*----------------------------------------------------------------------------------*\
|
|  REQUIRE JS
|  ! REQUIRES config
|
\*----------------------------------------------------------------------------------*/

// CONTROLLERS
config.app.ctrl = []; config.app.routes.forEach(function(c){
    config.app.ctrl.push(config.app.routes_base.ctrl + ((c.controller) ? c.controller : c.name + 'Ctrl'));
});

// MODULES
config.app.modules_routes = []; config.app.modules.forEach(function(m){
    config.app.modules_routes.push(config.app.routes_base.mod + m);
});

// JAVASCRIPT
config.app.js_routes = []; config.app.js.forEach(function(s){
    config.app.js_routes.push(config.app.routes_base.js + s);
});

var paths = {}, shim = {}, deps = [config.app.name]; config.app.lib.forEach(function(l){
    if(l.boot){
        paths[l.name] = (config.app.production && l.local_url) ? l.local_url : l.url;
        shim[l.name] = {exports:l.name};
        deps.push(l.name);
        if(l.deps){
            l.deps.forEach(function(d){
                if(d.boot){
                    paths[d.name] = (config.app.production && d.local_url) ? d.local_url : d.url;
                    deps.push(d.name);
                    if(d.module){
                        config.app.modules.push(d.module);
                    }
                }
            });
            l.deps.forEach(function(d){
            shim[d.name] = {deps:[l.name]};
        });
        }
    }
});

require.config({
    baseUrl: config.app.routes_base.scripts,
    paths: paths,
    shim: shim
});

require(deps, function() {
    $(function() {
        require(config.app.ctrl.concat(config.app.js_routes), function () {
            angular.bootstrap(document, [config.app.name]);
        });
    });
});