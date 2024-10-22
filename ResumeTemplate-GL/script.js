function addNewEqField(){
    
    let newNode=document.createElement("textarea");
    newNode.classList.add("form-control") ;
    newNode.classList.add("eqField");
    newNode.classList.add("mt-2");
    newNode.setAttribute("rows", 3);
    newNode.setAttribute('placeholder', 'Enter here');

    let eqOb = document.getElementById("we")
    let eqAddButtonOb = document.getElementById("eqAddButton");

    eqOb.insertBefore(newNode, eqAddButtonOb);
}
function addNewInField(){

    let newNode=document.createElement("textarea");
    newNode.classList.add("form-control") ;
    newNode.classList.add("inField");
    newNode.classList.add("mt-2");
    newNode.setAttribute("rows", 3);
    newNode.setAttribute('placeholder', 'Enter here');

    let inOb = document.getElementById("in")
    let inAddButtonOb = document.getElementById("inAddButton");

    inOb.insertBefore(newNode, inAddButtonOb);

}

function addNewAcField(){

    let newNode=document.createElement("textarea");
    newNode.classList.add("form-control") ;
    newNode.classList.add("acField");
    newNode.classList.add("mt-2");
    newNode.setAttribute("rows", 3);
    newNode.setAttribute('placeholder', 'Enter here');

    let acOb = document.getElementById("ac")
    let acAddButtonOb = document.getElementById("acAddButton");

    acOb.insertBefore(newNode, acAddButtonOb);
}

//generating cv
function GenerateCV(){
// console.log("generating CV");

let nameField = document.getElementById("nameField").Value;

let nameT1 = document.getElementById("nameT1").Value;

nameT.innerHTML = nameField
}

//direct
document.getElementById("nameT2").innerHTML = document.getElementById("nameField").Value;

document.getElementById("contactT").innerHTML = document.getElementById("contactField").Value;

//emailAddress
document.getElementById("emaT").innerHTML = document.getElementById("emailAddress").Value;

//LinkedInField
document.getElementById("LinT").innerHTML = document.getElementById("LinkedInField").Value;

// Load applicant data from JSON file
const loginForm = document.getElementById("login-form");
const loginPage = document.getElementById("login-page");
const resumePage = document.getElementById("resume-page");
const applicantDetails = document.getElementById("applicant-details");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const searchForm = document.getElementById("search-form");
const errorMessage = document.getElementById("error-message");

// Load applicant data from JSON file
let applicants = [];
fetch("Data.json")
    .then(response => response.json())
    .then(data => {
        applicants = data;
        displayApplicant(0);
    });

// Handle login form submission
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validate username and password
    if (username === "admin" && password === "password") {
        // Store credentials in local storage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        // Hide login page and show resume page
        loginPage.classList.add("hidden");
        resumePage.classList.remove("hidden");
    } else {
        errorMessage.textContent = "Invalid username/password";
    }
});

// Prevent going back to login page
window.history.pushState(null, null, "/resume");
window.addEventListener("popstate", (event) => {
    if (event.state === null) {
        window.history.pushState(null, null, "/resume");
    }
});

// Display applicant details
let currentApplicantIndex = 0;
function displayApplicant(index) {
    const applicant = applicants[index];
    applicantDetails.innerHTML = `
        <p id="applicant-name">${applicant.name}</p>
        <p id="applicant-email">${applicant.email}</p>
        <p id="applicant-job">${applicant.job}</p>
        <p id="applicant-resume">${applicant.resume}</p>
    `;

    // Update button states
    if (index === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    if (index === applicants.length - 1) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

// Handle previous and next button clicks
prevBtn.addEventListener("click", () => {
    currentApplicantIndex--;
    displayApplicant(currentApplicantIndex);
});

nextBtn.addEventListener("click", () => {
    currentApplicantIndex++;
    displayApplicant(currentApplicantIndex);
});

// Handle search form submission
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const jobSearch = document.getElementById("job-search").value;
    const filteredApplicants = applicants.filter(applicant => applicant.job.toLowerCase().includes(jobSearch.toLowerCase()));

    if (filteredApplicants.length === 0) {
        // Display error page for invalid search
        window.location.href = "error.html";
    } else {
        currentApplicantIndex = 0;
        displayApplicant(currentApplicantIndex);
        errorMessage.textContent = "";
    }
});
