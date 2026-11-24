const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const copyBtn = document.getElementById("copy");
const optionsBtn = document.getElementById("options");

async function load() {
  const data = await chrome.storage.local.get(["status", "result", "original"]);
  if (data.status === "processing") {
    statusEl.textContent = "Processing with AI...";
    resultEl.textContent = "Please wait...";
  } else if (data.result) {
    statusEl.textContent = data.status === "error" ? "Error" : "Done";
    resultEl.textContent = data.result;
    copyBtn.style.display = "inline-block";
  }
}

copyBtn.addEventListener("click", async () => {
  const text = resultEl.textContent;
  await navigator.clipboard.writeText(text);
  copyBtn.textContent = "Copied!";
  setTimeout(() => copyBtn.textContent = "Copy Result", 1500);
});

optionsBtn.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

load();
// Refresh when storage changes
chrome.storage.onChanged.addListener(load);