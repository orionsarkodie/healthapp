const poolData = {
  UserPoolId: 'eu-north-1_MdDkhHSik',
  ClientId: '4lf9esodsea7pcne310tecdrqr'
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const attributeList = [
    new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }),
    new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:role', Value: role })
  ];

  userPool.signUp(email, password, attributeList, null, function (err, result) {
    const msg = document.getElementById('message');
    if (err) return msg.innerText = 'Error: ' + err.message;

    // Store email for confirm page and redirect
    localStorage.setItem('signupEmail', email);
    window.location.href = 'confirm.html';
  });
});