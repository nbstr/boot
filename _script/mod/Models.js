'use strict';

define(['angular'], function(angular) {

    angular.module('Models', [])
    /*
    |--------------------------------------------------------
    | Laravel SD
    |--------------------------------------------------------
    */
    .factory( '$lsd', [ 'Resource', function( $resource ) {
        return {
            tables: $resource( '_data/lsd.json',
                {
                    id: '@id'
                },
                {
                    query: {
                        method:'GET',
                        isArray:true,
                        transformResponse: function (r) {
                            // console.log(r);
                            return angular.fromJson(r).data.tables
                        }
                    }
                }
            )
        }
    }]);
});