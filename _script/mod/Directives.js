'use strict';

define(['angular'], function(angular) {

    angular.module('Directives', [])
    /*
    |--------------------------------------------------------
    | DIRECTIVES
    |--------------------------------------------------------
    */
    .directive('background', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var watchFunction = function () {
                        var url = attrs.background;
                        url = scope.$eval(url);
                        if (url && url != "") {
                            element.css('background-image', 'url("' + config.filesURL + url + '")');
                        }
                    }
                    scope.$watch(attrs.background, watchFunction);
                }

            };
    }])
    .directive('callback', ['$timeout', function($timeout) {
        /*----------------------------------------------
        | TO USE ON NG REPEAT ELEMENT
        |
        | fires function after the ng-repeat is done loading all the loops
        |
        | attribute callback="function()"
        ----------------------------------------------*/
        return function(scope, element, attr) {
            if (scope.$last){
                $timeout(function () {
                    scope.$apply(attr.callback);
                });
            }
        };
    }])
    .directive('nbRightClick', function($parse) {
        return {
            restrict: 'A',
            scope: {
                nbRightClick: "="
            },
            link:function(scope, element, attrs) {
                var actions = scope.nbRightClick;
                element.bind('contextmenu', function(event) {
                    event.preventDefault();
                    (function(){
                        console.log(actions);
                    })();
                });
            }
        };
    })
    .directive('nbDrag', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    if(attrs.nbDrag)
                        $(element).draggable({
                            handle: attrs.nbDrag,
                            containment: ".lsd-screen"
                        });
                    else
                        $(element).draggable();
                }
            }
    }])
    .directive('dynamicHeight', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    if (attrs.dynamicHeight == "") {
                        alert("Provide an attribute to dynamic-height");
                        return false;
                    }
                    var watchFunction = function () {
                        var content = scope.$eval(attrs.dynamicHeight);
                        if (!content || !content.sizeY) {
                            return false;
                        } else {
                            var resizeFunc = function () {
                                var elem = $(element);
                                if (elem.length == 0) {
                                    var index = $rootScope.resizeFunction.indexOf(resizeFunc);
                                    $rootScope.resizeFunction.splice(index, 1);
                                    return false;
                                }
                                if (window.innerWidth > 768) {
                                    element.height((content.sizeY * config.mosaic_height) + "px");
                                } else {
                                    element.css("height", "auto");
                                }
                            }
                            resizeFunc();
                            $rootScope.resizeFunction.push(resizeFunc);
                        }
                    }
                    scope.$watch(attrs.dynamicHeight, watchFunction);
                }

            };
    }])
    .directive('newTab', [function () {
        /*----------------------------------------------
        | TO USE ON ANY TAG
        |
        | opens the link provided in the attribute's value
        | in a new tab
        |
        | attribute new-tab="http://www.example.com"
        ----------------------------------------------*/
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    new_tab(element.attr('href'));
                });
            }
        }
    }])
    .directive('dynamicPlacement', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    if (attrs.dynamicPlacement == "") {
                        alert("Provide an attribute to dynamic-height");
                        return false;
                    }
                    var watchFunction = function () {
                        var info = scope.$eval(attrs.dynamicPlacement);
                        if (info && info != "") {
                            var placement = function () {
                                var elem = $(element);
                                if (elem.length == 0) {
                                    console.log(remove);
                                    var index = $rootScope.resizeFunction.indexOf(resizeFunc);
                                    $rootScope.resizeFunction.splice(index, 1);
                                    return false;
                                }
                                if (window.innerWidth > 900) {
                                    element.css("position", "absolute");
                                    var sizeX = 5;
                                    if (attrs.sizeX) {
                                        sizeX = attrs.sizeX;
                                    }
                                    element.css("width", ((info.dx / sizeX) * 100) + "%");
                                    element.css("left", ((info.x / sizeX) * 100) + "%");
                                    element.css("height", (info.dy * config.mosaic_height) + "px");
                                    element.css("top", (info.y * config.mosaic_height) + "px");
                                } else {
                                    element.css("position", "relative");
                                    element.css("height", (config.mosaic_height) + "px");
                                    element.css("left", "0");
                                    element.css("top", "0");
                                    if (window.innerWidth > 480) {
                                        var index = scope.$eval(attrs.index);
                                        if ((index) % 3 == 0)
                                            element.css("width", "100%");
                                        else
                                            element.css("width", "50%");
                                    } else
                                        element.css("width", "100%");
                                }
                            }
                            placement();
                            $rootScope.resizeFunction.push(placement);

                        }
                    }
                    scope.$watch(attrs.dynamicPlacement, watchFunction);
                }

            };
    }])
    .directive('resizeControll', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    window.onresize = function () {
                        for (var i = 0; i < $rootScope.resizeFunction.length; i++) {
                            $rootScope.resizeFunction[i].call(this);
                        }
                    }
                }
            }
    }])
    .directive('nbLink', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.bind("click", function (e) {
                        window.location.href = element.find('a').attr('href');
                        e.preventDefault();
                        if (e.stopImmediatePropagation)
                            e.stopImmediatePropagation();
                        if (e.stopPropagation)
                            e.stopPropagation();
                        return false;
                    });
                }
            }
    }])
    .directive('nbPreview', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    if (attrs.nbPreview == "") {
                        alert("Provide an attribute to nb-preview");
                        return false;
                    }
                    var watchFunction = function () {
                        var item = scope.$eval(attrs.nbPreview);
                        //console.log(item);
                        if (item && item != "") {
                            element.bind("click", function (e) {
                                console.log(item);
                                alert("open preview (very soon)");
                            });
                        }
                    }
                    scope.$watch(attrs.nbPreview, watchFunction);
                }
            }
    }])
    .directive('nbMap', ["$rootScope",
        function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    //load google map
                    var myLatlng = new google.maps.LatLng(41.8337329, -87.7321555);
                    var myOptions = {
                        zoom: 14,
                        center: myLatlng,
                        scrollwheel: false,
                        navigationControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        draggable: false,
                        disableDoubleClickZoom: true,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                    var map = new google.maps.Map(element[0], myOptions);
                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        animation: google.maps.Animation.BOUNCE,
                        icon: 'images/pin.png',
                        map:map,
                    });
                    /*var contentString =
                        '<div id="map-info">' +
                        '<div>401 N Morgan Street</div>'+
                        '<div>Chicago IL 606042</div>'+
                        '</div>'
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });                
                    infowindow.open(map,marker);*/
                    //google.maps.event.trigger(map, 'resize');
                }
            }
    }]);
});