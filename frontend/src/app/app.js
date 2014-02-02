angular.module('ngBoilerplate', [
    'ngBoilerplate.home',
    'ngBoilerplate.about',
    'ui.router',
    'leaflet-directive'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
})

.run(function run() {})

.controller('AppCtrl', function AppCtrl($scope, $location) {
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + ' | Smallternative';
        };

        var greenIcon = {
            iconUrl: 'assets/images/leaf-green.png',
            shadowUrl: 'assets/images/leaf-shadow.png',

            iconSize: [38, 95], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62], // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        };

        var redIcon = {
            iconUrl: 'assets/images/leaf-red.png',
            shadowUrl: 'assets/images/leaf-shadow.png',

            iconSize: [38, 95], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62], // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        };


        angular.extend($scope, {
            berlin: {
                lat: 52.52,
                lng: 13.38,
                zoom: 13
            },
            layers: {
                baselayers: {
                    cloudmade1: {
                        name: 'Cloudmade Right the City',
                        type: 'xyz',
                        url: 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
                        layerParams: {
                            key: 'a73791e37b8448e6b55e3980a44412a0',
                            styleId: 1714
                        },
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            continuousWorld: true,
                            top: true
                        }
                    },
                    cloudmade2: {
                        name: 'Cloudmade Gry',
                        type: 'xyz',
                        url: 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
                        layerParams: {
                            key: 'a73791e37b8448e6b55e3980a44412a0',
                            styleId: 22677
                        },
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            continuousWorld: true,
                            top: true
                        }
                    },
                    cloudmade3: {
                        name: 'Cloudmade Light',
                        type: 'xyz',
                        url: 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
                        layerParams: {
                            key: 'a73791e37b8448e6b55e3980a44412a0',
                            styleId: 1930
                        },
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            continuousWorld: true,
                            top: true
                        }
                    },
                    cloudmade4: {
                        name: 'Cloudmade Right the City with subway',
                        type: 'xyz',
                        url: 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
                        layerParams: {
                            key: 'a73791e37b8448e6b55e3980a44412a0',
                            styleId: 120626
                        },
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            continuousWorld: true,
                            top: true
                        }
                    },
                    cycle: {
                        name: 'OpenCycleMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.opencyclemap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
                        }
                    }

                },
                overlays: {
                    shopping: {
                        type: 'group',
                        name: 'Shopping',
                        visible: true,
                        
                    },

                    cafes: {
                        type: 'group',
                        name: 'Cafes',
                        visible: true,
                    }
                }

            }
        });

        $scope.markers = {
            mainMarker: {
                lat: 52.522553,
                lng: 13.390947,
                focus: false,
                message: "<h1>This is the first Shop</h1>",
                title: "Marker",
                draggable: false,
                layer: 'shopping',
                icon: greenIcon
                
            },
            secondMarker: {
                lat: 52.525553,
                lng: 13.401947,
                focus: false,
                message: "This is the firs Cafe",
                title: "Marker",
                draggable: false,
                layer: 'cafes',
                icon: redIcon
            }
        }

    });
});