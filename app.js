var app = angular.module("momentumApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/tasks", {
      templateUrl: "tasks.html",
      controller: "TaskController"
    })
    .when("/create-task", {
      templateUrl: "task-creation.html",
      controller: "TaskCreationController"
    })
    .otherwise({
      redirectTo: "/tasks"
    });
});

app.run(function ($rootScope, $location) {
  // Function to navigate to home page (tasks)
  $rootScope.goToHome = function () {
    $location.path('/tasks');
  };

  // Function to navigate to task creation page
  $rootScope.goToCreateTask = function () {
    $location.path('/create-task');
  };
});
