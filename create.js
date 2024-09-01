// create.js

document.getElementById('entry-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const dateInput = document.getElementById('date').value;
    const note = document.getElementById('note').value;
    const imageInput = document.getElementById('image').files[0];

    if (!dateInput || !note) {
        alert('Please fill in all required fields.');
        return;
    }

    // Format the date
    const dateObj = new Date(dateInput);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const reader = new FileReader();
    reader.onload = function() {
        const entries = JSON.parse(localStorage.getItem('entries')) || {};
        entries[formattedDate] = {
            note: note,
            image: reader.result
        };
        localStorage.setItem('entries', JSON.stringify(entries));
        alert('Entry added successfully!');
        window.location.href = "index.html";
    };

    if (imageInput) {
        reader.readAsDataURL(imageInput);
    } else {
        const entries = JSON.parse(localStorage.getItem('entries')) || {};
        entries[formattedDate] = {
            note: note,
            image: ''
        };
        localStorage.setItem('entries', JSON.stringify(entries));
        alert('Entry added successfully!');
        window.location.href = "index.html";
    }
});
