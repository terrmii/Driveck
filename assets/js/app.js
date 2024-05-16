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
    document.querySelector('.navbar').setAttribute('data-hover-text', text);
  }

  function resetHoverText() {
    document.querySelector('.navbar').removeAttribute('data-hover-text');
  }
});

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('nav');
  if (navbar) {
    if (window.scrollY > 150) {
      navbar.classList.add('bg-gray-900');
    } else {
      navbar.classList.remove('bg-gray-900');
    }
  }
});

// Features
// Add JavaScript event listeners to handle dragging and dropping
document.addEventListener('DOMContentLoaded', function() {
  const temperatureCard = document.getElementById('temperature-card');
  const humidityCard = document.getElementById('humidity-card');
  const dataCard = document.getElementById('data-card');
  const dropzones = document.querySelectorAll('.dropzone');

  // Add event listener to the temperature card to initiate dragging
  temperatureCard.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', 'temperature');
    
  });

  // Add event listener to the humidity card to initiate dragging
  humidityCard.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', 'humidity');
  });

  // Add event listener to the data card to initiate dragging
  dataCard.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', 'data');
  });

  // Add event listeners to each dropzone <li> element
  dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', function(event) {
      event.preventDefault();
    });

    dropzone.addEventListener('drop', function(event) {
      event.preventDefault();
      const draggedItem = event.dataTransfer.getData('text/plain');

      // Check if the dropped item is the temperature card
      if (draggedItem === 'temperature' ) {
        // Append the temperature card to the dropzone
        dropzone.appendChild(temperatureCard);

          // Set the innerHTML for h-48 dropzone
          temperatureCard.innerHTML = `
          <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
            Toggle modal
          </button>
          
          <div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div class="relative p-4 w-full max-w-md max-h-full">
                  <!-- Modal content -->
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <!-- Modal header -->
                      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                              Create New Product
                          </h3>
                          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                              </svg>
                              <span class="sr-only">Close modal</span>
                          </button>
                      </div>
                      <!-- Modal body -->
                      <form class="p-4 md:p-5">
                          <div class="grid gap-4 mb-4 grid-cols-2">
                              <div class="col-span-2">
                                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                  <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
                              </div>
                              <div class="col-span-2 sm:col-span-1">
                                  <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                  <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="">
                              </div>
                              <div class="col-span-2 sm:col-span-1">
                                  <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                  <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                      <option selected="">Select category</option>
                                      <option value="TV">TV/Monitors</option>
                                      <option value="PC">PC</option>
                                      <option value="GA">Gaming/Console</option>
                                      <option value="PH">Phones</option>
                                  </select>
                              </div>
                              <div class="col-span-2">
                                  <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                  <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                              </div>
                          </div>
                          <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                              Add new product
                          </button>
                      </form>
                  </div>
              </div>
          </div>           
      `;


        // Delete the p with text-2xl text-gray-400 dark:text-gray-500 class belong to the dropzone
        const p = dropzone.querySelector('p.text-2xl.text-gray-400.dark\\:text-gray-500');
        if (p) {
          p.style.display = 'none';
        }
        
      }else if(draggedItem === 'humidity'){
        dropzone.appendChild(humidityCard);
        if (dropzone.classList.contains('h-48')) {
          // Set the innerHTML for h-48 dropzone
          humidityCard.innerHTML = `
          <div class="flex items-center justify-center h-48 mb-4 dropzone" data-target="temperature">
              <div id="humidity-card" class="max-w-sm p-4 rounded-lg ">
                  <div class="flex items-center">
                      <img src="/images/icons8-drop-96.png" alt="Humidity Icon" style="filter: invert(100%)" class="mr-3">
                      <div>
                          <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Humidity</h5>
                          <p class="text-xl text-gray-700 dark:text-gray-400">45%</p>
                      </div>
                  </div>
              </div>
          </div>
      `; // Replace with the actual HTML for h-48 dropzone
        } else if (dropzone.classList.contains('h-28')) {
          // Set the innerHTML for h-28 dropzone
          humidityCard.innerHTML = `
          <div class="flex items-center justify-center rounded h-28 dropzone" data-target="temperature">
              <img src="/images/icons8-drop-96.png" alt="Humidity Icon" style="filter: invert(100%)" class="w-8 h-8 mr-4">
              <div>
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Humidity</h5>
                  <p class="font-normal text-gray-700 dark:text-gray-400">45%</p>
              </div>
          </div>
      `;
        }else if (dropzone.classList.contains('h-24')) {
          // Set the innerHTML for h-28 dropzone
          humidityCard.innerHTML = `
          <div id="humidity-card" class=" p-4 rounded-lg" draggable="true" style="z-index: 999;">
            <img src="/images/icons8-drop-96.png" alt="Humidity Icon" style="filter: invert(100%)" class="mr-1 h-8">
            <div>
              <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Humidity</h5>
              <p class="font-normal text-gray-700 dark:text-gray-400 text-sm">45%</p>
            </div>
          </div>
      `;
        }
          // Delete the p with text-2xl text-gray-400 dark:text-gray-500 class belong to the dropzone
          const p = dropzone.querySelector('p.text-2xl.text-gray-400.dark\\:text-gray-500');
          if (p) {
            p.style.display = 'none';
          }
      }else if(draggedItem === 'data'){
        dropzone.appendChild(dataCard);
        if (dropzone.classList.contains('h-48')) {
          // Set the innerHTML for h-48 dropzone
          dataCard.innerHTML = `
          <div class="flex items-center justify-center rounded h-48 dropzone" data-target="temperature">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Data</h5>
              <img src="/images/map-example.jpg" class="my-8 ml-4 h-18 border border-slate-950" alt="Map example">
              <p class="text-4xl text-gray-700 dark:text-gray-400 ml-5"><b>ID:</b> 23</p>
              <p class="text-4xl text-gray-700 dark:text-gray-400 ml-4"><b>Location:</b> Bishoptown</p>
              <p class="text-4xl text-gray-700 dark:text-gray-400 ml-4"><b>Name:</b> John</p>
          </div>
      `; // Replace with the actual HTML for h-48 dropzone
      }else if(dropzone.classList.contains('h-28')){
        // Set the innerHTML for h-28 dropzone
        dataCard.innerHTML = `
        <div class="flex items-center justify-center rounded h-28 dropzone" data-target="temperature">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Data</h5>
            <img src="/images/map-example.jpg" class="my-6 ml-2 h-9 border border-slate-950" alt="Map example">
            <p class="font-normal text-gray-700 dark:text-gray-400 ml-3"><b>ID:</b> 23</p>
            <p class="font-normal text-gray-700 dark:text-gray-400 ml-2"><b>Location:</b> Bishoptown</p>
            <p class="font-normal text-gray-700 dark:text-gray-400 ml-2"><b>Name:</b> John</p>
        </div>
    
    `;
      }else if (dropzone.classList.contains('h-24')) {
        // Set the innerHTML for h-28 dropzone
        dataCard.innerHTML = `
        <div class="flex items-center justify-center rounded h-24 dropzone" data-target="temperature">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Data</h5>
            <img src="/images/map-example.jpg" class="my-6 ml-2 h-9 border border-slate-950" alt="Map example">
            <p class="font-normal text-gray-700 dark:text-gray-400 ml-3"><b>ID:</b> 23</p>
            <p class="font-normal text-gray-700 dark:text-gray-400 ml-2"><b>Location:</b> Bishoptown</p>
            <p class="font-normal text-gray-700 dark:text-gray-400 ml-2"><b>Name:</b> John</p>
        </div>
    `;
      }
        // Delete the p with text-2xl text-gray-400 dark:text-gray-500 class belong to the dropzone
        const p = dropzone.querySelector('p.text-2xl.text-gray-400.dark\\:text-gray-500');
        if (p) {
          p.style.display = 'none';
        }
    };
    });
  });
});

    // Get the temperature card, humidity card, and dropdown
    const temperatureCard = document.getElementById('temperature-card');
    const humidityCard = document.getElementById('humidity-card');
    const dataCard = document.getElementById('data-card');
    const dropdown = document.getElementById('dropdown-example'); // Replace with the actual id of your dropdown

    // Add a context menu event listener to the temperature card
    temperatureCard.addEventListener('contextmenu', function(event) {
      event.preventDefault();

      // Remove the temperature card
      temperatureCard.remove();

      // Get Temperature Li
      const newTemperatureCard = document.getElementById('temperatureLi');
      newTemperatureCard.innerHTML = `
        <a href="#" id="temperature-card" data-target="temperature" draggable="true" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          Task
        </a>
      `;

      // Add the new temperature card to the dropdown
      dropdown.appendChild(newTemperatureCard);

      // Get the new temperature card
      const newTemperatureCardElement = document.getElementById('temperature-card');

      // Add drag and drop event listeners to the new temperature card
      newTemperatureCardElement.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'temperature');

      });
      newTemperatureCardElement.addEventListener('dragend', function(event) {
        event.preventDefault();
        newTemperatureCardElement.remove();
      });
    });

    // Add a context menu event listener to the humidity card
    humidityCard.addEventListener('contextmenu', function(event) {
      event.preventDefault();

      // Remove the humidity card
      humidityCard.remove();

      // Get Humidity Li
      const newHumidityCard = document.getElementById('humidityLi');
      newHumidityCard.innerHTML = `
        <a href="#" id="humidity-card" data-target="humidity" draggable="true" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          Humidity
        </a>
      `;

      // Add the new humidity card to the dropdown
      dropdown.appendChild(newHumidityCard);

      // Get the new humidity card
      const newHumidityCardElement = document.getElementById('humidity-card');

      // Add drag and drop event listeners to the new humidity card
      newHumidityCardElement.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'humidity');


      });
      newHumidityCardElement.addEventListener('dragend', function(event) {
        event.preventDefault();
        newHumidityCardElement.remove();
      });
      
    });

    dataCard.addEventListener('contextmenu', function(event) {
      event.preventDefault();
  
      // Remove the data card
      dataCard.remove();
  
      // Get Data Li
      const newDataCard = document.getElementById('dataLi');
      newDataCard.innerHTML = `
        <a href="#" id="data-card" data-target="data" draggable="true" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          Data
        </a>
      `;
  
      // Add the new data card to the dropdown
      dropdown.appendChild(newDataCard);
  
      // Get the new data card
      const newDataCardElement = document.getElementById('data-card');
  
      // Add drag and drop event listeners to the new data card
      newDataCardElement.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'data');
      });
      newDataCardElement.addEventListener('dragend', function(event) {
        event.preventDefault();
        newDataCardElement.remove();
      });
    });