function createOrUpdateEvent(event) {
    const container = document.querySelector(`.event-item[data-day="${event.day}"]`);

    if (container) {
        const titleElement = container.querySelector('.event-title');
        const dateElement = container.querySelector('.event-date');
        const timeElement = container.querySelector('.event-time');
        const descriptionElement = container.querySelector('.event-description');

        if (titleElement) titleElement.textContent = event.title;
        if (dateElement) dateElement.textContent = event.date;
        if (timeElement) timeElement.textContent = event.time;
        if (descriptionElement) descriptionElement.textContent = event.description;

        container.style.display = 'block';
    }
}

function repeatEvents(testDate = new Date()) {
    const events = [
        {
            day: 5, // Friday
            title: 'FRIDAYS',
            date: getNextOccurrence(5, testDate),
            time: '7:00 PM – 8:00 PM',
            description: 'Welcome!'
        },
        {
            day: 6, // Saturday
            title: 'SATURDAYS',
            date: getNextOccurrence(6, testDate),
            time: '7:00 PM – 8:00 PM',
            description: ''
        }
    ];

    events.forEach(event => {
        createOrUpdateEvent(event); // ✅ No more undefined error!
    });
}

function getNextOccurrence(dayOfWeek, baseDate) {
    let nextDate = new Date(baseDate);

    // If today is past the target day, schedule for next week
    nextDate.setDate(baseDate.getDate() + ((dayOfWeek + 7 - baseDate.getDay()) % 7 || 7));
    nextDate.setHours(0, 0, 0, 0);

    return nextDate.toDateString();
}

function refreshEvents() {
    console.log('Checking for past events...');

    const today = new Date();

    // If the event date is in the past, update to the next occurrence
    repeatEvents(today);
}

// Load events on page load
document.addEventListener('DOMContentLoaded', () => repeatEvents(new Date()));

// Run the refresh every 24 hours to automate it
setInterval(refreshEvents, 24 * 60 * 60 * 1000); // Every 24 hours
