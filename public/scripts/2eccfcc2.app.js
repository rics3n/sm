angular.module("ngBoilerplate",["ngBoilerplate.home","ngBoilerplate.about","ui.router","leaflet-directive"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/home")}]).run(function(){}).controller("AppCtrl",["$scope","$location","$http","$compile",function(a,b,c){a.$on("$stateChangeSuccess",function(b,d){angular.isDefined(d.data.pageTitle)&&(a.pageTitle=d.data.pageTitle+" | Smallternative");var e={iconUrl:"assets/images/leaf-green.png",shadowUrl:"assets/images/leaf-shadow.png",iconSize:[38,95],shadowSize:[50,64],iconAnchor:[22,94],shadowAnchor:[4,62],popupAnchor:[-3,-76]},f={iconUrl:"assets/images/leaf-red.png",shadowUrl:"assets/images/leaf-shadow.png",iconSize:[38,95],shadowSize:[50,64],iconAnchor:[22,94],shadowAnchor:[4,62],popupAnchor:[-3,-76]};angular.extend(a,{berlin:{lat:52.550963,lng:13.408917,zoom:15},layers:{baselayers:{cloudmade1:{name:"Cloudmade Right the City",type:"xyz",url:"http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png",layerParams:{key:"a73791e37b8448e6b55e3980a44412a0",styleId:1714},layerOptions:{subdomains:["a","b","c"],continuousWorld:!0,top:!0}},openstreetmap:{name:"Open Street Map",type:"xyz",url:"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",layerOptions:{subdomains:["a","b","c"],attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',continuousWorld:!0}},cloudmade2:{name:"Cloudmade Gry",type:"xyz",url:"http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png",layerParams:{key:"a73791e37b8448e6b55e3980a44412a0",styleId:22677},layerOptions:{subdomains:["a","b","c"],continuousWorld:!0,top:!0}},cloudmade3:{name:"Cloudmade Light",type:"xyz",url:"http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png",layerParams:{key:"a73791e37b8448e6b55e3980a44412a0",styleId:1930},layerOptions:{subdomains:["a","b","c"],continuousWorld:!0,top:!0}},cloudmade4:{name:"Cloudmade Right the City with subway",type:"xyz",url:"http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png",layerParams:{key:"a73791e37b8448e6b55e3980a44412a0",styleId:120626},layerOptions:{subdomains:["a","b","c"],continuousWorld:!0,top:!0}},cycle:{name:"Open Cycle Map",type:"xyz",url:"http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",layerOptions:{subdomains:["a","b","c"],attribution:'&copy; <a href="http://www.opencyclemap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',continuousWorld:!0}}},overlays:{shopping:{type:"group",name:"Shopping",visible:!0},cafes:{type:"group",name:"Cafes",visible:!0}}}}),a.markers={},a.title="Juhuu",c.get("/app/home/marker_popup.tpl.html").then(function(b){var c=b.data,d=Handlebars.compile(c),g={title:"Gottlob",street:"Akazienstr. 17",city:"10823 Berlin",lat:52.48947,lng:13.35367,img:"/assets/images/gottlob.jpg",description:"Gottlob gibt es noch Restaurant-Cafés, in denen der Zufriedenheit der Gäste ein hoher Stellenwert beigemessen und Fauxpas mit Größe begegnet wird. Ein gemütliches Etablissement mit leichter Patina, aber mit goldenem Stuck und Kristall-Leuchten verzierten Wänden und einer reichhaltigen Feinschmecker-Karte."},h={title:"DearGoods",street:"Schivelbeiner Straße 35",city:"10439 Berlin",lat:52.550963,lng:13.408917,img:"/assets/images/dear.jpg",description:"DearGoods ist der Concept Store für Mode und Lifestyle mit dreifach ... Vegan, Bio Kleidung, Grüne Mode, Green Fashion, Greenlifestyle, Berlin, München, Fair ..."},i={title:"Bar Blaumilchkanal",street:"Schivelbeiner Straße 23",city:"10439 Berlin",lat:52.551156,lng:13.405221,img:"/assets/images/blau.jpg",description:"Neben frisch gemixten Cocktails, cremigen Milchshakes, leckeren Longdrinks und erlesenen Weinen servieren wir frisch gezapftes Rollberger – »Finest Natural Bier aus Berlin«. Dieses süffige, naturbelassene Bier kommt direkt aus einer kleinen Berliner Privatbrauerei. Hungrig? Kein Problem – wir bereiten gern Snacks und kleine Gerichte für euch zu"},j={title:"Alnatura Super Natur Markt",street:"Schönhauser Allee 108",city:"10439 Berlin",lat:52.551723,lng:13.413727,img:"/assets/images/alna.jpeg",description:"Mit unseren Produkten wollen wir Sinnvolles für Mensch und Erde bewirken. Gegründet wurde Alnatura 1984 von Prof. Dr. Götz E. Rehn, der auch heute noch einer der beiden Geschäftsführer des Unternehmens ist, ihm zur Seite steht Wulf K. Bauer."},k=d(g),l=d(h),m=d(i),n=d(j);a.markers.gottlobMarker={lat:g.lat,lng:g.lng,focus:!1,message:k,title:"Marker",draggable:!1,layer:"cafes",icon:f},a.markers.deargoodsMarker={lat:h.lat,lng:h.lng,focus:!1,message:l,title:"Marker",draggable:!1,layer:"shopping",icon:e},a.markers.alnaturaMarker={lat:j.lat,lng:j.lng,focus:!1,message:n,title:"Marker",draggable:!1,layer:"cafes",icon:f},a.markers.blauMarker={lat:i.lat,lng:i.lng,focus:!1,message:m,title:"Marker",draggable:!1,layer:"cafes",icon:f}})})}]),angular.module("config",[]).constant("ENV","prod").constant("API_HOST","/api/v1/").constant("SERVER","/"),angular.module("ngBoilerplate.home",["ui.router","plusOne"]).config(["$stateProvider",function(a){a.state("home",{url:"/home",views:{main:{controller:"HomeCtrl",templateUrl:"app/home/home.tpl.html"}},data:{pageTitle:"Home"}})}]).controller("HomeCtrl",["$scope",function(){}]),angular.module("ngBoilerplate.about",["ui.router","ui.bootstrap"]).config(["$stateProvider",function(a){a.state("about",{url:"/about",views:{main:{controller:"AboutCtrl",templateUrl:"app/about/about.tpl.html"}},data:{pageTitle:"What is It?"}})}]).controller("AboutCtrl",["$scope",function(a){a.dropdownDemoItems=["The first choice!","And another choice for you.","but wait! A third!"]}]),angular.module("plusOne",[]).directive("plusOne",function(){return{link:function(a,b){gapi.plusone.render(b[0],{size:"medium",href:"http://bit.ly/ngBoilerplate"})}}});