app.controller("TaskController", function ($scope, $http, $location, DataService) {
  // Load Data on Page Load

  function loadTasks() {
    $scope.tasks = DataService.getTasks();
    console.log("📌 Updated Task List:", $scope.tasks);
  }

  DataService.loadData(function () {
    $scope.$applyAsync(function () {
      $scope.tasks = DataService.getTasks();
      $scope.statuses = DataService.getStatuses();
      $scope.priorities = DataService.getPriorities();
      $scope.departments = DataService.getDepartments();
      $scope.employees = DataService.getEmployees();
      loadTasks();

      console.log("📌 Tasks Loaded:", $scope.tasks);
      console.log("📌 Statuses:", $scope.statuses);
      console.log("📌 Priorities:", $scope.priorities);
      console.log("📌 Departments:", $scope.departments);
      console.log("📌 Employees:", $scope.employees);
    });
  });

  $scope.goToCreateTask = function () {
    console.log("✅ Navigating to Task Creation Page...");
    $location.path("/create-task");
  };

  $scope.goToHome = function () {
    console.log("✅ Navigating to Home Page...");
    $location.path("/tasks");
  };

  // Function to get status name by ID
  $scope.getStatus = function (statusId) {
    let status = $scope.statuses.find(s => s.id === statusId);
    return status ? status.name : "უცნობი სტატუსი";
  };

  // Function to get priority color
  $scope.getPriorityColor = function (priorityId) {
    let priority = $scope.priorities.find(p => p.id === priorityId);
    return priority ? { text: "#000", border: priority.color } : { text: "#777777", border: "#777777" };
  };

  // Function to get department name by ID
  $scope.getDepartment = function (departmentId) {
    let department = $scope.departments.find(d => d.id === departmentId);
    return department ? department.name : "უცნობი დეპარტამენტი";
  };


  // Function to get task border color based on status
  $scope.getTaskBorderColor = function (statusId) {
    switch (statusId) {
      case 1: return "#f4b400"; // "დასაწყები" (ყვითელი)
      case 2: return "#ff5722"; // "პროგრესში" (სტაფილოსფერი)
      case 3: return "#ff007f"; // "მზად ტესტირებისთვის" (ვარდისფერი)
      case 4: return "#4285f4"; // "დასრულებული" (ლურჯი)
      default: return "#777777"; // უცნობი სტატუსი (ნაცრისფერი)
    }
  };

  // **📌 თანამშრომლის დამატების მოდალის მენეჯმენტი**
  $scope.isEmployeeModalOpen = false;

  $scope.openEmployeeModal = function () {
    console.log("✅ თანამშრომლის დამატების ფანჯარა გაიხსნა!");
    $scope.isEmployeeModalOpen = true;
  };

  $scope.closeEmployeeModal = function () {
    console.log("❌ თანამშრომლის დამატების ფანჯარა დაიხურა!");
    $scope.isEmployeeModalOpen = false;
  };

  // ✅ Function to navigate to task creation page
  $scope.createNewTask = function () {
    console.log("✅ Navigating to Task Creation Page...");
    $location.path("/create-task");
  };



  // **თანამშრომლის შენახვა**
  $scope.saveEmployee = function () {
    if (!$scope.newEmployee.firstName || !$scope.newEmployee.lastName || !$scope.newEmployee.department) {
      alert("❌ გთხოვთ, შეავსოთ ყველა სავალდებულო ველი!");
      return;
    }

    var API_URL = "https://momentum.redberryinternship.ge/api/employees";
    var TOKEN = "9e7a17a7-7273-4e19-b65e-c2099ef3d817";

    var formData = new FormData();
    formData.append("name", $scope.newEmployee.firstName);
    formData.append("surname", $scope.newEmployee.lastName);
    formData.append("department_id", $scope.newEmployee.department.id);

    if ($scope.newEmployee.avatarFile) {
      formData.append("avatar", $scope.newEmployee.avatarFile, $scope.newEmployee.avatarFile.name);
    }

    $http.post(API_URL, formData, {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": undefined
      }
    }).then(function (response) {
      console.log("✔ თანამშრომელი წარმატებით დაემატა:", response.data); // ✅ Debugging
      alert("✅ თანამშრომელი წარმატებით დაემატა!");

      // Reload Employees from API
      DataService.loadData(function () {
        $scope.$applyAsync(function () {
          $scope.employees = DataService.getEmployees();
          console.log("📌 Updated Employees After Creation:", $scope.employees); // ✅ Debugging
        });
      });

      $scope.closeEmployeeModal();
    }).catch(function (error) {
      console.error("🚨 თანამშრომლის დამატების შეცდომა:", error);
      alert("❌ თანამშრომლის დამატება ვერ მოხერხდა.");
    });
  };




  $scope.getStatus = function (statusId) {
    let status = $scope.statuses.find(s => s.id === statusId);
    return status ? status.name : "უცნობი სტატუსი";
  };

  // ✅ Avatar Upload Functionality
  $scope.triggerFileInput = function () {
    document.getElementById("avatarUpload").click();
  };

  $scope.uploadAvatar = function (element) {
    var file = element.files[0];

    if (!file) return;

    if (!file.type.match("image.*")) {
      $scope.avatarError = "❌ ფაილი უნდა იყოს სურათის ფორმატში.";
      $scope.$apply(); // Ensure changes are detected
      return;
    }

    if (file.size > 600 * 1024) {
      $scope.avatarError = "❌ სურათი არ უნდა აღემატებოდეს 600KB-ს.";
      $scope.$apply(); // Ensure changes are detected
      return;
    }

    // ✅ Ensure `newEmployee` exists
    if (!$scope.newEmployee) {
      $scope.newEmployee = {};
    }

    // ✅ Wrap inside `$scope.$applyAsync()` to avoid `$apply()` conflict
    $scope.$applyAsync(() => {
      $scope.newEmployee.avatarFile = file;
      $scope.newEmployee.avatar = URL.createObjectURL(file);
      $scope.avatarError = "";
    });
  };


  $scope.getStatusClass = function (statusName) {
    switch (statusName) {
      case "დასაწყები": return "status-started";
      case "პროგრესში": return "status-in-progress";
      case "მზად ტესტირებისთვის": return "status-ready-for-testing";
      case "დასრულებული": return "status-completed";
      default: return "";
    }
  };


  $scope.getTaskBorderColor = function (statusId) {
    switch (statusId) {
      case 1: return "#f4b400"; // "დასაწყები" (ყვითელი)
      case 2: return "#ff5722"; // "პროგრესში" (სტაფილოსფერი)
      case 3: return "#ff007f"; // "მზად ტესტირებისთვის" (ვარდისფერი)
      case 4: return "#4285f4"; // "დასრულებული" (ლურჯი)
      default: return "#777777"; // უცნობი სტატუსი (ნაცრისფერი)
    }
  };


  $scope.getPriorityColor = function (priorityId) {
    let priority = $scope.priorities.find(p => p.id === priorityId);

    if (!priority) {
      console.warn(`❌ Priority ID ${priorityId} not found.`);
      return { text: "#777777", border: "#777777" };
    }

    switch (priority.name) {
      case "მაღალი": return { text: "#d32f2f", border: "#d32f2f" };
      case "საშუალო": return { text: "#f4b400", border: "#f4b400" };
      case "დაბალი": return { text: "#388e3c", border: "#388e3c" };
      default: return { text: "#777777", border: "#777777" };
    }
  };

  $scope.getPriority = function (priorityId) {
    if (!$scope.priorities || !$scope.priorities.length) {
      console.warn("❌ Priorities array is empty!");
      return { name: "UNKNOWN PRIORITY" };
    }

    let priority = $scope.priorities.find(p => p.id === priorityId);
    if (!priority) {
      console.warn(`❌ Priority ID ${priorityId} not found in priorities list.`);
      return { name: "UNKNOWN PRIORITY" };
    }

    return priority;
  };


  $scope.getDepartmentColor = function (departmentId) {
    switch (departmentId) {
      case 1: return "#FF5722"; // 🟠 ადმინისტრაციის დეპარტამენტი (Orange)
      case 2: return "#9C27B0"; // 🟣 ადამიანური რესურსების დეპარტამენტი (Purple)
      case 3: return "#F4B400"; // 🟡 ფინანსების დეპარტამენტი (Yellow)
      case 4: return "#2196F3"; // 🔵 გაყიდვები და მარკეტინგის დეპარტამენტი (Blue)
      case 5: return "#4CAF50"; // 🟢 ლოჯისტიკის დეპარტამენტი (Green)
      case 6: return "#E91E63"; // 🔴 ტექნოლოგიების დეპარტამენტი (Pink)
      case 7: return "#795548"; // 🟤 მედიის დეპარტამენტი (Brown)
      default: return "#777777"; // ⚪ Default (Gray)
    }
  };




  $scope.getDepartment = function (departmentId) {
    if (!$scope.departments || !$scope.departments.length) {
      console.warn("❌ Departments array is empty!");
      return { name: "UNKNOWN DEPARTMENT" };
    }

    let department = $scope.departments.find(d => d.id === departmentId);
    if (!department) {
      console.warn(`❌ Department ID ${departmentId} not found.`);
      return { name: "UNKNOWN DEPARTMENT" };
    }

    const departmentShortNames = {
      1: "ადმინისტრაცია",
      2: "HR",
      3: "ფინანსები",
      4: "მარკეტინგი",
      5: "ლოჯისტიკა",
      6: "ინფ. ტექ",
      7: "მედია"
    };

    return { name: departmentShortNames[departmentId] || department.name };
  };

  $scope.getDepartmentIcon = function (departmentId) {
    switch (departmentId) {
      case 1: return { text: "#d32f2f", border: "#d32f2f" }; // High (Red)
      case 2: return { text: "#f4b400", border: "#f4b400" }; // Medium (Yellow)
      case 3: return { text: "#388e3c", border: "#388e3c" }; // Low (Green)
      default: return { text: "#777777", border: "#777777" }; // Default (Gray)
    }
  };

  $scope.getDepartmentIcon = function (departmentId) {
    return "";
  };
});

app.controller("TaskCreationController", function ($scope, $http, $location, DataService) {
  console.log("✅ TaskCreationController Loaded!");

  // ✅ Initialize task object
  $scope.newTask = {
    title: "",
    description: "",
    priority: null,
    status: null,
    department: null,
    employee: null,
    dueDate: new Date().toISOString().split("T")[0]
  };

  // ✅ Load Priorities, Statuses, and Departments
  DataService.loadData(function () {
    $scope.$applyAsync(function () {
      $scope.priorities = DataService.getPriorities();
      $scope.statuses = DataService.getStatuses();
      $scope.departments = DataService.getDepartments();
      $scope.employees = DataService.getEmployees(); // ✅ Fetch all employees

      console.log("📌 Employees in Task Creation:", $scope.employees);
    });
  });

  // ✅ Watch for department selection and filter employees
  $scope.$watch("newTask.department", function (newValue) {
    if (newValue && newValue.id) {
      console.log("employees are here", $scope.employees)
      $scope.filteredEmployees = $scope.employees.filter(
        employee => employee.department.id === newValue.id
      );

      console.log("📌 Filtered Employees for Department:", newValue.id, $scope.filteredEmployees);
      $scope.newTask.employee = null; // Reset employee selection
    }
  });


  // ✅ Task submission function
  $scope.submitTask = function () {
    console.log("Task Submission started...")
    if ($scope.taskForm.$valid) {
      const API_URL = "https://momentum.redberryinternship.ge/api/tasks";
      const TOKEN = "9e7a17a7-7273-4e19-b65e-c2099ef3d817";
      console.log($scope.newTask.employee)
      const taskData = {
        "name": "შექმენით readme ფაილი",
        "description": "აღწერეთ შესრულებული დავალება რიდმი ფაილით",
        "due_date": "2025-12-31",
        "status_id": 1,
        "employee_id": 1,
        "priority_id": 1
      };
      console.log(taskData)
      $http.post(API_URL, taskData, {
        headers: {
          "Authorization": "Bearer " + TOKEN,
          "Content-Type": undefined
        }
      }).then(function (response) {
        alert("✅ Task Created Successfully!");
        DataService.loadData(function () {
          $scope.$apply(function () {
            $location.path("/tasks");
          });
        });
      }).catch(function (error) {
        console.error("🚨 Error creating task:", error);
        alert("❌ Failed to create task.");
      });
    } else {
      alert("❌ Please fill in all required fields.");
    }
  };
});


