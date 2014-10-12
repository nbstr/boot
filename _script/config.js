'use strict';

var config = {};

// SETTINGS
config.app = {
	name:"app",
    production:false,
    root:'',
    modules: ['Directives', 'Rootscope', 'Modules']
};

// ENVIRONMENTS
config.app.environments = {
    local:{
        host:'http://localhost:8888/',
        apiURL:'http://localhost:8888/api/public/index.php/',
        filesURL:'http://localhost:8888/api/public/'
    },
    remote:{
        host:'http://54.213.206.26/',
        apiURL:'http://54.213.206.26/projects/the-squid/api/public/index.php/',
        filesURL:'http://54.213.206.26/projects/the-squid/api/public/'
    }
};

// ROUTES
config.app.routes_base = {
    assets: config.app.root + '_assets/',
    css: config.app.root + '_css/',
    html: config.app.root + '_html/',
    scripts: config.app.root + '_script/',
    ctrl: config.app.root + 'ctrl/',
    mod: config.app.root + 'mod/',
    js: config.app.root + 'js/'
};
config.app.routes = [
	{
        'name':'Home',
        'route':'/',
        'templateUrl':'_html/Home.html',
        'controllerUrl':'_script/ctrl/HomeCtrl.js',
        'controller':'HomeCtrl',
        'default':true
    }
];

// JS FILES
config.app.js = ['prototype', 'functions'];

// LIBRAIRIES
config.app.lib = [
    {
        name:'jQuery',
        url:'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
        local_url:'',
        boot:true,
        exports:'jQuery',
        deps:[
            {
                name:'jQueryUI',
                url:'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min',
                local_url:''
            },
            {
                name:'jQueryNiceScroll',
                url:'https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.5.1/jquery.nicescroll.min',
                local_url:''
            },
            {
                name:'jsplumb',
                url:'lib/jsplumb',
                local_url:'lib/jsplumb'
            }
        ]
    },
    {
        name:'angular',
        url:'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min',
        local_url:'',
        boot:true,
        exports:'angular',
        deps:[
            {
                name:'angular-route',
                url:'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular-route.min',
                local_url:'',
                module:'ngRoute'
            },
            {
                name:'angular-resource',
                url:'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular-resource.min',
                local_url:''
            },
            {
                name:'angular-animate',
                url:'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular-animate.min',
                local_url:''
            }
        ]
    }
];