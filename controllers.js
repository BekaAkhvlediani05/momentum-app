app.controller("TaskController", function ($scope, DataService, $http, $location) {
  // Load tasks from the DataService
  DataService.loadData(function () {
    $scope.$apply(function () {
      $scope.tasks = DataService.getTasks();
      $scope.statuses = DataService.getStatuses();
      $scope.priorities = DataService.getPriorities();
      $scope.departments = DataService.getDepartments();
      $scope.employees = DataService.getEmployees();
    });
  });

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


  app.controller('TaskCreationController', function ($scope, $http, $location, DataService) {
    // Initialize the newTask object to bind form fields
    $scope.newTask = {
      title: "",
      description: "",
      priority: "საშუალო", // Default priority
      status: "დასაწყები", // Default status
      department: null,
      employee: null,
      dueDate: new Date().toISOString().split('T')[0] // Default to today's date
    };

    // Fetch priorities and statuses
    DataService.loadData(function () {
      $scope.priorities = DataService.getPriorities();
      $scope.statuses = DataService.getStatuses();
      $scope.departments = DataService.getDepartments();
      console.log("📌 Priorities, Statuses, and Departments Loaded");
    });

    // Function to filter employees by department
    $scope.$watch('newTask.department', function (newValue) {
      if (newValue) {
        $scope.filteredEmployees = $scope.employees.filter(employee => employee.department_id === newValue.id);
        $scope.newTask.employee = null; // Reset employee if department is changed
      }
    });

    // Function to submit the task form
    $scope.submitTask = function () {
      if ($scope.taskForm.$valid) {
        const API_URL = "https://momentum.redberryinternship.ge/api/tasks";
        const TOKEN = "9e7a17a7-7273-4e19-b65e-c2099ef3d817";  // Your API token

        const formData = new FormData();
        formData.append("title", $scope.newTask.title);
        formData.append("description", $scope.newTask.description);
        formData.append("priority", $scope.newTask.priority);
        formData.append("status", $scope.newTask.status);
        formData.append("department_id", $scope.newTask.department.id);
        formData.append("employee_id", $scope.newTask.employee.id);
        formData.append("due_date", $scope.newTask.dueDate);

        $http.post(API_URL, formData, {
          headers: {
            "Authorization": "Bearer " + TOKEN,
            "Content-Type": undefined // Important for FormData
          }
        }).then(function (response) {
          // Success: Show success alert and reload tasks
          alert("✅ Task created successfully!");
          // Now update the tasks list
          DataService.loadData(function () {
            $scope.$apply(function () {
              // After data is reloaded, the tasks will be updated on the main page.
              $location.path('/tasks');  // Redirect to the tasks page
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


  // **თანამშრომლის შენახვა**
  $scope.saveEmployee = function () {
    // Check if required fields are filled
    if (!$scope.newEmployee.firstName || !$scope.newEmployee.lastName || !$scope.newEmployee.department) {
      alert("❌ გთხოვთ, შეავსოთ ყველა სავალდებულო ველი!");
      return;
    }

    // Prepare the API URL and token
    var API_URL = "https://momentum.redberryinternship.ge/api/employees";
    var TOKEN = "9e7a17a7-7273-4e19-b65e-c2099ef3d817"; // ✅ API Token

    // Create a new FormData object to send the data
    var formData = new FormData();
    formData.append("name", $scope.newEmployee.firstName); // Correct field name for first name
    formData.append("surname", $scope.newEmployee.lastName); // Correct field name for surname
    formData.append("department_id", $scope.newEmployee.department.id); // Correct field for department_id

    // Add avatar file if selected
    if ($scope.newEmployee.avatarFile) {
      formData.append("avatar", $scope.newEmployee.avatarFile, $scope.newEmployee.avatarFile.name); // Correct field for avatar
    } else {
      alert("❌ გთხოვთ, აირჩიოთ სურათი!");
      return;
    }



    // Set up the request config with Authorization and Content-Type headers
    var config = {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": undefined // Important: FormData should not have a content-type, it is handled automatically
      }
    };

    // Send the POST request to the API
    $http.post(API_URL, formData, config)
      .then(function (response) {
        console.log("✔ თანამშრომელი წარმატებით დაემატა:", response.data);
        alert("✅ თანამშრომელი წარმატებით დაემატა!");

        // Update the list of departments and employees from the API
        DataService.loadData(function () {
          $scope.$apply(function () {
            $scope.departments = DataService.getDepartments();
            $scope.employees = DataService.getEmployees();
          });
        });

        // Close the modal
        $scope.closeEmployeeModal();
      })
      .catch(function (error) {
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
