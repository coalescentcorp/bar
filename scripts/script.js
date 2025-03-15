function repeatEvents() {
    const today = new Date();
    const dayOfWeek = today.getDay();

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
    const nextDate = new Date();

    nextDate.setDate(today.getDate() + ((dayOfWeek + 7 - today.getDay()) % 7));
    nextDate.setHours(0, 0, 0, 0);

    return nextDate.toDateString();
}

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

document.addEventListener('DOMContentLoaded', repeatEvents);
