angular.module('starter.controllers', [])

.controller("RoomController", function($scope, $stateParams, RoomService, $location, ChatService) {
  RoomService.setCurrentRoom($stateParams.roomID);
  $scope.rooms = RoomService.getRooms();
  $scope.roomID = $stateParams.roomID;
  $scope.currentRoom = RoomService.getCurrentRoom()

  $scope.newRoom = function() {
    $location.url("/new");
  }

  $scope.messages = ChatService.getMessages($scope.roomID);

  $scope.addMessage = function() {
    message = $scope.message;
    $scope.message = "";
    ChatService.addMessage(message)
    $scope.messages = ChatService.getMessages($scope.roomID);
  }

  $scope.keyEvent = function(e) {
    if (e.keyCode == 13) {
      $scope.addMessage();
      e.preventDefault(); // Don't print the enter
    }
  };
})

.controller("MenuController", function($ionicSideMenuDelegate, RoomService, $scope, $location) {
  $scope.rooms = RoomService.getRooms();

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.go = function(path) {
    $ionicSideMenuDelegate.toggleLeft(false);
    $location.path(path);
  };
})

.controller("LandingController", function() {
  //$scope.title = "GeoChat";
})

.controller("NewRoomController", function($scope, NewRoomService) {
  $scope.markers = []
  $scope.map = {
    center: {
        latitude: 45,
        longitude: -73
    },
    zoom: 3,
    events: {
      click: function(mapModel, eventName, originalEventArgs) {
        lat = originalEventArgs[0].latLng.lat()
        lng = originalEventArgs[0].latLng.lng()
        $scope.markers.push({latitude: lat, longitude: lng});
        $scope.$apply();
        NewRoomService.addRoom(lat, lng);
      }
    }   
  };
});