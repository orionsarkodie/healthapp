const poolData = {
  UserPoolId: 'eu-north-1_MdDkhHSik',
  ClientId: '4lf9esodsea7pcne310tecdrqr'
};

const dashPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
const dashUser = dashPool.getCurrentUser();

if (!dashUser) {
  alert('You must be logged in');
  window.location.href = 'login.html';
} else {
  dashUser.getSession((err, session) => {
    if (err || !session.isValid()) {
      alert('Session expired. Login again.');
      window.location.href = 'login.html';
    } else {
      dashUser.getUserAttributes((err, attrs) => {
        if (err) return alert('Could not fetch user data.');

        let role = attrs.find(a => a.getName() === 'custom:role')?.getValue();
        const content = document.getElementById('dashboard-content');

        if (role === 'doctor') {
          content.innerHTML = '<h2 class="text-2xl font-bold text-blue-800">Doctor Dashboard</h2><p class="mt-2">Manage your consultations and patients.</p>';
        } else if (role === 'patient') {
          content.innerHTML = '<h2 class="text-2xl font-bold text-blue-800">Patient Dashboard</h2><p class="mt-2">Book appointments and access your health records.</p>';
        } else {
          content.innerHTML = '<p>Unknown role.</p>';
        }
      });
    }
  });
}

function logout() {
  if (dashUser) {
    dashUser.signOut();
    alert('Logged out.');
    window.location.href = 'login.html';
  }
}
