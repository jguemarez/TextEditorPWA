const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
    // Store a reference within a global variable to the event triggered on load for later use
    window.deferredPrompt = event;
    //Removing the hidden attribute from the install button.
    butInstall.removeAttribute('hidden');
  });

butInstall.addEventListener("click", async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
  
    // Show the install prompt, so the web app can used as a native application.
    promptEvent.prompt();

    const result = await promptEvent.userChoice;
    console.log(result);
  
    // Reset the variable,hence avoiding repeated installation prompts.
    window.deferredPrompt = null;
    //Adding the hidden attribute to the install button once the app is installed on the user's local disk.
    butInstall.setAttribute('hidden', true);
  });

window.addEventListener("appinstalled", () => {
    console.info('JATE app is already installed on your system!');
    // Reset the variable,hence avoiding repeated installation prompts once the app is installed.
    window.deferredPrompt = null;
});
