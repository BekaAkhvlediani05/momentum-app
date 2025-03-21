app.controller("TaskController", function ($scope, DataService) {
  // მონაცემების ჩატვირთვა
  DataService.loadData(function () {
    $scope.$apply(function () {
      $scope.tasks = DataService.getTasks();
      console.log("📌 Tasks Loaded:", $scope.tasks);
      $scope.priorities = DataService.getPriorities();
      console.log("📌 Priorities Loaded:", $scope.priorities);
      $scope.statuses = DataService.getStatuses();
      console.log("📌 Statuses Loaded:", $scope.statuses);
      $scope.departments = DataService.getDepartments();
      console.log("📌 Departments Loaded:", $scope.departments);
    });
  });

  // **📌 თანამშრომლის დამატების მოდალის მენეჯმენტი**
  $scope.isEmployeeModalOpen = false;
  $scope.newEmployee = {}; // თანამშრომლის მონაცემები

  // **ღილაკზე დაჭერისას მოდალის გახსნა**
  $scope.openEmployeeModal = function () {
    console.log("✅ თანამშრომლის დამატების ფანჯარა გაიხსნა!");
    $scope.isEmployeeModalOpen = true;
  };

  // **მოდალის დახურვა**
  $scope.closeEmployeeModal = function () {
    console.log("❌ თანამშრომლის დამატების ფანჯარა დაიხურა!");
    $scope.isEmployeeModalOpen = false;
    $scope.newEmployee = {}; // მონაცემების გასუფთავება
  };

  // **თანამშრომლის შენახვა**
  $scope.saveEmployee = function () {
    console.log("✔ ახალი თანამშრომელი:", $scope.newEmployee);
    $scope.closeEmployeeModal();
  };

  $scope.getStatus = function (statusId) {
    let status = $scope.statuses.find(s => s.id === statusId);
    return status ? status.name : "უცნობი სტატუსი";
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
