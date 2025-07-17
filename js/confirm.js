console.log("confirm.js loaded");

const poolData = {
  UserPoolId: 'eu-north-1_MdDkhHSik',
  ClientId: '4lf9esodsea7pcne310tecdrqr'
};

const confirmPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Auto-fill email if stored from sign-up
const storedEmail = localStorage.getItem('signupEmail');
if (storedEmail) {
  document.getElementById('email').value = storedEmail;
}

document.getElementById('confirm-form').addEventListener('submit', function (e) {
  e.preventDefault();
  console.log("Form submitted");

  const email = document.getElementById('email').value;
  const code = document.getElementById('code').value;

  const userData = {
    Username: email,
    Pool: confirmPool
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.confirmRegistration(code, true, function (err, result) {
    const msg = document.getElementById('message');
    if (err) {
      console.error("Confirmation error:", err);
      return msg.innerText = 'Error: ' + err.message;
    }

    console.log("Confirmation success:", result);
    msg.innerText = 'Email confirmed! Redirecting to login...';
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  });
});