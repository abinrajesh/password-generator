console.log("script.js is initialized!");


document.getElementById('generate-password-btn').addEventListener("click", generatePassword);

// Copies the result password to clipboard

function copyToClipboard() {
    const result = document.getElementById('result');

    if (!result.value) {
        alert("Nothing to copy!");
        return;
    }

    navigator.clipboard.writeText(result.value).then(() => {
        alert("Copied to clipboard " + result.value);
    })
}


// Class that contains the functions to generate random characters

class PasswordGenerator {


    randomUpperCaseGenerator() {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }

    randomLowerCaseGenerator() {
        return String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }

    randomNumberGenerator() {
        return Math.floor(Math.random() * 10);
    }

    randomSymbolGenerator() {
        const symbol = "!@#$%^&*()-_+=";
        return symbol[Math.floor(Math.random() * symbol.length)];
    }



}

const passWdGenerator = new PasswordGenerator();

// Function that selects the range of the password 

function rangeSelector(isUpperCase, isLowerCase, isNumbers, isSymbols) {

    let password = "";
    const generators = [];

    if (isUpperCase) generators.push(() => passWdGenerator.randomUpperCaseGenerator());
    if (isLowerCase) generators.push(() => passWdGenerator.randomLowerCaseGenerator());
    if (isNumbers) generators.push(() => passWdGenerator.randomNumberGenerator());
    if (isSymbols) generators.push(() => passWdGenerator.randomSymbolGenerator());

    const range = parseInt(document.getElementById('rangeInput').value);


    for (let i = 0; i < range; i++) {
        const rangeIndex = Math.floor(Math.random() * generators.length);
        password += generators[rangeIndex]();
    }

    document.getElementById('result').value = password;
    updateStrengthDisplay(password);



}



function generatePassword() {

    const isLowerCase = document.getElementById('lowercase').checked;
    const isUpperCase = document.getElementById('uppercase').checked;
    const isNumber = document.getElementById('numbers').checked;
    const isSymbol = document.getElementById('symbols').checked;

    if (!isLowerCase && !isUpperCase && !isNumber && !isSymbol) {
        alert("Please select at least one character type.")
        return;
    }

    rangeSelector(isUpperCase, isLowerCase, isNumber, isSymbol);


    // Copy Button generation

    document.querySelector('.copyBtn').style.display = "block";

}

// Update Strength 
function updateStrengthDisplay(password) {
    // Evaluation of password Strength

    const score = evaluatePasswordStrength(password);
    const strengthText = document.getElementById("strengthText");
    const strengthBar = document.getElementById("strengthBar");

    let strengthLabel = "";
    let strengthColor = "";
    let barWidth = "";

    switch (score) {
        case 0:
        case 1:
            strengthLabel = "Very Weak";
            strengthColor = "red";
            barWidth = "20%";
            break;
        case 2:
            strengthLabel = "Weak";
            strengthColor = "orange";
            barWidth = "40%";
            break;
        case 3:
            strengthLabel = "Moderate";
            strengthColor = "gold";
            barWidth = "60%";
            break;
        case 4:
            strengthLabel = "Strong";
            strengthColor = "#00b894";
            barWidth = "80%";
            break;
        case 5:
            strengthLabel = "Very Strong";
            strengthColor = "#00ff22";
            barWidth = "100%";
            break;
    }
    strengthText.innerText = `Strength: ${strengthLabel}`;
    strengthText.style.color = strengthColor;
    strengthBar.style.backgroundColor = strengthColor;
    strengthBar.style.width = barWidth;


}


// Functions that evalueates the password strength

function evaluatePasswordStrength(password) {
    let strength = 0;

    if (password.length >= parseInt(document.getElementById("rangeInput").value)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
}

