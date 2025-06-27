console.log("script.js is initialized!");

function copyToClipboard() {
    const result = document.getElementById("result");
    result.select();
    result.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied to clipboard" + result.value);
}

function functionSelector() {
    for(i = 1; i <= 5; i ++) {  
        const choice = Math.floor(Math.random() * 4);
        return choice;
    }
}

class PasswordGenerator {


    randomUpperCaseGenerator() {
        const randomUpperChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        console.log(randomUpperChar);

    }

    randomLowerCaseGenerator() {
        const randomLowerChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        console.log(randomLowerChar);

    }

    randomNumberGenerator() {
        const randomNumber = Math.floor(Math.random() * 10);
        console.log(randomNumber);

    }

    randomSymbolGenerator() {
        const symbol = "!@#$%^&*()-_+=";
        const randomSymbol = Math.floor(Math.random() * symbol.length);
        console.log(randomSymbol);

    }



}

const passWdGenerator = new PasswordGenerator();

if (functionSelector() === 0) {
    passWdGenerator.randomUpperCaseGenerator();
} else if (functionSelector() === 1) {
    passWdGenerator.randomLowerCaseGenerator();
} else if (functionSelector() === 2) {
    passWdGenerator.randomNumberGenerator();
} else if (functionSelector() === 3) {
    passWdGenerator.randomSymbolGenerator();
}
