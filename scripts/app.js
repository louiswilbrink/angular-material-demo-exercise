'use strict'

angular.module('generatedApp', ['ngRoute', 'ngMaterial'])
    .config(function ($routeProvider, $mdIconProvider) {

    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    .when('/aria', {
        templateUrl: 'views/aria.html',
        controller: 'MainCtrl'
    });
})

.controller('MainCtrl', function ($scope, $timeout, $mdUtil, $mdSidenav, $log, $mdDialog, $mdToast, $document) {
    console.log('MainCtrl');

    // *** Sidenav *** //

    $scope.toggleLeft = buildToggler('left');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },200);
      return debounceFn;
    }

    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };

    // *** List *** //

    var imagePath = 'images/profile_image.jpeg';

    $scope.phones = [
      { type: 'Home', number: '(555) 251-1234' },
      { type: 'Cell', number: '(555) 786-9841' },
    ];

    $scope.todos = [
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        face : imagePath,
        what: 'Brunch this weekend?',
        who: 'Min Li Chan',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
    ];

    // *** Grid *** //

    // *** User Menu *** //
    var originatorEv;

    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.announceClick = function(index) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('You clicked!')
          .content('You clicked the menu item at index ' + index)
          .ok('Nice')
          .targetEvent(originatorEv)
      );
      originatorEv = null;
    };

    // *** Toast *** //
    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };
    $scope.toastPosition = angular.extend({},last);
    $scope.getToastPosition = function() {
      sanitizePosition();
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };
    function sanitizePosition() {
      var current = $scope.toastPosition;
      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;
      last = angular.extend({},current);
    }
    $scope.showCustomToast = function() {
      $mdToast.show({
        controller: 'ToastCtrl',
        templateUrl: 'views/toast-template.html',
        parent : $document[0].querySelector('#toastBounds'),
        hideDelay: 6000,
        position: $scope.getToastPosition()
      });
    };
    $scope.showSimpleToast = function() {
      $mdToast.show(
        $mdToast.simple()
          .content('Simple Toast!')
          .position($scope.getToastPosition())
          .hideDelay(3000)
      );
    };
    $scope.showActionToast = function() {
      var toast = $mdToast.simple()
            .content('Action Toast!')
            .action('OK')
            .highlightAction(false)
            .position($scope.getToastPosition());
      $mdToast.show(toast).then(function(response) {
        if ( response == 'ok' ) {
          alert('You clicked \'OK\'.');
        }
      });
    };
})
.controller('DemoCtrl', function () {
    this.topDirections = ['left', 'up'];
    this.bottomDirections = ['down', 'right'];
    this.isOpen = false;
    this.availableModes = ['md-fling', 'md-scale'];
    this.selectedMode = 'md-fling';
    this.availableDirections = ['up', 'down', 'left', 'right'];
    this.selectedDirection = 'up';
})
.controller('ToastCtrl', function($scope, $mdToast) {
  $scope.closeToast = function() {
    $mdToast.hide();
  };
})
.controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet, $mdToast) {
  $scope.alert = '';
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-list-template.html',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem['name'] + ' clicked!';
    });
  };
  $scope.showGridBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'views/bottom-sheet-grid-template.html',
      controller: 'GridBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $mdToast.show(
            $mdToast.simple()
              .content(clickedItem)
              .position('top right')
              .hideDelay(1500)
          );
    });
  };
})
.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.listItemClick = function(clickedItem) {
    $mdBottomSheet.hide(clickedItem);
  };
})
