const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
    // Store a reference within a global variable to the event triggered on load for later use
    window.deferredPrompt = event;
  });

butInstall.addEventListener("click", async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
  
    // Show the install prompt, so the web app can used as a native application.
    promptEvent.prompt();
  
    // Reset the variable,hence avoiding repeated installation prompts.
    window.deferredPrompt = null;
  });

window.addEventListener("appinstalled", (event) => {
    // Reset the variable,hence avoiding repeated installation prompts once the app is installed.
    window.deferredPrompt = null;
});
