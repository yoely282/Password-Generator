let generatedPassword = '';

function generatePassword() {
    const length = document.getElementById('passwordLength').value;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    generatedPassword = password;
    document.getElementById('generatedPassword').innerText = `Generated Password: ${password}`;
    document.getElementById('passwordStrength').innerText = `Estimated Time to Crack: ${estimateCrackTime(password)}`;
}

function authenticate() {
    const authPassword = document.getElementById('authPassword').value;
    const authResult = document.getElementById('authResult');
    if (authPassword === generatedPassword) {
        authResult.innerText = 'Authentication Successful!';
        authResult.style.color = 'green';
    } else {
        authResult.innerText = 'Authentication Failed!';
        authResult.style.color = 'red';
    }
}

function checkPassword() {
    const userPassword = document.getElementById('userPassword').value;
    document.getElementById('userPasswordStrength').innerText = `Estimated Time to Crack: ${estimateCrackTime(userPassword)}`;
}

function estimateCrackTime(password) {
    const charsetSizes = {
        lower: 26,
        upper: 26,
        digits: 10,
        special: 32 // Approximation for special characters
    };

    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += charsetSizes.lower;
    if (/[A-Z]/.test(password)) charsetSize += charsetSizes.upper;
    if (/\d/.test(password)) charsetSize += charsetSizes.digits;
    if (/[^a-zA-Z\d]/.test(password)) charsetSize += charsetSizes.special;

    const combinations = Math.pow(charsetSize, password.length);
    const guessesPerSecond = 1e10; // 10 billion guesses per second
    const seconds = combinations / guessesPerSecond;

    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const years = days / 365;

    if (years > 1e9) return '> 1 billion years';
    if (years > 1e6) return '> 1 million years';
    if (years > 1e3) return '> 1 thousand years';
    if (years > 1) return `${Math.floor(years)} years`;
    if (days > 1) return `${Math.floor(days)} days`;
    if (hours > 1) return `${Math.floor(hours)} hours`;
    if (minutes > 1) return `${Math.floor(minutes)} minutes`;
    return `${Math.floor(seconds)} seconds`;
}

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}
