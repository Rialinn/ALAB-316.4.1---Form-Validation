function validateRegistration() {
    const username = document.forms["registration"]["username"].value.trim();
    const email = document.forms["registration"]["email"].value.trim().toLowerCase();
    const password = document.forms["registration"]["password"].value;
    const passwordCheck = document.forms["registration"]["passwordCheck"].value;
    const terms = document.forms["registration"]["terms"].checked;
  
    
    clearError();
  
    
    if (!username) {
      displayError("Username cannot be blank.");
      return false;
    }
  
    if (!isValidEmail(email)) {
      displayError("Please enter a valid email address.");
      return false;
    }
  
    if (email.endsWith("@example.com")) {
      displayError("Email cannot be from the domain 'example.com'.");
      return false;
    }
  
   
    if (password.length < 12) {
      displayError("Password must be at least 12 characters long.");
      return false;
    }
  
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      displayError("Password must contain at least one uppercase and one lowercase letter.");
      return false;
    }
  
    if (!/\d/.test(password)) {
      displayError("Password must contain at least one number.");
      return false;
    }
  
    if (!/[^a-zA-Z0-9\s]/.test(password)) {
      displayError("Password must contain at least one special character.");
      return false;
    }
  
    if (password.toLowerCase().includes("password")) {
      displayError("Password cannot contain the word 'password'.");
      return false;
    }
  
    if (password !== passwordCheck) {
      displayError("Passwords do not match.");
      return false;
    }
  
   
    if (!terms) {
      displayError("You must agree to the Terms of Use.");
      return false;
    }
  
  
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = storedUsers.find(user => user.username === username.toLowerCase());
    if (existingUser) {
      displayError("That username is already taken.");
      return false;
    }
  

    const newUser = {
      username,
      email,
      password
    };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
  
   
    document.forms["registration"].reset();
    displaySuccess("Registration successful!");
    
    return false; 
  }
  
  function validateLogin() {
    const username = document.forms["login"]["username"].value.trim();
    const password = document.forms["login"]["password"].value;
    const persist = document.forms["login"]["persist"].checked;
  
 
    clearError();
  
   
    if (!username) {
      displayError("Username cannot be blank.");
      return false;
    }
  
   
    if (!password) {
      displayError("Password cannot be blank.");
      return false;
    }
  
   
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(user => user.username === username.toLowerCase());
    if (!user || user.password !== password) {
      displayError("Invalid username or password.");
      return false;
    }
  
    document.forms["login"].reset();
  
    
    if (persist) {
      displaySuccess("Login successful. You are logged in permanently.");
    } else {
      displaySuccess("Login successful.");
    }
  
    return false; 
  }
  
  function isValidEmail(email) {
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function displayError(message) {
    const errorDisplay = document.getElementById("errorDisplay");
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
  }
  
  function displaySuccess(message) {
    const errorDisplay = document.getElementById("errorDisplay");
    errorDisplay.textContent = message;
    errorDisplay.className = "success";
    errorDisplay.style.display = "block";
  }
  
  function clearError() {
    const errorDisplay = document.getElementById("errorDisplay");
    errorDisplay.textContent = "";
    errorDisplay.className = "";
    errorDisplay.style.display = "none";
  }
  