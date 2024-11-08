const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
const resumeOutput = document.getElementById("resumeOutput") as HTMLElement;
const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement | null;
const profilePicturePreview = document.getElementById("profilePicturePreview") as HTMLDivElement | null;

let pictureUrl: string | null = null;

if (profilePictureInput && profilePicturePreview) {
    profilePictureInput.addEventListener("change", (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target?.result) {
                    pictureUrl = e.target.result as string;
                    profilePicturePreview.style.backgroundImage = `url(${pictureUrl})`;
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

resumeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    generateResume();
});

// Functions to dynamically add fields for languages, education, higher education, work experience, and skills
function addLanguage() {
    const languageList = document.getElementById("languageList")!;
    const newLanguage = document.createElement("div");
    newLanguage.innerHTML = `
        <input type="text" name="language[]" placeholder="Language" required>
        <select name="proficiency[]">
            <option value="Fluent">Fluent</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Basic">Basic</option>
        </select>
    `;
    languageList.appendChild(newLanguage);
}

function addEducationField() {
    const educationList = document.getElementById("educationList")!;
    const newEducation = document.createElement("div");
    newEducation.innerHTML = `
        <input type="text" name="educationLevel[]" placeholder="Education Level" required>
        <input type="text" name="institution[]" placeholder="Institution" required>
        <input type="text" name="educationFrom[]" placeholder="From" required>
        <input type="text" name="educationTo[]" placeholder="To" required>
    `;
    educationList.appendChild(newEducation);
}

function addHigherEducationField() {
    const higherEducationList = document.getElementById("higherEducationList")!;
    const newHigherEducation = document.createElement("div");
    newHigherEducation.innerHTML = `
        <input type="text" name="higherEducationLevel[]" placeholder="Degree" required>
        <input type="text" name="higherInstitution[]" placeholder="Institution" required>
        <input type="text" name="higherEducationFrom[]" placeholder="From" required>
        <input type="text" name="higherEducationTo[]" placeholder="To" required>
    `;
    higherEducationList.appendChild(newHigherEducation);
}

function addWorkField() {
    const workList = document.getElementById("workList")!;
    const newWork = document.createElement("div");
    newWork.innerHTML = `
        <input type="text" name="jobTitle[]" placeholder="Job Title" required>
        <input type="text" name="company[]" placeholder="Company" required>
        <input type="text" name="workFrom[]" placeholder="From" required>
        <input type="text" name="workTo[]" placeholder="To" required>
    `;
    workList.appendChild(newWork);
}

function addSkillField() {
    const skillsList = document.getElementById("skillsList")!;
    const newSkill = document.createElement("div");
    newSkill.innerHTML = `<input type="text" name="skills[]" placeholder="Skill" required>`;
    skillsList.appendChild(newSkill);
}

// Function to generate the resume content
function generateResume() {
    const formData = new FormData(resumeForm);

    // Personal Information
    const picture= formData.get("picture") as string;
    const name = formData.get("name") as string;
    const age = formData.get("age") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const location = formData.get("location") as string;
    const objective = formData.get("objective") as string;
    const aboutMe = formData.get("aboutMe") as string;

    // Additional Information
    const languages = formData.getAll("language[]") as string[];
    const proficiency = formData.getAll("proficiency[]") as string[];
    const educationLevels = formData.getAll("educationLevel[]") as string[];
    const institutions = formData.getAll("institution[]") as string[];
    const educationFrom = formData.getAll("educationFrom[]") as string[];
    const educationTo = formData.getAll("educationTo[]") as string[];
    const jobTitles = formData.getAll("jobTitle[]") as string[];
    const companies = formData.getAll("company[]") as string[];
    const workFrom = formData.getAll("workFrom[]") as string[];
    const workTo = formData.getAll("workTo[]") as string[];
    const skills = formData.getAll("skills[]") as string[];

    resumeOutput.innerHTML = `
     <div class="profile-section" style="background-color: darkbrown; padding: 10px;">
            <img src="${pictureUrl ?? 'profile.png'}" alt="Profile Picture" class="profile-picture" id="outputProfilePicture">
            <h2>${name}</h2>
            <p>Age: ${age}</p>
            <p>Phone: ${phone}</p>
            <p>Email: ${email}</p>
            <p>Location: ${location}</p>
            <p>Skills: ${skills}</p>
        </div>
        <div class="info-section" style="background-color: lightbrown; padding: 10px;">
            <h3>Objective</h3>
            <p>${objective}</p>
            <h3>About Me</h3>
            <p>${aboutMe}</p>
            <h3>Languages</h3>
            <ul>
                ${languages.map((lang, i) => `<li>${lang} - ${proficiency[i]}</li>`).join("")}
            </ul>
            <h3>Education</h3>
            <ul>
                ${educationLevels.map((level, i) => `
                    <li>${level} at ${institutions[i]}, ${educationFrom[i]} - ${educationTo[i]}</li>
                `).join("")}
            </ul>
            <h3>Work Experience</h3>
            <ul>
                ${jobTitles.map((title, i) => `
                    <li>${title} at ${companies[i]}, ${workFrom[i]} - ${workTo[i]}</li>
                `).join("")}
            </ul>
        </div>
    `;

    // Add download button
    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download as PDF";
    downloadBtn.className = "download-button";
    downloadBtn.onclick = downloadPDF;
    resumeOutput.appendChild(downloadBtn);

    // Placeholder for shareable link (to be implemented)
    const shareLink = document.createElement("button");
    shareLink.textContent = "Generate Shareable Link";
    shareLink.className = "share-button";
    shareLink.onclick = generateShareableLink;
    resumeOutput.appendChild(shareLink);
}



// Handle Profile Picture Preview
document.getElementById('profilePicture')?.addEventListener('change', function () {
    const file = (this as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            (document.getElementById('outputProfilePicture') as HTMLImageElement).src = reader.result as string;
        };
        reader.readAsDataURL(file);
    } else {
        (document.getElementById('outputProfilePicture') as HTMLImageElement).src = 'profile.png';  // Default image
    }
});


// Download Resume as PDF
function downloadPDF() {
    const resume = document.getElementById('resumeOutput');
    const options = {
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
    const uniqueId = `resume-${Date.now()}`;
    const url = `${window.location.href}?id=${uniqueId}`;
    prompt("Here is your shareable link:", url);
}
