app.service("DataService", function ($rootScope) {
  const appData = {
    statuses: [],
    priorities: [],
    departments: [],
    employees: [],
    tasks: []
  };

  // ✅ Default Tasks (Preloaded)
  const defaultTasks = [
    {
      id: 1,
      title: "ლოგო დიზაინის განახლება",
      description: "მომხმარებლისთვის ახალი ლოგოს კონცეფცია უნდა შევქმნათ.",
      priority_id: 2,  // საშუალო
      status_id: 1,  // დასაწყები
      department_id: 3,  // დიზაინი
      employee_id: 2,  // თანამშრომელი
      due_date: "2024-03-30"
    },
    {
      id: 2,
      title: "საიტის ოპტიმიზაცია",
      description: "ვებ გვერდის დატვირთვის სიჩქარის გაუმჯობესება.",
      priority_id: 1,  // მაღალი
      status_id: 2,  // პროგრესში
      department_id: 4,  // IT
      employee_id: 3,
      due_date: "2024-04-02"
    },
    {
      id: 3,
      title: "მომხმარებლის გამოკითხვა",
      description: "გამოვკითხოთ მომხმარებლები UX/UI დიზაინის შესახებ.",
      priority_id: 3,  // დაბალი
      status_id: 3,  // მზად ტესტირებისთვის
      department_id: 1,  // მარკეტინგი
      employee_id: 5,
      due_date: "2024-04-05"
    }
  ];

  // ✅ Immediately Assign Default Tasks Before API Fetch
  appData.tasks = defaultTasks;

  // 🔹 Fetch Data from API
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
      fetch(API_URL + "/tasks", httpOptions).then(res => res.json()).then(data => {
        if (data.length > 0) {
          appData.tasks = data;
        }
      })
    ]).then(() => {
      console.log("✅ Data Loaded Successfully!");
      console.log("📌 Tasks in Service:", appData.tasks);
      if (callback) callback();
    }).catch(error => {
      console.error("🚨 API Load Error:", error);
      console.log("❗ Using Default Tasks Instead!");
      if (callback) callback();
    });
  }

  // 🔹 Load Data
  this.loadData = function (callback) {
    fetchData(function () {
      $rootScope.$applyAsync();
      if (callback) callback();
    });
  };

  // 🔹 Getter Functions
  this.getStatuses = function () { return appData.statuses; };
  this.getPriorities = function () { return appData.priorities; };
  this.getDepartments = function () { return appData.departments; };
  this.getEmployees = function () { return appData.employees; };
  this.getTasks = function () { return appData.tasks; };
});
