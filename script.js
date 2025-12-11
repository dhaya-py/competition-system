// Dynamically load config from Pages Function
let WORKER_URL = null;

async function loadConfig() {
  try {
    const res = await fetch("/config");
    const data = await res.json();
    WORKER_URL = data.workerUrl;
  } catch (err) {
    console.error("Failed to load config:", err);
  }
}

await loadConfig(); // Ensure config loads before form submission

// Form logic
const form = document.getElementById("entryForm");
const submitBtn = document.getElementById("submitBtn");
const statusEl = document.getElementById("status");

const setStatus = (msg, cls) => {
  statusEl.textContent = msg;
  statusEl.className = cls || "";
};

const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = phone => /^\+?[0-9\-\s]{7,15}$/.test(phone);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setStatus("", "");

  if (!WORKER_URL) {
    setStatus("Configuration error. Please try again.", "error");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone)
    return setStatus("All fields are required", "error");

  if (!validateEmail(email))
    return setStatus("Enter a valid email", "error");

  if (!validatePhone(phone))
    return setStatus("Enter a valid phone number", "error");

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone })
    });

    if (res.status === 200) {
      setStatus("Submitted successfully!", "success");
      form.reset();
    } else if (res.status === 409) {
      setStatus("Duplicate entry detected.", "error");
    } else if (res.status === 202) {
      setStatus("Accepted and queued.", "info");
      form.reset();
    } else {
      const json = await res.json().catch(() => null);
      setStatus(json?.error || "Submission failed. Try again.", "error");
    }
  } catch (err) {
    console.error(err);
    setStatus("Network error. Try again.", "error");
  }

  submitBtn.disabled = false;
  submitBtn.textContent = "Submit Entry";
});
