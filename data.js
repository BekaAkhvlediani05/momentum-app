var appData = {
  tasks: [
    // ✅ "დასაწყები" (4 დავალება)
    { id: 1, title: "UI დიზაინის შექმნა", description: "შექმენი მთავარი გვერდის დიზაინი Figma-ში.", priority_id: 2, department_id: 2, status_id: 1, due_date: "25 მარტი, 2024", comments: 3, avatar: "assets/profile.jpeg" },
    { id: 2, title: "Backend API სტრუქტურა", description: "მოხდეს API-ს კონფიგურაცია Node.js-ში.", priority_id: 1, department_id: 3, status_id: 1, due_date: "26 მარტი, 2024", comments: 5, avatar: "assets/profile.jpeg" },
    { id: 3, title: "მონაცემთა ბაზის შექმნა", description: "MongoDB სტრუქტურის შემუშავება.", priority_id: 3, department_id: 3, status_id: 1, due_date: "27 მარტი, 2024", comments: 2, avatar: "assets/profile.jpeg" },
    { id: 4, title: "ლოგისტიკის სისტემის ანალიზი", description: "მოხდეს ბაზრის კვლევა და მომხმარებლის საჭიროებების განსაზღვრა.", priority_id: 2, department_id: 4, status_id: 1, due_date: "28 მარტი, 2024", comments: 4, avatar: "assets/profile.jpeg" },

    // ✅ "პროგრესში" (4 დავალება)
    { id: 5, title: "React-ის ინტეგრაცია", description: "შექმენი კომპონენტები და state-მენეჯმენტი.", priority_id: 1, department_id: 3, status_id: 2, due_date: "29 მარტი, 2024", comments: 6, avatar: "assets/profile.jpeg" },
    { id: 6, title: "UI/UX ტესტირება", description: "მომხმარებლის გამოცდილების ოპტიმიზაცია.", priority_id: 3, department_id: 2, status_id: 2, due_date: "30 მარტი, 2024", comments: 7, avatar: "assets/profile.jpeg" },
    { id: 7, title: "AWS სერვერის კონფიგურაცია", description: "EC2 ინსტანციების მომზადება.", priority_id: 2, department_id: 3, status_id: 2, due_date: "31 მარტი, 2024", comments: 3, avatar: "assets/profile.jpeg" },
    { id: 8, title: "ქვიზ აპლიკაციის ლოგიკა", description: "შექმენი Backend სისტემის ლოგიკა.", priority_id: 1, department_id: 3, status_id: 2, due_date: "1 აპრილი, 2024", comments: 5, avatar: "assets/profile.jpeg" },

    // ✅ "მზად ტესტირებისთვის" (4 დავალება)
    { id: 9, title: "მონაცემთა უსაფრთხოების ანალიზი", description: "სისტემის უსაფრთხოების ტესტირება.", priority_id: 3, department_id: 3, status_id: 3, due_date: "2 აპრილი, 2024", comments: 2, avatar: "assets/profile.jpeg" },
    { id: 10, title: "ცხრილების ოპტიმიზაცია", description: "SQL მონაცემთა ბაზის სტრუქტურის გაუმჯობესება.", priority_id: 2, department_id: 3, status_id: 3, due_date: "3 აპრილი, 2024", comments: 4, avatar: "assets/profile.jpeg" },
    { id: 11, title: "საიტის SEO ოპტიმიზაცია", description: "SEO სტრატეგიების დანერგვა.", priority_id: 1, department_id: 1, status_id: 3, due_date: "4 აპრილი, 2024", comments: 3, avatar: "assets/profile.jpeg" },
    { id: 12, title: "მომხმარებელთა ანალიტიკა", description: "მონაცემთა შეგროვების სისტემის ინტეგრაცია.", priority_id: 3, department_id: 1, status_id: 3, due_date: "5 აპრილი, 2024", comments: 6, avatar: "assets/profile.jpeg" },

    // ✅ "დასრულებული" (4 დავალება)
    { id: 13, title: "მობილური აპლიკაციის ინტერფეისი", description: "Flutter-ზე UI ელემენტების დიზაინი.", priority_id: 2, department_id: 2, status_id: 4, due_date: "6 აპრილი, 2024", comments: 5, avatar: "assets/profile.jpeg" },
    { id: 14, title: "Docker-ის კონფიგურაცია", description: "CI/CD პაიპლაინის შექმნა.", priority_id: 1, department_id: 3, status_id: 4, due_date: "7 აპრილი, 2024", comments: 4, avatar: "assets/profile.jpeg" },
    { id: 15, title: "ბიზნეს ანალიტიკა", description: "BI სისტემის ჩაშენება Dashboard-ში.", priority_id: 3, department_id: 1, status_id: 4, due_date: "8 აპრილი, 2024", comments: 6, avatar: "assets/profile.jpeg" },
    { id: 16, title: "ინვოისების გენერაცია", description: "PDF ინვოისების ავტომატიზაცია.", priority_id: 2, department_id: 4, status_id: 4, due_date: "9 აპრილი, 2024", comments: 7, avatar: "assets/profile.jpeg" }
  ],
  statuses: [],
  priorities: [],
  departments: [],
  employees: []
};

// API-დან მონაცემების წამოღება
function fetchData(callback) {
  var API_URL = "https://momentum.redberryinternship.ge/api";
  var TOKEN = "9e7a17a7-7273-4e19-b65e-c2099ef3d817"; // ✅ ტოკენი

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
    fetch(API_URL + "/employees", httpOptions).then(res => res.json()).then(data => appData.employees = data)
  ]).then(() => {
    console.log("✅ მონაცემები ჩაიტვირთა API-დან:", appData);
    if (callback) callback();
  }).catch(error => console.error("🚨 API Load Error:", error));
}

