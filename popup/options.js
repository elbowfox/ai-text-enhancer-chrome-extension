const providerEl = document.getElementById("provider");
const apiKeyEl = document.getElementById("apiKey");
const modelEl = document.getElementById("model");

document.getElementById("save").addEventListener("click", async () => {
  await chrome.storage.sync.set({
    provider: providerEl.value,
    apiKey: apiKeyEl.value.trim(),
    model: modelEl.value.trim()
  });
  alert("Saved!");
});

(async () => {
  const data = await chrome.storage.sync.get(["provider", "apiKey", "model"]);
  if (data.provider) providerEl.value = data.provider;
  if (data.apiKey) apiKeyEl.value = data.apiKey;
  if (data.model) modelEl.value = data.model;
})();