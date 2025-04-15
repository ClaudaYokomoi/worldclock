// DOM Elements
const citySelect = document.getElementById('city-select');
const cityName = document.getElementById('city-name');
const timeDisplay = document.getElementById('time-display');
const dateDisplay = document.getElementById('date-display');
const nyTime = document.querySelector('.la-time');
const londonTime = document.querySelector('.paris-time');
const tokyoTime = document.querySelector('.tokyo-time');
const nyDate = document.querySelector('.new-york .date');
const londonDate = document.querySelector('.london .date');
const tokyoDate = document.querySelector('.tokyo .date');

// City data
const cities = [
    { element: nyTime, dateElement: nyDate, zone: 'America/New_York', name: 'New York' },
    { element: londonTime, dateElement: londonDate, zone: 'Europe/London', name: 'London' },
    { element: tokyoTime, dateElement: tokyoDate, zone: 'Asia/Tokyo', name: 'Tokyo' }
];

// Update all clocks
function updateAllClocks() {
    const now = moment();
    
    cities.forEach(city => {
        const cityTime = now.clone().tz(city.zone);
        city.element.textContent = cityTime.format('HH:mm:ss');
        city.dateElement.textContent = cityTime.format('dddd, MMMM D');
    });
}

// Update selected city clock
function updateSelectedCity() {
    const selectedZone = citySelect.value;
    
    if (!selectedZone) {
        cityName.textContent = 'Select a city';
        timeDisplay.textContent = '--:--:--';
        dateDisplay.textContent = 'Day, Month 00, 0000';
        return;
    }

    if (selectedZone === 'current') {
        try {
            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const now = moment().tz(userTimeZone);
            const cityNameParts = userTimeZone.split('/');
            const displayName = cityNameParts.length > 1 ? cityNameParts[1].replace(/_/g, ' ') : userTimeZone;
            
            cityName.innerHTML = `<i class="fas fa-location-dot"></i> ${displayName}`;
            timeDisplay.textContent = now.format('HH:mm:ss');
            dateDisplay.textContent = now.format('dddd, MMMM D, YYYY');
        } catch (error) {
            cityName.textContent = 'Could not detect location';
            timeDisplay.textContent = '--:--:--';
            dateDisplay.textContent = 'Select a city instead';
        }
    } else {
        const now = moment().tz(selectedZone);
        const city = citySelect.options[citySelect.selectedIndex].text;
        
        cityName.textContent = city;
        timeDisplay.textContent = now.format('HH:mm:ss');
        dateDisplay.textContent = now.format('dddd, MMMM D, YYYY');
    }
}

// Initialize the app
function init() {
    // Set initial time
    updateAllClocks();
    updateSelectedCity();
    
    // Update clocks every second
    setInterval(() => {
        updateAllClocks();
        updateSelectedCity();
    }, 1000);

    // Handle city selection
    citySelect.addEventListener('change', updateSelectedCity);
}

// Start the app
document.addEventListener('DOMContentLoaded', init);