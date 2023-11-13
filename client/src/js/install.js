const butInstall = document.getElementById('buttonInstall');
// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    // Store a reference within a global variable to the event triggered on load for later use
    window.deferredPrompt = event;
    //Removing the hidden attribute from the install button.
    butInstall.hidden = false;
  });

butInstall.addEventListener("click", async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
  
    // Show the install prompt, so the web app can used as a native application.
    const result = await promptEvent.prompt();

    console.info(`Install prompt was: ${result.outcome}`);
    // Reset the variable,hence avoiding repeated installation prompts.
    window.deferredPrompt = null;
    //Adding the hidden attribute to the install button once the app is installed on the user's local disk.
    butInstall.hidden = true;
  });

window.addEventListener("appinstalled", () => {
    // Reset the variable,hence avoiding repeated installation prompts once the app is installed.
  window.deferredPrompt = null;
});
