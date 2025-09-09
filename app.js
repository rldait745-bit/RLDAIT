// Enhanced Secure Inventory Management System with Fixed Navigation

// Application data with user authentication
let appData = {
  users: [
    {
      id: 1,
      username: "admin@company.com",
      password: "Admin123!",
      role: "Admin",
      firstName: "Aashif",
      lastName: "Administrator",
      lastLogin: "2025-09-02T19:30:00Z",
      accountStatus: "active",
      failedAttempts: 0,
      lockoutUntil: null
    },
    {
      id: 2,
      username: "manager@company.com", 
      password: "Manager123!",
      role: "Manager",
      firstName: "Sarah",
      lastName: "Manager",
      lastLogin: "2025-09-02T18:15:00Z",
      accountStatus: "active",
      failedAttempts: 0,
      lockoutUntil: null
    },
    {
      id: 3,
      username: "employee@company.com",
      password: "Employee123!",
      role: "Employee", 
      firstName: "Mike",
      lastName: "Employee",
      lastLogin: "2025-09-02T17:45:00Z",
      accountStatus: "active",
      failedAttempts: 0,
      lockoutUntil: null
    }
  ],
  rolePermissions: {
    "Admin": ["dashboard", "inventory", "users", "reports", "settings", "add", "edit", "delete", "export"],
    "Manager": ["dashboard", "inventory", "reports", "add", "edit", "delete", "export"],
    "Employee": ["dashboard", "inventory", "reports", "export"]
  },
  categories: ["Electronics", "Office Supplies", "Raw Materials", "Finished Products", "Tools", "Packaging"],
  suppliers: [
    {"id": 1, "name": "TechCorp Supply", "contact": "sales@techcorp.com"},
    {"id": 2, "name": "Office Plus", "contact": "orders@officeplus.com"},
    {"id": 3, "name": "Industrial Materials", "contact": "info@industrialmats.com"},
    {"id": 4, "name": "Global Suppliers Inc", "contact": "support@globalsuppliers.com"}
  ],
  inventory_items: [
    {"id": 1, "name": "Laptop Computer", "description": "High-performance business laptop", "category": "Electronics", "quantity": 25, "price": 899.99, "supplier": "TechCorp Supply", "reorder_level": 10, "date_added": "2025-01-15", "last_updated": "2025-09-01"},
    {"id": 2, "name": "Office Chairs", "description": "Ergonomic office chairs", "category": "Office Supplies", "quantity": 8, "price": 299.99, "supplier": "Office Plus", "reorder_level": 15, "date_added": "2025-02-10", "last_updated": "2025-08-28"},
    {"id": 3, "name": "Steel Bars", "description": "High-grade steel construction bars", "category": "Raw Materials", "quantity": 100, "price": 45.50, "supplier": "Industrial Materials", "reorder_level": 50, "date_added": "2025-03-05", "last_updated": "2025-09-02"},
    {"id": 4, "name": "Wireless Mouse", "description": "Bluetooth wireless mouse", "category": "Electronics", "quantity": 45, "price": 29.99, "supplier": "TechCorp Supply", "reorder_level": 20, "date_added": "2025-01-20", "last_updated": "2025-08-30"},
    {"id": 5, "name": "Printer Paper", "description": "A4 white printer paper - 500 sheets", "category": "Office Supplies", "quantity": 5, "price": 12.99, "supplier": "Office Plus", "reorder_level": 25, "date_added": "2025-02-15", "last_updated": "2025-09-01"},
    {"id": 6, "name": "Finished Widget A", "description": "Completed product ready for shipping", "category": "Finished Products", "quantity": 150, "price": 89.99, "supplier": "Global Suppliers Inc", "reorder_level": 75, "date_added": "2025-04-01", "last_updated": "2025-09-02"},
    {"id": 7, "name": "Cardboard Boxes", "description": "Medium shipping boxes", "category": "Packaging", "quantity": 12, "price": 2.50, "supplier": "Global Suppliers Inc", "reorder_level": 50, "date_added": "2025-03-20", "last_updated": "2025-08-25"},
    {"id": 8, "name": "Power Drill", "description": "Cordless power drill with battery", "category": "Tools", "quantity": 18, "price": 149.99, "supplier": "Industrial Materials", "reorder_level": 10, "date_added": "2025-05-10", "last_updated": "2025-08-15"}
  ]
};

// Security and session management
let securityState = {
  currentUser: null,
  sessionToken: null,
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  lastActivity: null,
  inactivityWarningTimer: null,
  sessionTimeoutTimer: null,
  lockoutTimers: new Map() // Track lockout timers per user
};

// Application state
let appState = {
  currentView: 'dashboard',
  editingItem: null,
  filteredItems: [...appData.inventory_items],
  sortColumn: null,
  sortDirection: 'asc',
  chart: null,
  currentAuthScreen: 'welcome-screen',
  isInitialized: false
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing enhanced secure app...');
  
  // Ensure initialization only happens once
  if (!appState.isInitialized) {
    appState.isInitialized = true;
    
    // Initialize authentication immediately
    try {
      initializeAuthentication();
      checkExistingSession();
      console.log('Application initialized successfully');
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }
});

// Enhanced Authentication System with Fixed Navigation
function initializeAuthentication() {
  console.log('Initializing enhanced authentication system...');
  
  // Wait for DOM to be fully loaded
  setTimeout(() => {
    setupWelcomeScreen();
    setupLoginOptionsScreen();
    setupEmailLoginScreen();
    setupRegistrationScreen();
    setupForgotPasswordScreens();
    setupPasswordToggles();
    setupOTPInputs();
    setupFormSubmissions();
    setupSocialLogin();
    
    console.log('Authentication system initialized successfully');
  }, 100);
}

function setupWelcomeScreen() {
  console.log('Setting up welcome screen...');
  
  const getStartedBtn = document.getElementById('get-started-btn');
  const continueGuestBtn = document.getElementById('continue-guest-btn');
  
  if (getStartedBtn) {
    // Remove any existing listeners
    const newBtn = getStartedBtn.cloneNode(true);
    getStartedBtn.parentNode.replaceChild(newBtn, getStartedBtn);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Get Started clicked - navigating to login options');
      showAuthScreen('login-options-screen');
    });
    console.log('Get Started button configured');
  } else {
    console.error('Get Started button not found');
  }
  
  if (continueGuestBtn) {
    const newBtn = continueGuestBtn.cloneNode(true);
    continueGuestBtn.parentNode.replaceChild(newBtn, continueGuestBtn);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Continue as Guest clicked');
      handleGuestLogin();
    });
    console.log('Continue as Guest button configured');
  } else {
    console.error('Continue as Guest button not found');
  }
}

function setupLoginOptionsScreen() {
  console.log('Setting up login options screen...');
  
  const backToWelcome = document.getElementById('back-to-welcome');
  const loginEmailBtn = document.getElementById('login-email-btn');
  const showRegisterLink = document.getElementById('show-register-link');
  
  if (backToWelcome) {
    const newBtn = backToWelcome.cloneNode(true);
    backToWelcome.parentNode.replaceChild(newBtn, backToWelcome);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Back to welcome clicked');
      showAuthScreen('welcome-screen');
    });
  }
  
  if (loginEmailBtn) {
    const newBtn = loginEmailBtn.cloneNode(true);
    loginEmailBtn.parentNode.replaceChild(newBtn, loginEmailBtn);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Login with Email clicked');
      showAuthScreen('email-login-screen');
    });
  }
  
  if (showRegisterLink) {
    const newLink = showRegisterLink.cloneNode(true);
    showRegisterLink.parentNode.replaceChild(newLink, showRegisterLink);
    
    newLink.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Show register clicked');
      showAuthScreen('register-screen');
    });
  }
}

function setupEmailLoginScreen() {
  console.log('Setting up email login screen...');
  
  const backToOptions = document.getElementById('back-to-options');
  const showRegisterFromLogin = document.getElementById('show-register-from-login');
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  
  if (backToOptions) {
    const newBtn = backToOptions.cloneNode(true);
    backToOptions.parentNode.replaceChild(newBtn, backToOptions);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showAuthScreen('login-options-screen');
    });
  }
  
  if (showRegisterFromLogin) {
    const newLink = showRegisterFromLogin.cloneNode(true);
    showRegisterFromLogin.parentNode.replaceChild(newLink, showRegisterFromLogin);
    
    newLink.addEventListener('click', function(e) {
      e.preventDefault();
      showAuthScreen('register-screen');
    });
  }
  
  if (forgotPasswordLink) {
    const newLink = forgotPasswordLink.cloneNode(true);
    forgotPasswordLink.parentNode.replaceChild(newLink, forgotPasswordLink);
    
    newLink.addEventListener('click', function(e) {
      e.preventDefault();
      showAuthScreen('forgot-password-screen');
    });
  }
}
const { Auth } = require("two-step-auth");

async function sendOtp(email) {
  const res = await Auth(email, "YourAppName");
  console.log("OTP sent:", res.OTP);
}
function setupRegistrationScreen() {
  console.log('Setting up registration screen...');
  
  const backToOptionsFromRegister = document.getElementById('back-to-options-from-register');
  const showLoginFromRegister = document.getElementById('show-login-from-register');
  
  if (backToOptionsFromRegister) {
    const newBtn = backToOptionsFromRegister.cloneNode(true);
    backToOptionsFromRegister.parentNode.replaceChild(newBtn, backToOptionsFromRegister);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showAuthScreen('login-options-screen');
    });
  }
  
  if (showLoginFromRegister) {
    const newLink = showLoginFromRegister.cloneNode(true);
    showLoginFromRegister.parentNode.replaceChild(newLink, showLoginFromRegister);
    
    newLink.addEventListener('click', function(e) {
      e.preventDefault();
      showAuthScreen('email-login-screen');
    });
  }
}

function setupForgotPasswordScreens() {
  const backToLogin = document.getElementById('back-to-login');
  const backToForgot = document.getElementById('back-to-forgot');
  const resendCode = document.getElementById('resend-code');
  const continueToLogin = document.getElementById('continue-to-login');
  
  if (backToLogin) {
    const newBtn = backToLogin.cloneNode(true);
    backToLogin.parentNode.replaceChild(newBtn, backToLogin);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showAuthScreen('email-login-screen');
    });
  }
  
  if (backToForgot) {
    const newBtn = backToForgot.cloneNode(true);
    backToForgot.parentNode.replaceChild(newBtn, backToForgot);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showAuthScreen('forgot-password-screen');
    });
  }
  
  if (resendCode) {
    const newBtn = resendCode.cloneNode(true);
    resendCode.parentNode.replaceChild(newBtn, resendCode);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      handleResendCode();
    });
  }
  
  if (continueToLogin) {
    const newBtn = continueToLogin.cloneNode(true);
    continueToLogin.parentNode.replaceChild(newBtn, continueToLogin);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showAuthScreen('email-login-screen');
    });
  }
}

function setupFormSubmissions() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const forgotPasswordForm = document.getElementById('forgot-password-form');
  const otpForm = document.getElementById('otp-form');
  const resetPasswordForm = document.getElementById('reset-password-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
  
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', handleForgotPassword);
  }
  
  if (otpForm) {
    otpForm.addEventListener('submit', handleOTPVerification);
  }
  
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', handleResetPassword);
  }
  
  // Password strength validation
  const registerPassword = document.getElementById('register-password');
  if (registerPassword) {
    registerPassword.addEventListener('input', validatePasswordStrength);
  }
  
  // Logout functionality
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
}

function setupSocialLogin() {
  document.querySelectorAll('.social-btn').forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', handleSocialLogin);
  });
}

function setupPasswordToggles() {
  initializePasswordToggles();
}

function setupOTPInputs() {
  initializeOTPInputs();
}

function showAuthScreen(screenId) {
  console.log('Showing auth screen:', screenId);
  
  try {
    // Clear any existing messages when switching screens
    clearAuthMessages();
    
    // Hide all auth screens
    const allScreens = document.querySelectorAll('.auth-screen');
    console.log('Found screens:', allScreens.length);
    
    allScreens.forEach(screen => {
      screen.classList.remove('active');
      console.log('Hidden screen:', screen.id);
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.add('active');
      appState.currentAuthScreen = screenId;
      console.log('Auth screen switched to:', screenId);
      
      // Add small delay to ensure transition is visible
      setTimeout(() => {
        console.log('Screen transition complete');
      }, 100);
    } else {
      console.error('Auth screen not found:', screenId);
    }
  } catch (error) {
    console.error('Error switching auth screen:', error);
  }
}

// Enhanced message display functions
function showAuthMessage(message, type = 'error') {
  const messagesContainer = document.getElementById('login-messages');
  if (!messagesContainer) return;

  // Clear existing messages
  clearAuthMessages();

  const messageElement = document.createElement('div');
  messageElement.className = `auth-message auth-message--${type}`;
  
  const icon = type === 'success' ? 'check-circle' : 
               type === 'error' ? 'exclamation-circle' : 
               'exclamation-triangle';

  messageElement.innerHTML = `
    <i class="fas fa-${icon}"></i>
    <span class="message-text">${message}</span>
  `;

  messagesContainer.appendChild(messageElement);
}

function showLockoutMessage(user) {
  const remainingTime = Math.ceil((user.lockoutUntil - Date.now()) / 1000);
  
  const messagesContainer = document.getElementById('login-messages');
  if (!messagesContainer) return;

  clearAuthMessages();

  const messageElement = document.createElement('div');
  messageElement.className = 'auth-message auth-message--error';
  messageElement.id = 'lockout-message';
  
  messageElement.innerHTML = `
    <i class="fas fa-lock"></i>
    <span class="message-text">
      Account temporarily locked due to multiple failed login attempts. 
      Please try again in <span class="countdown-timer" id="lockout-countdown">${Math.floor(remainingTime / 60)}:${(remainingTime % 60).toString().padStart(2, '0')}</span>.
    </span>
  `;

  messagesContainer.appendChild(messageElement);
  
  // Start countdown timer
  const countdownElement = document.getElementById('lockout-countdown');
  const timer = setInterval(() => {
    const remaining = Math.ceil((user.lockoutUntil - Date.now()) / 1000);
    if (remaining <= 0) {
      clearInterval(timer);
      clearAuthMessages();
      // Clear the lockout
      user.lockoutUntil = null;
    } else {
      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
      if (countdownElement) {
        countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    }
  }, 1000);
  
  // Store timer reference for cleanup
  securityState.lockoutTimers.set(user.username, timer);
}

function clearAuthMessages() {
  const messagesContainer = document.getElementById('login-messages');
  if (messagesContainer) {
    messagesContainer.innerHTML = '';
  }
  
  // Clear any existing lockout timers
  securityState.lockoutTimers.forEach((timer) => {
    clearInterval(timer);
  });
  securityState.lockoutTimers.clear();
}

function handleGuestLogin() {
  showToast('Guest login is not available in this version', 'warning');
}

function handleSocialLogin(e) {
  e.preventDefault();
  const socialType = e.currentTarget.classList.contains('social-btn--facebook') ? 'Facebook' :
                     e.currentTarget.classList.contains('social-btn--google') ? 'Google' : 'Apple';
  
  showToast(`${socialType} login is not available in demo mode`, 'warning');
}

function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  console.log('Login attempt for:', email);
  
  // Clear any existing messages
  clearAuthMessages();
  
  showAuthLoading('login-btn');

  // Simulate network delay
  setTimeout(() => {
    const result = authenticateUser(email, password);
    
    if (result.success) {
      securityState.currentUser = result.user;
      securityState.sessionToken = generateSessionToken();
      securityState.lastActivity = Date.now();
      
      // Update last login
      result.user.lastLogin = new Date().toISOString();
      
      // Reset failed attempts on successful login
      result.user.failedAttempts = 0;
      result.user.lockoutUntil = null;
      
      // Clear any existing lockout timer
      if (securityState.lockoutTimers.has(result.user.username)) {
        clearInterval(securityState.lockoutTimers.get(result.user.username));
        securityState.lockoutTimers.delete(result.user.username);
      }
      
      showToast('Login successful! Welcome back!', 'success');
      
      // Transition to application
      setTimeout(() => {
        transitionToApplication();
      }, 800);
      
    } else {
      // Handle failed login attempts
      if (result.user) {
        result.user.failedAttempts += 1;
        console.log(`Failed login attempt ${result.user.failedAttempts} for user: ${result.user.username}`);
        
        if (result.user.failedAttempts >= 3) {
          // Lock account for 5 minutes after 3 failed attempts
          result.user.lockoutUntil = Date.now() + (5 * 60 * 1000);
          console.log(`Account locked for user: ${result.user.username}`);
          showLockoutMessage(result.user);
        } else {
          // Show regular error message
          const remainingAttempts = 3 - result.user.failedAttempts;
          showAuthMessage(`Invalid email or password. ${remainingAttempts} attempt(s) remaining before account lockout.`, 'error');
        }
      } else {
        // User not found
        showAuthMessage(result.message, 'error');
      }
    }
    
    hideAuthLoading('login-btn');
  }, 1200);
}

function handleRegister(e) {
  e.preventDefault();
  
  const firstName = document.getElementById('register-firstname').value;
  const lastName = document.getElementById('register-lastname').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    showToast('Passwords do not match', 'error');
    return;
  }

  if (!isPasswordValid(password)) {
    showToast('Password does not meet security requirements', 'error');
    return;
  }

  showAuthLoading('register-btn');

  // Simulate registration process
  setTimeout(() => {
    const existingUser = appData.users.find(u => u.username === email);
    
    if (existingUser) {
      showToast('User with this email already exists', 'error');
    } else {
      const newUser = {
        id: getNextUserId(),
        username: email,
        password: password, // In real app, this would be hashed
        role: 'Employee', // Default role
        firstName: firstName,
        lastName: lastName,
        lastLogin: null,
        accountStatus: 'active',
        failedAttempts: 0,
        lockoutUntil: null
      };
      
      appData.users.push(newUser);
      showToast('Account created successfully!', 'success');
      
      // Auto-login the new user
      setTimeout(() => {
        securityState.currentUser = newUser;
        securityState.sessionToken = generateSessionToken();
        securityState.lastActivity = Date.now();
        newUser.lastLogin = new Date().toISOString();
        
        showToast('Welcome to SecureStock!', 'success');
        setTimeout(() => transitionToApplication(), 800);
      }, 1000);
    }
    
    hideAuthLoading('register-btn');
  }, 1200);
}

function handleForgotPassword(e) {
  e.preventDefault();
  
  const email = document.getElementById('forgot-email').value;
  
  // Simulate password reset
  setTimeout(() => {
    const user = appData.users.find(u => u.username === email);
    
    if (user) {
      showToast('Verification code sent to your email', 'success');
      setTimeout(() => {
        showAuthScreen('otp-screen');
        startResendCountdown();
      }, 500);
    } else {
      showToast('No account found with this email address', 'error');
    }
  }, 1000);
}

function handleOTPVerification(e) {
  e.preventDefault();
  
  const otpInputs = document.querySelectorAll('.otp-input');
  const otp = Array.from(otpInputs).map(input => input.value).join('');
  
  if (otp.length !== 6) {
    showToast('Please enter the complete 6-digit code', 'error');
    return;
  }
  
  // Simulate OTP verification (accept any 6-digit code for demo)
  setTimeout(() => {
    showToast('Code verified successfully!', 'success');
    setTimeout(() => showAuthScreen('reset-password-screen'), 500);
  }, 800);
}

function handleResetPassword(e) {
  e.preventDefault();
  
  const newPassword = document.getElementById('new-password').value;
  const confirmNewPassword = document.getElementById('confirm-new-password').value;
  
  if (newPassword !== confirmNewPassword) {
    showToast('Passwords do not match', 'error');
    return;
  }
  
  if (!isPasswordValid(newPassword)) {
    showToast('Password does not meet security requirements', 'error');
    return;
  }
  
  // Simulate password reset
  setTimeout(() => {
    showToast('Password updated successfully!', 'success');
    setTimeout(() => showAuthScreen('success-screen'), 500);
  }, 1000);
}

function handleResendCode() {
  showToast('Verification code sent again', 'success');
  startResendCountdown();
}

function startResendCountdown() {
  const resendLink = document.getElementById('resend-code');
  const countdown = document.querySelector('.countdown');
  const countdownSpan = document.getElementById('countdown');
  
  if (resendLink && countdown && countdownSpan) {
    resendLink.style.display = 'none';
    countdown.classList.remove('hidden');
    
    let timeLeft = 60;
    const timer = setInterval(() => {
      timeLeft--;
      countdownSpan.textContent = timeLeft;
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        resendLink.style.display = 'inline';
        countdown.classList.add('hidden');
      }
    }, 1000);
  }
}

function initializeOTPInputs() {
  const otpInputs = document.querySelectorAll('.otp-input');
  
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', function(e) {
      const value = e.target.value;
      
      if (value.length === 1) {
        e.target.classList.add('filled');
        // Move to next input
        if (index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      } else if (value.length === 0) {
        e.target.classList.remove('filled');
      }
      
      // Handle paste
      if (value.length > 1) {
        const pastedValue = value.slice(0, 6);
        pastedValue.split('').forEach((char, i) => {
          if (otpInputs[i]) {
            otpInputs[i].value = char;
            otpInputs[i].classList.add('filled');
          }
        });
        
        const nextIndex = Math.min(pastedValue.length, otpInputs.length - 1);
        otpInputs[nextIndex].focus();
      }
    });
    
    input.addEventListener('keydown', function(e) {
      // Handle backspace
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        otpInputs[index - 1].focus();
        otpInputs[index - 1].value = '';
        otpInputs[index - 1].classList.remove('filled');
      }
      
      // Handle arrow keys
      if (e.key === 'ArrowLeft' && index > 0) {
        otpInputs[index - 1].focus();
      } else if (e.key === 'ArrowRight' && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });
  });
}

function transitionToApplication() {
  console.log('Transitioning to main application...');
  
  // Hide authentication container with fade out
  const authContainer = document.getElementById('auth-container');
  const appContainer = document.getElementById('app-container');
  
  if (authContainer) {
    authContainer.style.transition = 'opacity 0.5s ease-out';
    authContainer.style.opacity = '0';
    
    setTimeout(() => {
      authContainer.style.display = 'none';
      
      if (appContainer) {
        appContainer.classList.remove('hidden');
        appContainer.style.opacity = '0';
        appContainer.style.display = 'block';
        
        // Fade in application
        setTimeout(() => {
          appContainer.style.transition = 'opacity 0.6s ease-in';
          appContainer.style.opacity = '1';
          
          // Initialize application after transition
          setTimeout(() => {
            console.log('Initializing main application...');
            initializeApplication();
            setupUserInterface();
            startSessionManagement();
          }, 300);
        }, 100);
      }
    }, 500);
  }
}

function authenticateUser(username, password) {
  const user = appData.users.find(u => u.username === username);
  
  if (!user) {
    return { success: false, message: 'Invalid email or password', user: null };
  }

  if (user.accountStatus !== 'active') {
    return { success: false, message: 'Account is inactive', user: user };
  }

  // Check if account is currently locked
  if (user.lockoutUntil && Date.now() < user.lockoutUntil) {
    const remainingTime = Math.ceil((user.lockoutUntil - Date.now()) / 60000);
    return { 
      success: false, 
      message: `Account locked. Try again in ${remainingTime} minutes`, 
      user: user,
      isLocked: true 
    };
  }

  if (user.password !== password) {
    return { success: false, message: 'Invalid email or password', user: user };
  }

  return { success: true, user: user };
}

function generateSessionToken() {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

function initializeApplication() {
  console.log('Initializing main application features...');
  initializeNavigation();
  initializeEventListeners();
  populateDropdowns();
  updateDashboard();
  applyFilters();
  renderCategories();
  renderSuppliers();
  renderUsers();
  showView('dashboard');
  console.log('Application initialization complete');
}

function setupUserInterface() {
  const user = securityState.currentUser;
  
  // Update user display
  const userDisplayName = document.getElementById('user-display-name');
  const dropdownUserName = document.getElementById('dropdown-user-name');
  const userRole = document.getElementById('user-role');
  
  if (userDisplayName) userDisplayName.textContent = `${user.firstName} ${user.lastName}`;
  if (dropdownUserName) dropdownUserName.textContent = `${user.firstName} ${user.lastName}`;
  if (userRole) userRole.textContent = user.role;

  // Setup navigation based on permissions
  setupRoleBasedNavigation();

  // Setup user menu
  setupUserMenu();
}

function setupRoleBasedNavigation() {
  const navMenu = document.getElementById('navigation-menu');
  const permissions = appData.rolePermissions[securityState.currentUser.role];
  
  const navigationItems = [
    { id: 'dashboard', icon: 'fas fa-tachometer-alt', text: 'Dashboard', permission: 'dashboard' },
    { id: 'all-items', icon: 'fas fa-list', text: 'All Items', permission: 'inventory' },
    { id: 'add-item', icon: 'fas fa-plus', text: 'Add Item', permission: 'add' },
    { id: 'categories', icon: 'fas fa-tags', text: 'Categories', permission: 'inventory' },
    { id: 'suppliers', icon: 'fas fa-truck', text: 'Suppliers', permission: 'inventory' },
    { id: 'reports', icon: 'fas fa-chart-bar', text: 'Reports', permission: 'reports' },
    { id: 'users', icon: 'fas fa-users', text: 'Users', permission: 'users' }
  ];

  if (navMenu) {
    navMenu.innerHTML = navigationItems
      .filter(item => permissions.includes(item.permission))
      .map(item => `
        <li class="nav-item">
          <button class="nav-link ${item.id === 'dashboard' ? 'active' : ''}" data-view="${item.id}">
            <i class="${item.icon}"></i>
            ${item.text}
          </button>
        </li>
      `).join('');
  }

  // Re-initialize navigation after updating
  initializeNavigation();
}

function setupUserMenu() {
  const userInfoBtn = document.getElementById('user-info-btn');
  const userDropdown = document.getElementById('user-dropdown');
  const userMenu = document.getElementById('user-menu');

  if (userInfoBtn) {
    userInfoBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (userDropdown && userMenu) {
        userDropdown.classList.toggle('hidden');
        userMenu.classList.toggle('active');
      }
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function() {
    if (userDropdown && userMenu) {
      userDropdown.classList.add('hidden');
      userMenu.classList.remove('active');
    }
  });

  // Profile and password change functionality
  const changePasswordLink = document.getElementById('change-password-link');
  if (changePasswordLink) {
    changePasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      showChangePasswordModal();
      if (userDropdown && userMenu) {
        userDropdown.classList.add('hidden');
        userMenu.classList.remove('active');
      }
    });
  }
}

function startSessionManagement() {
  // Set up session timeout warning (5 minutes before expiry)
  const warningTime = securityState.sessionTimeout - (5 * 60 * 1000);
  
  securityState.inactivityWarningTimer = setTimeout(showSessionTimeoutWarning, warningTime);
  securityState.sessionTimeoutTimer = setTimeout(handleSessionTimeout, securityState.sessionTimeout);

  // Track user activity
  ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, updateLastActivity, true);
  });
}

function updateLastActivity() {
  securityState.lastActivity = Date.now();
}

function showSessionTimeoutWarning() {
  const modal = document.getElementById('session-timeout-modal');
  if (modal) {
    modal.classList.remove('hidden');
    
    let countdown = 5;
    const counter = document.getElementById('timeout-counter');
    
    const countdownTimer = setInterval(() => {
      countdown--;
      if (counter) counter.textContent = countdown;
      
      if (countdown <= 0) {
        clearInterval(countdownTimer);
        handleSessionTimeout();
      }
    }, 60000); // Update every minute

    const extendSession = document.getElementById('extend-session');
    const logoutNow = document.getElementById('logout-now');
    
    if (extendSession) {
      extendSession.addEventListener('click', function() {
        clearInterval(countdownTimer);
        modal.classList.add('hidden');
        extendSessionFunc();
      });
    }

    if (logoutNow) {
      logoutNow.addEventListener('click', function() {
        clearInterval(countdownTimer);
        handleLogout();
      });
    }
  }
}

function extendSessionFunc() {
  clearTimeout(securityState.inactivityWarningTimer);
  clearTimeout(securityState.sessionTimeoutTimer);
  startSessionManagement();
  showToast('Session extended successfully', 'success');
}

function handleSessionTimeout() {
  showToast('Session expired due to inactivity', 'warning');
  handleLogout();
}

function handleLogout() {
  console.log('Logging out user...');
  
  // Clear session data
  securityState.currentUser = null;
  securityState.sessionToken = null;
  securityState.lastActivity = null;
  
  // Clear timers
  if (securityState.inactivityWarningTimer) {
    clearTimeout(securityState.inactivityWarningTimer);
  }
  if (securityState.sessionTimeoutTimer) {
    clearTimeout(securityState.sessionTimeoutTimer);
  }
  
  // Clear any lockout timers
  securityState.lockoutTimers.forEach((timer) => {
    clearInterval(timer);
  });
  securityState.lockoutTimers.clear();

  // Hide application and show welcome screen with transition
  const authContainer = document.getElementById('auth-container');
  const appContainer = document.getElementById('app-container');
  
  if (appContainer) {
    appContainer.style.transition = 'opacity 0.5s ease-out';
    appContainer.style.opacity = '0';
    
    setTimeout(() => {
      appContainer.classList.add('hidden');
      appContainer.style.display = 'none';
      
      if (authContainer) {
        authContainer.style.display = 'flex';
        authContainer.style.opacity = '0';
        
        setTimeout(() => {
          authContainer.style.transition = 'opacity 0.6s ease-in';
          authContainer.style.opacity = '1';
          
          // Reset to welcome screen and clear messages
          showAuthScreen('welcome-screen');
          clearAuthMessages();
          
          // Reset forms
          const loginForm = document.getElementById('login-form');
          if (loginForm) loginForm.reset();
          
          const registerForm = document.getElementById('register-form');
          if (registerForm) registerForm.reset();
        }, 100);
      }
    }, 500);
  }
  
  showToast('Logged out successfully', 'success');
}

function checkExistingSession() {
  // In a real application, you would check for stored session tokens
  // For this demo, we'll just show the welcome screen
  console.log('Checking existing session - showing welcome screen');
  showAuthScreen('welcome-screen');
}

// Password validation and security
function validatePasswordStrength() {
  const password = document.getElementById('register-password').value;
  const requirements = document.querySelectorAll('.requirement');
  
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };

  requirements.forEach(req => {
    const requirement = req.dataset.requirement;
    if (checks[requirement]) {
      req.classList.add('valid');
    } else {
      req.classList.remove('valid');
    }
  });
}

function isPasswordValid(password) {
  return password.length >= 8 &&
         /[A-Z]/.test(password) &&
         /[a-z]/.test(password) &&
         /\d/.test(password) &&
         /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
}

function initializePasswordToggles() {
  const toggleButtons = document.querySelectorAll('.password-toggle');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const icon = this.querySelector('i');
      
      if (input && input.type === 'password') {
        input.type = 'text';
        if (icon) {
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        }
      } else if (input) {
        input.type = 'password';
        if (icon) {
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      }
    });
  });
}

function showChangePasswordModal() {
  const modal = document.getElementById('change-password-modal');
  if (modal) {
    modal.classList.remove('hidden');
    
    const saveBtn = document.getElementById('save-password-change');
    const cancelBtn = document.getElementById('cancel-password-change');
    const closeBtn = document.getElementById('close-password-modal');
    
    const handleSave = function() {
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password-modal').value;
      const confirmNewPassword = document.getElementById('confirm-new-password-modal').value;
      
      if (currentPassword !== securityState.currentUser.password) {
        showToast('Current password is incorrect', 'error');
        return;
      }
      
      if (newPassword !== confirmNewPassword) {
        showToast('New passwords do not match', 'error');
        return;
      }
      
      if (!isPasswordValid(newPassword)) {
        showToast('New password does not meet security requirements', 'error');
        return;
      }
      
      securityState.currentUser.password = newPassword;
      showToast('Password changed successfully', 'success');
      modal.classList.add('hidden');
      const form = document.getElementById('change-password-form');
      if (form) form.reset();
    };
    
    const handleClose = function() {
      modal.classList.add('hidden');
      const form = document.getElementById('change-password-form');
      if (form) form.reset();
    };
    
    if (saveBtn) {
      saveBtn.removeEventListener('click', handleSave);
      saveBtn.addEventListener('click', handleSave);
    }
    
    if (cancelBtn) {
      cancelBtn.removeEventListener('click', handleClose);
      cancelBtn.addEventListener('click', handleClose);
    }
    
    if (closeBtn) {
      closeBtn.removeEventListener('click', handleClose);
      closeBtn.addEventListener('click', handleClose);
    }
  }
}

function showAuthLoading(buttonId) {
  const button = document.getElementById(buttonId);
  if (button) {
    const text = button.querySelector('.btn-text');
    const spinner = button.querySelector('.btn-spinner');
    
    if (text) text.style.visibility = 'hidden';
    if (spinner) spinner.classList.remove('hidden');
    button.disabled = true;
  }
}

function hideAuthLoading(buttonId) {
  const button = document.getElementById(buttonId);
  if (button) {
    const text = button.querySelector('.btn-text');
    const spinner = button.querySelector('.btn-spinner');
    
    if (text) text.style.visibility = 'visible';
    if (spinner) spinner.classList.add('hidden');
    button.disabled = false;
  }
}

// Navigation functionality
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    // Remove existing event listeners by cloning the node
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    
    newLink.addEventListener('click', function(e) {
      e.preventDefault();
      const view = this.dataset.view;
      if (view) {
        showView(view);
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
}

function showView(viewName) {
  // Check permissions
  const permissions = appData.rolePermissions[securityState.currentUser.role];
  const requiredPermission = getRequiredPermission(viewName);
  
  if (requiredPermission && !permissions.includes(requiredPermission)) {
    showToast('You do not have permission to access this section', 'error');
    return;
  }

  // Hide all views
  const views = document.querySelectorAll('.view');
  views.forEach(view => view.classList.remove('active'));
  
  // Show selected view
  const targetView = document.getElementById(`${viewName}-view`);
  if (targetView) {
    targetView.classList.add('active');
    appState.currentView = viewName;
    
    // Refresh view-specific content
    refreshViewContent(viewName);
  }
}

function getRequiredPermission(viewName) {
  const permissionMap = {
    'dashboard': 'dashboard',
    'all-items': 'inventory',
    'add-item': 'add',
    'categories': 'inventory',
    'suppliers': 'inventory',
    'reports': 'reports',
    'users': 'users'
  };
  
  return permissionMap[viewName];
}

function refreshViewContent(viewName) {
  switch(viewName) {
    case 'dashboard':
      updateDashboard();
      break;
    case 'all-items':
      renderAllItems();
      break;
    case 'add-item':
      if (!appState.editingItem) {
        resetForm();
        const formTitle = document.getElementById('form-title');
        if (formTitle) {
          formTitle.textContent = 'Add New Item';
        }
      }
      break;
    case 'categories':
      renderCategories();
      break;
    case 'suppliers':
      renderSuppliers();
      break;
    case 'users':
      renderUsers();
      break;
  }
}

// Event listeners
function initializeEventListeners() {
  // Add item button
  const addItemBtn = document.getElementById('add-item-btn');
  if (addItemBtn) {
    addItemBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Check permissions
      const permissions = appData.rolePermissions[securityState.currentUser.role];
      if (!permissions.includes('add')) {
        showToast('You do not have permission to add items', 'error');
        return;
      }
      
      appState.editingItem = null;
      const formTitle = document.getElementById('form-title');
      if (formTitle) {
        formTitle.textContent = 'Add New Item';
      }
      resetForm();
      showView('add-item');
      
      // Update nav
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const addNavLink = document.querySelector('.nav-link[data-view="add-item"]');
      if (addNavLink) {
        addNavLink.classList.add('active');
      }
    });
  }
  
  // Form submission
  const itemForm = document.getElementById('item-form');
  if (itemForm) {
    itemForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Cancel button
  const cancelBtn = document.getElementById('cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showView('all-items');
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const allItemsNavLink = document.querySelector('.nav-link[data-view="all-items"]');
      if (allItemsNavLink) {
        allItemsNavLink.classList.add('active');
      }
    });
  }
  
  // Search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
  
  // Filter functionality
  const categoryFilter = document.getElementById('category-filter');
  const supplierFilter = document.getElementById('supplier-filter');
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', handleFilter);
  }
  
  if (supplierFilter) {
    supplierFilter.addEventListener('change', handleFilter);
  }
  
  // Export functionality
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Check permissions
      const permissions = appData.rolePermissions[securityState.currentUser.role];
      if (!permissions.includes('export')) {
        showToast('You do not have permission to export data', 'error');
        return;
      }
      
      exportToCSV();
    });
  }
  
  // Modal functionality
  const closeModal = document.getElementById('close-modal');
  const modal = document.getElementById('item-detail-modal');
  
  if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
  }
  
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModalFunc();
      }
    });
  }
  
  // Select all checkbox
  const selectAll = document.getElementById('select-all');
  if (selectAll) {
    selectAll.addEventListener('change', handleSelectAll);
  }
  
  // Table sorting
  const sortableHeaders = document.querySelectorAll('.sortable');
  sortableHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const column = this.dataset.sort;
      if (column) {
        handleSort(column);
      }
    });
  });
  
  // Modal edit and delete buttons
  const editItemBtn = document.getElementById('edit-item-btn');
  const deleteItemBtn = document.getElementById('delete-item-btn');
  
  if (editItemBtn) {
    editItemBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Check permissions
      const permissions = appData.rolePermissions[securityState.currentUser.role];
      if (!permissions.includes('edit')) {
        showToast('You do not have permission to edit items', 'error');
        return;
      }
      
      if (appState.editingItem) {
        closeModalFunc();
        populateForm(appState.editingItem);
        const formTitle = document.getElementById('form-title');
        if (formTitle) {
          formTitle.textContent = 'Edit Item';
        }
        showView('add-item');
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const addNavLink = document.querySelector('.nav-link[data-view="add-item"]');
        if (addNavLink) {
          addNavLink.classList.add('active');
        }
      }
    });
  }
  
  if (deleteItemBtn) {
    deleteItemBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Check permissions
      const permissions = appData.rolePermissions[securityState.currentUser.role];
      if (!permissions.includes('delete')) {
        showToast('You do not have permission to delete items', 'error');
        return;
      }
      
      if (appState.editingItem && confirm('Are you sure you want to delete this item?')) {
        deleteItem(appState.editingItem.id);
        closeModalFunc();
      }
    });
  }
}

// Continue with rest of inventory management functions...
function populateDropdowns() {
  console.log('Populating dropdowns...');
  
  // Categories
  const categorySelects = [
    document.getElementById('item-category'),
    document.getElementById('category-filter')
  ];
  
  categorySelects.forEach(select => {
    if (select) {
      if (select.id === 'category-filter') {
        select.innerHTML = '<option value="">All Categories</option>';
      } else {
        select.innerHTML = '<option value="">Select Category</option>';
      }
      
      appData.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
      });
    }
  });
  
  // Suppliers
  const supplierSelects = [
    document.getElementById('item-supplier'),
    document.getElementById('supplier-filter')
  ];
  
  supplierSelects.forEach(select => {
    if (select) {
      if (select.id === 'supplier-filter') {
        select.innerHTML = '<option value="">All Suppliers</option>';
      } else {
        select.innerHTML = '<option value="">Select Supplier</option>';
      }
      
      appData.suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier.name;
        option.textContent = supplier.name;
        select.appendChild(option);
      });
    }
  });
}

// Dashboard functionality
function updateDashboard() {
  const items = appData.inventory_items;
  
  // Update metrics
  const totalItemsEl = document.getElementById('total-items');
  if (totalItemsEl) totalItemsEl.textContent = items.length;
  
  const lowStockItems = items.filter(item => item.quantity <= item.reorder_level);
  const lowStockCountEl = document.getElementById('low-stock-count');
  if (lowStockCountEl) lowStockCountEl.textContent = lowStockItems.length;
  
  const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const totalValueEl = document.getElementById('total-value');
  if (totalValueEl) totalValueEl.textContent = `₹${totalValue.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
  
  const categoriesCountEl = document.getElementById('categories-count');
  if (categoriesCountEl) categoriesCountEl.textContent = appData.categories.length;
  
  // Update chart
  updateInventoryChart();
  
  // Update low stock alerts
  updateLowStockAlerts(lowStockItems);
}

function updateInventoryChart() {
  const canvas = document.getElementById('inventory-chart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Destroy existing chart if it exists
  if (appState.chart) {
    appState.chart.destroy();
  }
  
  // Calculate data by category
  const categoryData = {};
  appData.categories.forEach(category => {
    categoryData[category] = 0;
  });
  
  appData.inventory_items.forEach(item => {
    categoryData[item.category] += item.quantity;
  });
  
  const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'];
  
  appState.chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(categoryData),
      datasets: [{
        data: Object.values(categoryData),
        backgroundColor: chartColors.slice(0, Object.keys(categoryData).length),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function updateLowStockAlerts(lowStockItems) {
  const alertsContainer = document.getElementById('low-stock-alerts');
  if (!alertsContainer) return;
  
  if (lowStockItems.length === 0) {
    alertsContainer.innerHTML = '<p class="alert-description">No low stock alerts at this time.</p>';
    return;
  }
  
  alertsContainer.innerHTML = lowStockItems.map(item => `
    <div class="alert-item">
      <div class="alert-content">
        <h4 class="alert-title">${item.name}</h4>
        <p class="alert-description">Current stock: ${item.quantity} (Reorder level: ${item.reorder_level})</p>
      </div>
      <div class="alert-actions">
        <button class="btn btn--sm btn--primary" onclick="editItemFromAlert(${item.id})">Restock</button>
      </div>
    </div>
  `).join('');
}

function editItemFromAlert(itemId) {
  // Check permissions
  const permissions = appData.rolePermissions[securityState.currentUser.role];
  if (!permissions.includes('edit')) {
    showToast('You do not have permission to edit items', 'error');
    return;
  }
  
  const item = appData.inventory_items.find(i => i.id === itemId);
  if (item) {
    appState.editingItem = item;
    populateForm(item);
    const formTitle = document.getElementById('form-title');
    if (formTitle) {
      formTitle.textContent = 'Edit Item - Restock';
    }
    showView('add-item');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const addNavLink = document.querySelector('.nav-link[data-view="add-item"]');
    if (addNavLink) {
      addNavLink.classList.add('active');
    }
  }
}

// Items table functionality
function renderAllItems() {
  const tbody = document.getElementById('items-tbody');
  if (!tbody) return;
  
  const permissions = appData.rolePermissions[securityState.currentUser.role];
  
  if (appState.filteredItems.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px;">No items found</td></tr>';
    return;
  }
  
  tbody.innerHTML = appState.filteredItems.map(item => `
    <tr>
      <td><input type="checkbox" class="item-checkbox" value="${item.id}"></td>
      <td><a href="#" onclick="showItemDetails(${item.id})" class="item-name-link">${item.name}</a></td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.supplier}</td>
      <td>
        <span class="status-badge ${item.quantity <= item.reorder_level ? 'status-badge--low' : 'status-badge--normal'}">
          ${item.quantity <= item.reorder_level ? 'Low Stock' : 'In Stock'}
        </span>
      </td>
      <td>
        <div class="action-buttons">
          <button class="action-btn action-btn--view" onclick="showItemDetails(${item.id})" title="View">
            <i class="fas fa-eye"></i>
          </button>
          ${permissions.includes('edit') ? `
            <button class="action-btn action-btn--edit" onclick="editItem(${item.id})" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
          ` : ''}
          ${permissions.includes('delete') ? `
            <button class="action-btn action-btn--delete" onclick="confirmDeleteItem(${item.id})" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          ` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

function showItemDetails(itemId) {
  const item = appData.inventory_items.find(i => i.id === itemId);
  if (!item) return;
  
  appState.editingItem = item;
  
  const modalTitle = document.getElementById('modal-item-name');
  const modalBody = document.getElementById('modal-body');
  const modal = document.getElementById('item-detail-modal');
  
  if (modalTitle) modalTitle.textContent = item.name;
  
  if (modalBody) {
    modalBody.innerHTML = `
      <div class="item-detail">
        <div class="detail-item">
          <span class="detail-label">Description</span>
          <span class="detail-value">${item.description}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Category</span>
          <span class="detail-value">${item.category}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Quantity</span>
          <span class="detail-value">${item.quantity}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Price</span>
          <span class="detail-value">$${item.price.toFixed(2)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Supplier</span>
          <span class="detail-value">${item.supplier}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Reorder Level</span>
          <span class="detail-value">${item.reorder_level}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Date Added</span>
          <span class="detail-value">${formatDate(item.date_added)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Last Updated</span>
          <span class="detail-value">${formatDate(item.last_updated)}</span>
        </div>
      </div>
    `;
  }
  
  if (modal) modal.classList.remove('hidden');
}

function editItem(itemId) {
  const item = appData.inventory_items.find(i => i.id === itemId);
  if (!item) return;
  
  appState.editingItem = item;
  populateForm(item);
  const formTitle = document.getElementById('form-title');
  if (formTitle) {
    formTitle.textContent = 'Edit Item';
  }
  showView('add-item');
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const addNavLink = document.querySelector('.nav-link[data-view="add-item"]');
  if (addNavLink) {
    addNavLink.classList.add('active');
  }
}

function confirmDeleteItem(itemId) {
  if (confirm('Are you sure you want to delete this item?')) {
    deleteItem(itemId);
  }
}

function deleteItem(itemId) {
  const index = appData.inventory_items.findIndex(i => i.id === itemId);
  if (index > -1) {
    appData.inventory_items.splice(index, 1);
    applyFilters();
    updateDashboard();
    showToast('Item deleted successfully', 'success');
  }
}

function closeModalFunc() {
  const modal = document.getElementById('item-detail-modal');
  if (modal) modal.classList.add('hidden');
  appState.editingItem = null;
}

// Form handling
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('item-name').value,
    description: document.getElementById('item-description').value,
    category: document.getElementById('item-category').value,
    quantity: parseInt(document.getElementById('item-quantity').value),
    price: parseFloat(document.getElementById('item-price').value),
    supplier: document.getElementById('item-supplier').value,
    reorder_level: parseInt(document.getElementById('item-reorder').value)
  };
  
  if (appState.editingItem) {
    // Update existing item
    const index = appData.inventory_items.findIndex(i => i.id === appState.editingItem.id);
    if (index > -1) {
      appData.inventory_items[index] = {
        ...appData.inventory_items[index],
        ...formData,
        last_updated: getCurrentDate()
      };
      showToast('Item updated successfully', 'success');
    }
  } else {
    // Add new item
    const newItem = {
      id: getNextItemId(),
      ...formData,
      date_added: getCurrentDate(),
      last_updated: getCurrentDate()
    };
    appData.inventory_items.push(newItem);
    showToast('Item added successfully', 'success');
  }
  
  resetForm();
  applyFilters();
  updateDashboard();
  showView('all-items');
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const allItemsNavLink = document.querySelector('.nav-link[data-view="all-items"]');
  if (allItemsNavLink) {
    allItemsNavLink.classList.add('active');
  }
}

function populateForm(item) {
  if (item) {
    const itemName = document.getElementById('item-name');
    const itemDescription = document.getElementById('item-description');
    const itemCategory = document.getElementById('item-category');
    const itemQuantity = document.getElementById('item-quantity');
    const itemPrice = document.getElementById('item-price');
    const itemSupplier = document.getElementById('item-supplier');
    const itemReorder = document.getElementById('item-reorder');
    
    if (itemName) itemName.value = item.name || '';
    if (itemDescription) itemDescription.value = item.description || '';
    if (itemCategory) itemCategory.value = item.category || '';
    if (itemQuantity) itemQuantity.value = item.quantity || '';
    if (itemPrice) itemPrice.value = item.price || '';
    if (itemSupplier) itemSupplier.value = item.supplier || '';
    if (itemReorder) itemReorder.value = item.reorder_level || '';
  }
}

function resetForm() {
  const form = document.getElementById('item-form');
  if (form) form.reset();
  appState.editingItem = null;
}

// Search and filter functionality
function handleSearch() {
  applyFilters();
}

function handleFilter() {
  applyFilters();
}

function applyFilters() {
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const supplierFilter = document.getElementById('supplier-filter');
  
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const categoryFilterValue = categoryFilter ? categoryFilter.value : '';
  const supplierFilterValue = supplierFilter ? supplierFilter.value : '';
  
  appState.filteredItems = appData.inventory_items.filter(item => {
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm);
    
    const matchesCategory = !categoryFilterValue || item.category === categoryFilterValue;
    const matchesSupplier = !supplierFilterValue || item.supplier === supplierFilterValue;
    
    return matchesSearch && matchesCategory && matchesSupplier;
  });
  
  // Apply sorting if active
  if (appState.sortColumn) {
    sortItems(appState.sortColumn, appState.sortDirection);
  }
  
  if (appState.currentView === 'all-items') {
    renderAllItems();
  }
}

// Sorting functionality
function handleSort(column) {
  if (appState.sortColumn === column) {
    appState.sortDirection = appState.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    appState.sortColumn = column;
    appState.sortDirection = 'asc';
  }
  
  sortItems(column, appState.sortDirection);
  renderAllItems();
  updateSortIcons();
}

function sortItems(column, direction) {
  appState.filteredItems.sort((a, b) => {
    let aValue = a[column];
    let bValue = b[column];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

function updateSortIcons() {
  const sortableHeaders = document.querySelectorAll('.sortable');
  sortableHeaders.forEach(header => {
    const icon = header.querySelector('i');
    if (icon && header.dataset.sort === appState.sortColumn) {
      icon.className = appState.sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
    } else if (icon) {
      icon.className = 'fas fa-sort';
    }
  });
}

// Selection functionality
function handleSelectAll(e) {
  const checkboxes = document.querySelectorAll('.item-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = e.target.checked;
  });
}

// Categories and suppliers rendering
function renderCategories() {
  const container = document.getElementById('categories-grid');
  if (!container) return;
  
  container.innerHTML = appData.categories.map(category => {
    const itemCount = appData.inventory_items.filter(item => item.category === category).length;
    return `
      <div class="category-card">
        <div class="category-header">
          <h3 class="category-name">${category}</h3>
        </div>
        <p class="category-count">${itemCount} items</p>
      </div>
    `;
  }).join('');
}

function renderSuppliers() {
  const container = document.getElementById('suppliers-grid');
  if (!container) return;
  
  container.innerHTML = appData.suppliers.map(supplier => {
    const itemCount = appData.inventory_items.filter(item => item.supplier === supplier.name).length;
    return `
      <div class="supplier-card">
        <div class="supplier-header">
          <h3 class="supplier-name">${supplier.name}</h3>
        </div>
        <p class="supplier-contact">${supplier.contact}</p>
        <p class="category-count">${itemCount} items supplied</p>
      </div>
    `;
  }).join('');
}

// User management (Admin only)
function renderUsers() {
  const container = document.getElementById('users-grid');
  if (!container) return;
  
  // Check if current user is admin
  if (securityState.currentUser.role !== 'Admin') {
    container.innerHTML = '<p>Access denied. Admin privileges required.</p>';
    return;
  }
  
  container.innerHTML = appData.users.map(user => `
    <div class="user-card">
      <div class="user-header">
        <h3 class="user-name">${user.firstName} ${user.lastName}</h3>
        <span class="user-role-badge user-role-badge--${user.role.toLowerCase()}">${user.role}</span>
      </div>
      <div class="user-meta">
        <p class="user-email">${user.username}</p>
        <p class="category-count">Last login: ${user.lastLogin ? formatDate(user.lastLogin) : 'Never'}</p>
        <p class="category-count">Status: ${user.accountStatus}</p>
        ${user.failedAttempts > 0 ? `<p class="category-count">Failed attempts: ${user.failedAttempts}</p>` : ''}
        ${user.lockoutUntil && Date.now() < user.lockoutUntil ? `<p class="category-count text-error">Account locked until: ${formatDate(new Date(user.lockoutUntil).toISOString())}</p>` : ''}
      </div>
    </div>
  `).join('');
}

// Export functionality
function exportToCSV() {
  showLoading();
  
  setTimeout(() => {
    const headers = ['ID', 'Name', 'Description', 'Category', 'Quantity', 'Price', 'Supplier', 'Reorder Level', 'Date Added', 'Last Updated'];
    const csvContent = [
      headers.join(','),
      ...appData.inventory_items.map(item => [
        item.id,
        `"${item.name}"`,
        `"${item.description}"`,
        item.category,
        item.quantity,
        item.price,
        `"${item.supplier}"`,
        item.reorder_level,
        item.date_added,
        item.last_updated
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_export_${getCurrentDate()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    hideLoading();
    showToast('Inventory exported successfully', 'success');
  }, 1000);
}

// Utility functions
function getNextItemId() {
  return Math.max(...appData.inventory_items.map(item => item.id)) + 1;
}

function getNextUserId() {
  return Math.max(...appData.users.map(user => user.id)) + 1;
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  
  const icon = type === 'success' ? 'check-circle' : 
               type === 'error' ? 'exclamation-circle' : 
               'exclamation-triangle';
  
  toast.innerHTML = `
    <i class="fas fa-${icon} toast-icon"></i>
    <span class="toast-message">${message}</span>
    <button class="toast-close">&times;</button>
  `;
  
  toastContainer.appendChild(toast);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = 'slideOutRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }
  }, 4000);
  
  // Add click to close
  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (toast.parentNode) {
        toast.style.animation = 'slideOutRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 300);
      }
    });
  }
}

function showLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) loadingOverlay.classList.remove('hidden');
}

function hideLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) loadingOverlay.classList.add('hidden');
}