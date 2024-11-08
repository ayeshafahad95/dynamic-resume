var _a;
var resumeForm = document.getElementById("resumeForm");
var resumeOutput = document.getElementById("resumeOutput");
var profilePictureInput = document.getElementById("profilePicture");
var profilePicturePreview = document.getElementById("profilePicturePreview");
var pictureUrl = null;
if (profilePictureInput && profilePicturePreview) {
    profilePictureInput.addEventListener("change", function (event) {
        var _a;
        var target = event.target;
        var file = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                if ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) {
                    pictureUrl = e.target.result;
                    profilePicturePreview.style.backgroundImage = "url(".concat(pictureUrl, ")");
                }
            };
            reader.readAsDataURL(file);
        }
    });
}
resumeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    generateResume();
});
// Functions to dynamically add fields for languages, education, higher education, work experience, and skills
function addLanguage() {
    var languageList = document.getElementById("languageList");
    var newLanguage = document.createElement("div");
    newLanguage.innerHTML = "\n        <input type=\"text\" name=\"language[]\" placeholder=\"Language\" required>\n        <select name=\"proficiency[]\">\n            <option value=\"Fluent\">Fluent</option>\n            <option value=\"Intermediate\">Intermediate</option>\n            <option value=\"Basic\">Basic</option>\n        </select>\n    ";
    languageList.appendChild(newLanguage);
}
function addEducationField() {
    var educationList = document.getElementById("educationList");
    var newEducation = document.createElement("div");
    newEducation.innerHTML = "\n        <input type=\"text\" name=\"educationLevel[]\" placeholder=\"Education Level\" required>\n        <input type=\"text\" name=\"institution[]\" placeholder=\"Institution\" required>\n        <input type=\"text\" name=\"educationFrom[]\" placeholder=\"From\" required>\n        <input type=\"text\" name=\"educationTo[]\" placeholder=\"To\" required>\n    ";
    educationList.appendChild(newEducation);
}
function addHigherEducationField() {
    var higherEducationList = document.getElementById("higherEducationList");
    var newHigherEducation = document.createElement("div");
    newHigherEducation.innerHTML = "\n        <input type=\"text\" name=\"higherEducationLevel[]\" placeholder=\"Degree\" required>\n        <input type=\"text\" name=\"higherInstitution[]\" placeholder=\"Institution\" required>\n        <input type=\"text\" name=\"higherEducationFrom[]\" placeholder=\"From\" required>\n        <input type=\"text\" name=\"higherEducationTo[]\" placeholder=\"To\" required>\n    ";
    higherEducationList.appendChild(newHigherEducation);
}
function addWorkField() {
    var workList = document.getElementById("workList");
    var newWork = document.createElement("div");
    newWork.innerHTML = "\n        <input type=\"text\" name=\"jobTitle[]\" placeholder=\"Job Title\" required>\n        <input type=\"text\" name=\"company[]\" placeholder=\"Company\" required>\n        <input type=\"text\" name=\"workFrom[]\" placeholder=\"From\" required>\n        <input type=\"text\" name=\"workTo[]\" placeholder=\"To\" required>\n    ";
    workList.appendChild(newWork);
}
function addSkillField() {
    var skillsList = document.getElementById("skillsList");
    var newSkill = document.createElement("div");
    newSkill.innerHTML = "<input type=\"text\" name=\"skills[]\" placeholder=\"Skill\" required>";
    skillsList.appendChild(newSkill);
}
// Function to generate the resume content
function generateResume() {
    var formData = new FormData(resumeForm);
    // Personal Information
    var picture = formData.get("picture");
    var name = formData.get("name");
    var age = formData.get("age");
    var phone = formData.get("phone");
    var email = formData.get("email");
    var location = formData.get("location");
    var objective = formData.get("objective");
    var aboutMe = formData.get("aboutMe");
    // Additional Information
    var languages = formData.getAll("language[]");
    var proficiency = formData.getAll("proficiency[]");
    var educationLevels = formData.getAll("educationLevel[]");
    var institutions = formData.getAll("institution[]");
    var educationFrom = formData.getAll("educationFrom[]");
    var educationTo = formData.getAll("educationTo[]");
    var jobTitles = formData.getAll("jobTitle[]");
    var companies = formData.getAll("company[]");
    var workFrom = formData.getAll("workFrom[]");
    var workTo = formData.getAll("workTo[]");
    var skills = formData.getAll("skills[]");
    resumeOutput.innerHTML = "\n     <div class=\"profile-section\" style=\"background-color: darkbrown; padding: 10px;\">\n            <img src=\"".concat(pictureUrl !== null && pictureUrl !== void 0 ? pictureUrl : 'profile.png', "\" alt=\"Profile Picture\" class=\"profile-picture\" id=\"outputProfilePicture\">\n            <h2>").concat(name, "</h2>\n            <p>Age: ").concat(age, "</p>\n            <p>Phone: ").concat(phone, "</p>\n            <p>Email: ").concat(email, "</p>\n            <p>Location: ").concat(location, "</p>\n            <p>Skills: ").concat(skills, "</p>\n        </div>\n        <div class=\"info-section\" style=\"background-color: lightbrown; padding: 10px;\">\n            <h3>Objective</h3>\n            <p>").concat(objective, "</p>\n            <h3>About Me</h3>\n            <p>").concat(aboutMe, "</p>\n            <h3>Languages</h3>\n            <ul>\n                ").concat(languages.map(function (lang, i) { return "<li>".concat(lang, " - ").concat(proficiency[i], "</li>"); }).join(""), "\n            </ul>\n            <h3>Education</h3>\n            <ul>\n                ").concat(educationLevels.map(function (level, i) { return "\n                    <li>".concat(level, " at ").concat(institutions[i], ", ").concat(educationFrom[i], " - ").concat(educationTo[i], "</li>\n                "); }).join(""), "\n            </ul>\n            <h3>Work Experience</h3>\n            <ul>\n                ").concat(jobTitles.map(function (title, i) { return "\n                    <li>".concat(title, " at ").concat(companies[i], ", ").concat(workFrom[i], " - ").concat(workTo[i], "</li>\n                "); }).join(""), "\n            </ul>\n        </div>\n    ");
    // Add download button
    var downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download as PDF";
    downloadBtn.className = "download-button";
    downloadBtn.onclick = downloadPDF;
    resumeOutput.appendChild(downloadBtn);
    // Placeholder for shareable link (to be implemented)
    var shareLink = document.createElement("button");
    shareLink.textContent = "Generate Shareable Link";
    shareLink.className = "share-button";
    shareLink.onclick = generateShareableLink;
    resumeOutput.appendChild(shareLink);
}
// Handle Profile Picture Preview
(_a = document.getElementById('profilePicture')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function () {
    var _a;
    var file = (_a = this.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            document.getElementById('outputProfilePicture').src = reader_1.result;
        };
        reader_1.readAsDataURL(file);
    }
    else {
        document.getElementById('outputProfilePicture').src = 'profile.png'; // Default image
    }
});
// Download Resume as PDF
function downloadPDF() {
    var resume = document.getElementById('resumeOutput');
    var options = {
        margin: 0,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    if (resume) {
        html2pdf().from(resume).set(options).save();
    }
}
// Generate Shareable Link
function generateShareableLink() {
    var uniqueId = "resume-".concat(Date.now());
    var url = "".concat(window.location.href, "?id=").concat(uniqueId);
    prompt("Here is your shareable link:", url);
}
