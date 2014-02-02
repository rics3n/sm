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

.controller('AppCtrl', function AppCtrl($scope, $location, $http, $compile) {
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
                lat: 52.550963,
                lng: 13.408917,
                zoom: 15
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
                    openstreetmap: {
                        name: 'Open Street Map',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            continuousWorld: true
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
                        name: 'Open Cycle Map',
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
        };

        $scope.title = "Juhuu";

        $http.get('smallternative/app/home/marker_popup.tpl.html').then(function(r) {
            var htmlString = r.data;
            var popupTemplate = Handlebars.compile(htmlString);

            var gottlob = {
                title: "Gottlob",
                street: "Akazienstr. 17",
                city: "10823 Berlin",
                lat: 52.48947,
                lng: 13.35367,
                img: "assets/images/gottlob.jpg",
                description: "Gottlob gibt es noch Restaurant-Cafés, in denen der Zufriedenheit der Gäste ein hoher Stellenwert beigemessen und Fauxpas mit Größe begegnet wird. Ein gemütliches Etablissement mit leichter Patina, aber mit goldenem Stuck und Kristall-Leuchten verzierten Wänden und einer reichhaltigen Feinschmecker-Karte."
            }

            var deargoods = {
                title: "DearGoods",
                street: "Schivelbeiner Straße 35",
                city: "10439 Berlin",
                lat: 52.550963,
                lng: 13.408917,
                img: "assets/images/dear.jpg",
                description: "DearGoods ist der Concept Store für Mode und Lifestyle mit dreifach ... Vegan, Bio Kleidung, Grüne Mode, Green Fashion, Greenlifestyle, Berlin, München, Fair ..."
            }

            var blau = {
                title: "Bar Blaumilchkanal",
                street: "Schivelbeiner Straße 23",
                city: "10439 Berlin",
                lat: 52.551156,
                lng: 13.405221,
                img: "assets/images/blau.jpg",
                description: "Neben frisch gemixten Cocktails, cremigen Milchshakes, leckeren Longdrinks und erlesenen Weinen servieren wir frisch gezapftes Rollberger – »Finest Natural Bier aus Berlin«. Dieses süffige, naturbelassene Bier kommt direkt aus einer kleinen Berliner Privatbrauerei. Hungrig? Kein Problem – wir bereiten gern Snacks und kleine Gerichte für euch zu"
            }

            var alnatura = {
                title: "Alnatura Super Natur Markt",
                street: "Schönhauser Allee 108",
                city: "10439 Berlin",
                lat: 52.551723,
                lng: 13.413727,
                img: "assets/images/alna.jpeg",
                description: "Mit unseren Produkten wollen wir Sinnvolles für Mensch und Erde bewirken. Gegründet wurde Alnatura 1984 von Prof. Dr. Götz E. Rehn, der auch heute noch einer der beiden Geschäftsführer des Unternehmens ist, ihm zur Seite steht Wulf K. Bauer."
            }



            var gootlobHtml = popupTemplate(gottlob);
            var deargoodsHtml = popupTemplate(deargoods);
            var blauHtml = popupTemplate(blau);
            var alnaturaHtml = popupTemplate(alnatura);

            $scope.markers['gottlobMarker'] = {
                lat: gottlob.lat,
                lng: gottlob.lng,
                focus: false,
                message: gootlobHtml,
                title: "Marker",
                draggable: false,
                layer: 'cafes',
                icon: redIcon

            }

            $scope.markers['deargoodsMarker'] = {
                lat: deargoods.lat,
                lng: deargoods.lng,
                focus: false,
                message: deargoodsHtml,
                title: "Marker",
                draggable: false,
                layer: 'shopping',
                icon: greenIcon

            }

            $scope.markers['alnaturaMarker'] = {
                lat: alnatura.lat,
                lng: alnatura.lng,
                focus: false,
                message: alnaturaHtml,
                title: "Marker",
                draggable: false,
                layer: 'cafes',
                icon: redIcon

            }

            $scope.markers['blauMarker'] = {
                lat: blau.lat,
                lng: blau.lng,
                focus: false,
                message: blauHtml,
                title: "Marker",
                draggable: false,
                layer: 'cafes',
                icon: redIcon

            }

        });

    });
});