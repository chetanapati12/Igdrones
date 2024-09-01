// index.js

document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('timeline-container');
    const timeline = document.getElementById('timeline');
    const contentDisplay = document.getElementById('content-display');
    const contentTitle = document.getElementById('content-title');
    const contentNote = document.getElementById('content-note');
    const contentImage = document.getElementById('content-image');
    const deleteEntryBtn = document.getElementById('delete-entry-btn');

    let entries = JSON.parse(localStorage.getItem('entries')) || {};
    let selectedDate = null;

    // Function to render the timeline
    function renderTimeline() {
        timeline.innerHTML = '<div class="timeline-line"></div>';
        if (Object.keys(entries).length === 0) {
            contentDisplay.classList.remove('visible');
            return;
        }

        for (const date in entries) {
            const dateItem = document.createElement('div');
            dateItem.classList.add('date-item');
            dateItem.textContent = date;
            dateItem.addEventListener('click', () => displayEntry(date, dateItem));
            timeline.appendChild(dateItem);
        }
    }

    // Function to display entry details
    function displayEntry(date, dateElement) {
        selectedDate = date;
        const entry = entries[date];

        // Update content
        contentTitle.textContent = date;
        contentNote.textContent = entry.note;

        if (entry.image) {
            contentImage.src = entry.image;
            contentImage.style.display = 'block';
        } else {
            contentImage.style.display = 'none';
        }

        // Highlight selected date
        document.querySelectorAll('.date-item').forEach(item => item.classList.remove('selected'));
        dateElement.classList.add('selected');

        // Show content display
        contentDisplay.classList.add('visible');

        // Scroll to selected date if overflowed
        const dateElementOffset = dateElement.offsetLeft;
        const dateElementWidth = dateElement.offsetWidth;
        const containerWidth = timelineContainer.offsetWidth;
        timelineContainer.scrollLeft = dateElementOffset - containerWidth / 2 + dateElementWidth / 2;
    }

    // Function to delete selected entry
    function deleteEntry() {
        if (selectedDate && confirm(`Are you sure you want to delete the entry for ${selectedDate}?`)) {
            delete entries[selectedDate];
            localStorage.setItem('entries', JSON.stringify(entries));
            renderTimeline();
            contentDisplay.classList.remove('visible');
            selectedDate = null;
            alert('Entry deleted successfully.');
        }
    }

    // Event listener for delete button
    deleteEntryBtn.addEventListener('click', deleteEntry);

    // Initial render
    renderTimeline();
});
