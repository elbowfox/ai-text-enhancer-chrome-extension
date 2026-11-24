// background/background.js - AI Text Enhancer Service Worker

const ACTIONS = {
  rewrite: "Rewrite the following text to be clearer, more professional, and concise while preserving the original meaning:",
  summarize: "Summarize the following text in 2-3 bullet points or a short paragraph:",
  expand: "Expand the following text with more detail, examples, and depth while keeping the core message:",
  improve: "Improve the following text for grammar, clarity, engagement, and impact:",
  casual: "Rewrite the following text in a casual, friendly, conversational tone:",
  formal: "Rewrite the following text in a formal, professional tone:"
};

chrome.runtime.onInstalled.addListener(() => {
  Object.keys(ACTIONS).forEach(action => {
    chrome.contextMenus.create({
      id: action,
      title: action.charAt(0).toUpperCase() + action.slice(1) + " with AI",
      contexts: ["selection"]
    });
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!info.selectionText || !ACTIONS[info.menuItemId]) return;

  const { apiKey, provider = "openai", model } = await chrome.storage.sync.get(["apiKey", "provider", "model"]);
  
  if (!apiKey) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: "AI Text Enhancer",
      message: "Please set your API key in the extension options."
    });
    return;
  }

  const selected = info.selectionText.trim();
  if (selected.length < 5) return;

  chrome.storage.local.set({ status: "processing", result: "" });

  try {
    const prompt = `${ACTIONS[info.menuItemId]}\n\n${selected}`;
    const result = await callAI(prompt, apiKey, provider, model);
    
    chrome.storage.local.set({ status: "done", result, original: selected });
    chrome.action.openPopup();
  } catch (err) {
    chrome.storage.local.set({ status: "error", result: err.message });
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: "AI Error",
      message: err.message.slice(0, 100)
    });
  }
});

async function callAI(prompt, apiKey, provider, model) {
  const isXAI = provider === "xai" || provider === "grok";
  const url = isXAI 
    ? "https://api.x.ai/v1/chat/completions" 
    : "https://api.openai.com/v1/chat/completions";
  
  const defaultModel = isXAI ? "grok-3" : "gpt-4o-mini";
  const useModel = model || defaultModel;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: useModel,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "No response";
}