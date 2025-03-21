app.service("DataService", function ($rootScope) {
  // Initialize appData object
  const appData = {
    statuses: [],
    priorities: [],
    departments: [],
    employees: [],
    tasks: []
  };

  // Load Data function
  this.loadData = function (callback) {
    fetchData(function () {
      $rootScope.$apply();
      if (callback) callback();
    });
  };

  function fetchData(callback) {
    var API_URL = "https://momentum.redberryinternship.ge/api";
    var TOKEN = "9e7a17a7-7273-4e19-b65e-c2099ef3d817";

    var httpOptions = {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + TOKEN
      }
    };

    Promise.all([
      fetch(API_URL + "/statuses", httpOptions).then(res => res.json()).then(data => appData.statuses = data),
      fetch(API_URL + "/priorities", httpOptions).then(res => res.json()).then(data => appData.priorities = data),
      fetch(API_URL + "/departments", httpOptions).then(res => res.json()).then(data => appData.departments = data),
      fetch(API_URL + "/employees", httpOptions).then(res => res.json()).then(data => appData.employees = data),
      fetch(API_URL + "/tasks", httpOptions).then(res => res.json()).then(data => appData.tasks = data) // Fetch tasks here
    ]).then(() => {
      console.log("✅ Data Loaded:", appData);
      if (callback) callback();
    }).catch(error => console.error("🚨 API Load Error:", error));
  }


  // Getter methods
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
