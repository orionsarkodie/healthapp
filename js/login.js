const poolData = {
  UserPoolId: 'eu-north-1_MdDkhHSik',
  ClientId: '4lf9esodsea7pcne310tecdrqr'
};

const loginPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userData = { Username: email, Pool: loginPool };
  const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({ Username: email, Password: password });

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authDetails, {
    onSuccess: function (result) {
      localStorage.setItem('idToken', result.getIdToken().getJwtToken());
      window.location.href = 'dashboard.html';
    },
    onFailure: function (err) {
      document.getElementById('message').innerText = 'Login failed: ' + err.message;
    }
  });
});