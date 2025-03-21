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
  $rootScope.goToCreateTask = function () {
    $location.path("/create-task");
  };

  $rootScope.goToHome = function () {
    $location.path("/tasks");
  };
});
