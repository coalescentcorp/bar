function repeatEvents() {
    const events = [
        {
            day: 5, // Friday
            title: 'FRIDAYS',
            date: getNextOccurrence(5),
            time: '7:00 PM – 8:00 PM',
            description: 'Welcome!'
        },
        {
            day: 6, // Saturday
            title: 'SATURDAYS',
            date: getNextOccurrence(6),
            time: '7:00 PM – 8:00 PM',
            description: ''
        }
    ];

    events.forEach(event => {
        createOrUpdateEvent(event);
    });
}

function getNextOccurrence(dayOfWeek) {
    const today = new Date();
    let nextDate = new Date(today);

    // If today is the target day, schedule for next week
    nextDate.setDate(today.getDate() + ((dayOfWeek - today.getDay() + 7) % 7 || 7));
    nextDate.setHours(0, 0, 0, 0);

    return nextDate.toDateString();
}

function createOrUpdateEvent(event) {
    let container = document.querySelector(`.event-item[data-day="${event.day}"]`);

    // If the container doesn't exist, create it
    if (!container) {
        container = document.createElement('div');
        container.className = 'event-item';
        container.setAttribute('data-day', event.day);

        container.innerHTML = `
            <div class="event-title"></div>
            <div class="event-date"></div>
            <div class="event-time"></div>
            <div class="event-description"></div>
        `;

        document.body.appendChild(container); // Append to the body or target container
    }

    // Update the content
    container.querySelector('.event-title').textContent = event.title;
    container.querySelector('.event-date').textContent = event.date;
    container.querySelector('.event-time').textContent = event.time;
    container.querySelector('.event-description').textContent = event.description;

    container.style.display = 'block';
}

function refreshEvents() {
    console.log('Checking for past events...');

    const today = new Date();

    // If the event date is in the past, update to the next occurrence
    repeatEvents();
}

// Load events on page load
document.addEventListener('DOMContentLoaded', () => {
    repeatEvents();
    console.log('Events loaded');
});

// Run the refresh every 24 hours to automate it
setInterval(refreshEvents, 24 * 60 * 60 * 1000); // Every 24 hours
