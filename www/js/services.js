angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})



.factory("NewRoomService", function(RoomService, $location) {

  return {
    addRoom: function (lat, lng) {
      newRoomID = RoomService.getRooms()[RoomService.getRooms().length-1] + 1;
      RoomService.addRoom(newRoomID);
      $location.url("/room/" + newRoomID)
    }
  }

})


.factory("RoomService", function() {
  var rooms = [23, 49];
  var currentRoom = 0;

  return {    
    setCurrentRoom: function(roomID) { currentRoom = roomID; },
    getCurrentRoom: function(roomID) { return currentRoom; },
    getRooms: function() { return rooms },
    addRoom: function(roomID) { rooms.push(roomID); }
  }
})

.factory("ChatService", function (RoomService, $rootScope) {
  var messages = 
    { 23: [
            {time: new Date(), from: "Steve", to: "John", room: 514, message: "Soop brah"},
            {time: new Date() + 1, from: "John", to: "Steve", room: 514, message: "nm hbu?"},
            {time: new Date() + 2, from: "Steve", to: "John", room: 514, message: "Meh"}
          ],
      49: [
            {time: new Date() + 1, from: "John", to: "Steve", room: 514, message: "nm hbu?"},
          ]
    };

  return {
    getMessages: function(roomID) { return messages[roomID] }, 
    addMessage: function (message) {
      message = {time: new Date(), from: "Me", to: "other", room: RoomService.getCurrentRoom(), message: message}

      if (! (RoomService.getCurrentRoom() in messages)) {
        messages[RoomService.getCurrentRoom()] = []
      }
      messages[RoomService.getCurrentRoom()].push(message);
    }
  }
})


.factory('SocketService', function ($rootScope) {
  var socket = "3" //io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});