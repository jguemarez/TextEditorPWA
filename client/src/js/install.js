const butInstall = document.getElementById('buttonInstall');
let installPrompt = null;
// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    // Store a reference within a global variable to the event triggered on load for later use
    installPrompt = event;
    //Removing the hidden attribute from the install button.
    butInstall.removeAttribute('hidden');
  });

butInstall.addEventListener("click", async () => {
    const promptEvent = installPrompt;
    if (!promptEvent) {
      return;
    }
  
    // Show the install prompt, so the web app can used as a native application.
    const result = await promptEvent.prompt();

    console.info(`Install prompt was: ${result.outcome}`);
    // Reset the variable,hence avoiding repeated installation prompts.
    installPrompt = null;
    //Adding the hidden attribute to the install button once the app is installed on the user's local disk.
    butInstall.setAttribute('hidden', "");
  });

window.addEventListener("appinstalled", () => {
    console.info('JATE app is already installed on your system!');
    // Reset the variable,hence avoiding repeated installation prompts once the app is installed.
    installPrompt = null;
});
/*
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Update UI notify the user they can install the PWA
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', () => {
  // Show the prompt if deferredPrompt is stored
  if (window.deferredPrompt) {
    window.deferredPrompt.prompt();
    window.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      window.deferredPrompt = null;
      butInstall.style.display = 'none';
    });
  } else {
    // The user hit the install button but the app can't prompt to install (likely already installed)
    alert('The app is already installed or not available for install.');
  }
});

window.addEventListener('appinstalled', (event) => {
  // Log the installation to analytics or console
  console.log('PWA was installed', event);
  // Hide the install button after the app is installed
  butInstall.style.display = 'none';
  // Clear any stored deferredPrompt since the app was installed
  window.deferredPrompt = null;
});

// On load, or when the 'load' event fires, check if the PWA is already installed.
window.addEventListener('load', () => {
  butInstall.style.display = 'block'; // Always show the install button until app is installed
});*/