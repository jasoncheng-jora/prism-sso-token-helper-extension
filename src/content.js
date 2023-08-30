function populateForm(value) {
  document.querySelector("input[name='bearerToken']").value = value;
}

(async () => {
  const token = await chrome.runtime.sendMessage({
    type: 'getToken',
  });
  if (token.error) {
    return alert(token.error);
  }
  populateForm(token.access_token);
})();
