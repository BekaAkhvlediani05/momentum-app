app.service("DataService", function ($rootScope) {
  this.loadData = function (callback) {
    fetchData(function () {
      $rootScope.$apply();
      if (callback) callback();
    });
  };

  this.getStatuses = function () {
    return appData.statuses;
  };

  this.getPriorities = function () {
    return appData.priorities;
  };

  this.getDepartments = function () {
    return appData.departments;
  };

  this.getEmployees = function () {
    return appData.employees;
  };

  this.getTasks = function () {
    return appData.tasks;
  };
});
