async function getToken(data) {
  const body = JSON.stringify({
    scope: 'mobile',
    grant_type: 'password',
    siteId: 'au',
    client_id: data.clientId,
    username: data.username,
    password: data.password,
  });
  const res = await fetch(`https://au.jora.com/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'JoraSupra/1',
    },
    body,
  });
  return res.json();
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case 'getToken':
      (async () => {
        const { credentials } = await chrome.storage.local.get('credentials');

        console.log(credentials);
        const token = await getToken({
          clientId: credentials.clientId,
          username: credentials.username,
          password: credentials.password,
        });
        sendResponse(token);
      })();
      break;
  }
  return true;
});
