// Setting current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// --- MENU LOGIC ---
const hamburger = document.getElementById('hamburger');
const navContent = document.getElementById('navContent');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    navContent.classList.toggle('active');
    document.body.style.overflow = navContent.classList.contains('active') ? 'hidden' : 'auto';
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        navContent.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// --- SCROLL NAVBAR LOGIC ---
let lastScrollTop = 0;
const navbar = document.getElementById('mainNav');

window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (navContent.classList.contains('active')) return;
    if (currentScroll > lastScrollTop && currentScroll > 50) {
        navbar.classList.add('collapsed');
    } else {
        navbar.classList.remove('collapsed');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
});

// --- MAP AND SEARCH CONFIGURATION ---

// 1. Starting map centered globally without zoom controls
var map = L.map('map', { 
    zoomControl: false,
    scrollWheelZoom: false, 
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false
}).setView([30, 10], 2);

// Function to enable map interactions
function enableMapInteractions() {
    map.scrollWheelZoom.enable();
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    // Opztionally change cursor style
    document.getElementById('map').style.cursor = 'grab';
}

// Button to enable map interactions
document.querySelector('.btn-hero').addEventListener('click', function(e) {
    // Enable map interactions
    enableMapInteractions();
});

// 2. Adding custom zoom controls at bottom right
L.control.zoom({ position: 'bottomright' }).addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Enable interactivity on map click
map.on('click', function() {
    map.scrollWheelZoom.enable();
    map.dragging.enable();
    if (map.tap) map.tap.enable(); // For mobile devices
});

// (Optional) Disable interactivity when mouse leaves the map
map.on('mouseout', function() {
    map.scrollWheelZoom.disable();
    map.dragging.disable();
});

// Object to hold markers for search functionality
var markersMap = {};

const drawer = document.getElementById('project-drawer');
const drawerContent = document.getElementById('drawer-content');

var teamsList = [
    { lat: 51.995, lng: 5.091, name: "VV Vianen", link: "#works", logo: "assets/Vianen.jpg" },
    { lat: 14.599, lng: 120.984, name: "Philippines National Mens Football Team", link: "#works", logo: "assets/Philippines.jpg" },
    { lat: -2.900, lng: -79.005, name: "CD Cuenca Juniors", link: "#works", logo: "assets/CuencaJuniors.jpg" },
    { lat: 38.481, lng: 28.134, name: "1984 Salihli Spor Kulübü", link: "#works", logo: "assets/Salihlispor.jpg" },
    { lat: -1.201, lng: 36.917, name: "Kahawa Pride FC", link: "#works", logo: "assets/KahawaPride.jpg" },
    { lat: 7.961, lng: -80.428, name: "Herrera FC", link: "#works", logo: "assets/HerreraFC.jpg" },
    { lat: 25.154, lng: 55.230, name: "Phoenix City FC", link: "#works", logo: "assets/PhoenixFC.jpg" },
    { lat: 10.667, lng: -61.517, name: "Trinidad & Tobago Bobsled Team", link: "#works", logo: "assets/TTBobsled.jpg" },
    { lat: 24.996, lng: 55.469, name: "Duggan 7S", link: "#works", logo: "assets/Duggan7S.jpg" },
    { lat: 36.149, lng: -5.352, name: "Magpies FCB", link: "#works", logo: "assets/MagpiesFCB.jpg" },
    { lat: 51.446, lng: -0.410, name: "Feltham Town FC", link: "#works", logo: "assets/FelthamTown.jpg" },
    { lat: 51.470, lng: -0.454, name: "No Tekk Army", link: "#works", logo: "assets/NoTekk.jpg" },
    { lat: 35.789, lng: -78.756, name: "ZALA", link: "#works", logo: "assets/ZALA.jpg" },
    { lat: 51.385, lng: -0.414, name: "Walton & Hersham FC", link: "#works", logo: "assets/WaltonHersham.jpg" },
    { lat: 25.204, lng: 55.270, name: "Al Qabila FC", link: "#works", logo: "assets/AlQabila.jpg" },
    { lat: 43.653, lng: -79.383, name: "Toronto KOI", link: "#works", logo: "assets/TorontoKOI.jpg" },
    { lat: 34.161, lng: -118.167, name: "Zoe Suder", link: "#works", logo: "assets/ZoeSuder.jpg" },
    { lat: 14.083, lng: -60.951, name: "Gros Islet Football League", link: "#works", logo: "assets/GrosIslet.jpg" },
    { lat: 53.794, lng: -1.753, name: "Leon Slater", link: "#works", logo: "assets/LeonSlater.jpg" },
    { lat: 24.465, lng: 54.391, name: "With Khaled", link: "#works", logo: "assets/WithKhaled.jpg" }
];

function addCircle(team) {
    var circle = L.circleMarker([team.lat, team.lng], {
        color: '#e42c1d', 
        fillColor: '#e42c1d', 
        fillOpacity: 0.7, 
        radius: 6,
        className: 'anim-pin'
    }).addTo(map);

    // Save marker reference for search functionality
    markersMap[team.name] = circle;

    var contentPopup = `
        <div class="popup-custom" onclick="window.location.href='${team.link}'">
            <img src="${team.logo}" alt="Logo ${team.name}">
            <p>${team.name}</p>
        </div>
    `;
    circle.bindPopup(contentPopup, { offset: [0, -10], closeButton: false, autoPan: true });
    
    circle.on('mouseover', function() { this.openPopup(); this.setStyle({ radius: 10, fillOpacity: 1 }); });
    circle.on('mouseout', function() { this.closePopup(); this.setStyle({ radius: 6, fillOpacity: 0.7 }); });
    circle.on('click', function() { showProject(team); });
}

function showProject(team) {
    drawerContent.innerHTML = `
        <h4 style="font-family: var(--font-mono); color: var(--accent); margin-bottom: 16px;">PROJECT REPORT</h4>
        <img src="${team.logo}" alt="${team.name}" size="128px" style="width: 150px; height: auto; border-radius: 75px; margin-bottom: 16px; margin-top: 16px;"> 
        <h2 style="font-size: 3rem;; margin-bottom: 16px;">${team.name}</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px;">
        </div>
        <div class="glass" style="width: 100%; height: 300px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
        </div>
    `;
    drawer.classList.add('active');
}

// Sequentially add circles with delay for pop-in effect
teamsList.forEach((team, index) => {
    setTimeout(() => {
        addCircle(team);
    }, index * 200);
});

document.getElementById('closeDrawer').onclick = () => drawer.classList.remove('active');

document.addEventListener('mousedown', function(event) {
    const drawer = document.getElementById('project-drawer');
    
    // Se il drawer è attivo E il click NON è avvenuto dentro il drawer
    // E il click NON è avvenuto su un marker della mappa (altrimenti si chiuderebbe mentre cerchi di aprirlo)
    if (drawer.classList.contains('active') && 
        !drawer.contains(event.target) && 
        !event.target.closest('.leaflet-marker-icon') &&
        !event.target.closest('.anim-pin')) {
        
        drawer.classList.remove('active');
    }
});

// --- SEARCH FUNCTIONALITY ---
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const searchIcon = document.getElementById('search-icon');
const searchOverlay = document.querySelector('.search-overlay');
const resultsContainer = document.getElementById('search-results');

// Toggle search overlay
searchBtn.addEventListener('click', () => {
    searchOverlay.classList.toggle('active');
    
    if (searchOverlay.classList.contains('active')) {
        // Active: focus input and change icon to 'X'
        searchInput.focus();
        searchIcon.classList.remove('fa-search');
        searchIcon.classList.add('fa-times');
    } else {
        // Inactive: clear results and reset
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('show');
        searchInput.value = '';
        searchIcon.classList.remove('fa-times');
        searchIcon.classList.add('fa-search');
    }
});

// Input Listener
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    resultsContainer.innerHTML = ''; 

    const matches = teamsList.filter(s => s.name.toLowerCase().includes(query));

    if (matches.length > 0) {
        resultsContainer.classList.add('show');
        matches.forEach(match => {
            const div = document.createElement('div');
            div.classList.add('result-item');
            div.innerHTML = `<img src="${match.logo}" alt=""> <span>${match.name}</span>`;
            
            div.addEventListener('click', () => {
                goToTeam(match);
            });
            resultsContainer.appendChild(div);
        });
    } else {
        resultsContainer.classList.remove('show');
    }
});

// Function to fly to selected team
function goToTeam(team) {
    // Close search results
    resultsContainer.classList.remove('show');
    
    // Animation to team location
    map.flyTo([team.lat, team.lng], 10, {
        duration: 1.2
    });

    // Reveal popup after flight
    const marker = markersMap[team.name];
    if (marker) {
        setTimeout(() => {
            marker.openPopup();
        }, 1200);
    }
}