// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
// Establish Phoenix Socket and LiveView configuration.
import {Socket} from "phoenix"
import {LiveSocket} from "phoenix_live_view"
import topbar from "../vendor/topbar"

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {
  longPollFallbackMs: 2500,
  params: {_csrf_token: csrfToken}
})

// Show progress bar on live navigation and form submits
topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"})
window.addEventListener("phx:page-loading-start", _info => topbar.show(300))
window.addEventListener("phx:page-loading-stop", _info => topbar.hide())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket


document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll('.nav-item');

  navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
      const hoverText = link.getAttribute('data-hover-text');
      updateHoverText(hoverText);
    });

    link.addEventListener('mouseleave', () => {
      resetHoverText();
    });
  });

  function updateHoverText(text) {
    // Update hover text
    document.querySelector('.navbar').setAttribute('data-hover-text', text);
  }

  function resetHoverText() {
    // Reset hover text
    document.querySelector('.navbar').removeAttribute('data-hover-text');
  }
});

// Add JavaScript event listeners to handle dragging and dropping
document.addEventListener('DOMContentLoaded', function() {
  const temperatureCard = document.getElementById('temperature-card');
  const dropzones = document.querySelectorAll('.dropzone');

  // Add event listener to the temperature card to initiate dragging
  temperatureCard.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', 'temperature');
  });

  // Add event listeners to each dropzone <li> element
  dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', function(event) {
      event.preventDefault();
    });

    dropzone.addEventListener('drop', function(event) {
      event.preventDefault();
      const draggedItem = event.dataTransfer.getData('text/plain');

      const newP = document.createElement('p');
      newP.innerText = 'Temperature: 72°F';
      // Check if the dropped item is the temperature card
      if (draggedItem === 'temperature') {
        // Append the temperature card to the dropzone
        dropzone.appendChild(temperatureCard);
        // Delete the p belong to the dropzone
        const p = dropzone.querySelector('p');

        // Append just once to the temperature card


        temperatureCard.innerHTML = `
        <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800 dropzone" data-target="temperature">
            <img src="/images/icons8-temperature-96.png" alt="Temperature Icon" style="filter: invert(100%)" class="w-8 h-8 mr-4">
            <div>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Temperature</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">21 º C</p>
            </div>
        </div>
    `;

        if (p) {
          p.remove();
        }
        
      }
    });
  });
});
