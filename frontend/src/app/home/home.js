
angular.module( 'ngBoilerplate.home', [
  'ui.router',
  'plusOne'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'app/home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})


.controller( 'HomeCtrl', function HomeController( $scope ) {

});
