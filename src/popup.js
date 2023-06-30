document
  .querySelector("form[id='credentialsForm']")
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);

    // save into storage
    chrome.storage.local.set({
      credentials: {
        clientId: data.get('clientId'),
        username: data.get('username'),
        password: data.get('password'),
      },
    });

    alert('Saved!');
  });

window.onload = function () {
  (async () => {
    const { credentials } = await chrome.storage.local.get('credentials');

    if (credentials) {
      document.querySelector("input[name='clientId']").value =
        credentials.clientId;
      document.querySelector("input[name='username']").value =
        credentials.username;
      document.querySelector("input[name='password']").value =
        credentials.password;
    }
  })();
};
