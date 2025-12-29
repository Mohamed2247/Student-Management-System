window.onload = function () {
  if (localStorage.getItem("isLoggedIn") === "true") {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("systemBox").classList.remove("hidden");
  }
};

function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let error = document.getElementById("loginError");

  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

  if (username === "") {
    error.innerText = "Username is required";
    return;
  }

  if (!passwordRegex.test(password)) {
    error.innerText =
      "Password must be at least 8 characters, contain uppercase, lowercase and special character";
    return;
  }

  // Save login state
  localStorage.setItem("isLoggedIn", "true");

  error.innerText = "";
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("systemBox").classList.remove("hidden");
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  location.reload();
}

let students = ["Ahmed", "Mohamed", "Sara", "Ali", "Nour"];
let grades = [85, 45, 70, 30, 95];

let isVisible = false;

function toggleStudents() {
  let outputDiv = document.getElementById("output");
  let btn = document.getElementById("toggleBtn");

  if (!isVisible) {
    let output = "";
    let total = 0;
    let max = grades[0];
    let min = grades[0];

    for (let i = 0; i < students.length; i++) {
      total += grades[i];

      if (grades[i] > max) max = grades[i];
      if (grades[i] < min) min = grades[i];

      let status = grades[i] >= 50 ? "Pass" : "Fail";
      let className = grades[i] >= 50 ? "pass" : "fail";

      output += `<p>${students[i]} : ${grades[i]} 
            <span class="${className}">(${status})</span></p>`;
    }

    let average = total / students.length;

    output += `<hr>`;
    output += `<p><strong>Average:</strong> ${average}</p>`;
    output += `<p><strong>Highest Grade:</strong> ${max}</p>`;
    output += `<p><strong>Lowest Grade:</strong> ${min}</p>`;

    outputDiv.innerHTML = output;
    btn.innerText = "Hide Students";
    isVisible = true;
  } else {
    outputDiv.innerHTML = "";
    btn.innerText = "Show Students";
    isVisible = false;
  }
}

function searchStudent() {
  let name = document.getElementById("searchName").value.toLowerCase();
  let found = false;

  for (let i = 0; i < students.length; i++) {
    if (students[i].toLowerCase() === name) {
      document.getElementById(
        "searchResult"
      ).innerText = `Grade of ${students[i]} is ${grades[i]}`;
      found = true;
      break;
    }
  }

  if (!found) {
    document.getElementById("searchResult").innerText = "Student not found";
  }
}
