// Include ngRoute dependency
var app = angular.module("momentumApp", ['ngRoute']);

// Routing configuration
app.config(function ($routeProvider) {
  $routeProvider
    .when('/create-task', {
      templateUrl: 'task-creation.html',
      controller: 'TaskCreationController'
    })
    .when('/tasks', {
      templateUrl: 'tasks.html',
      controller: 'TaskController'
    })
    .otherwise({
      redirectTo: '/tasks'
    });
});

// TaskCreationController definition
app.controller('TaskCreationController', function ($scope) {
  // Controller logic for task creation
});

// TaskController definition
app.controller('TaskController', function ($scope) {
  // Controller logic for viewing tasks
});
