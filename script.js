document.addEventListener("DOMContentLoaded", function () {
    const moodButtons = document.querySelectorAll(".mood-btn");
    const timeline = document.getElementById("timeline");

    // Load past moods from localStorage
    function loadMoods() {
        timeline.innerHTML = "";
        const moods = JSON.parse(localStorage.getItem("moodLog")) || [];

        moods.reverse().forEach(entry => {
            const moodDiv = document.createElement("div");
            moodDiv.classList.add("mood-entry");

            // Display mood with date & time
            moodDiv.innerHTML = `<strong>${entry.mood}</strong><br><small>${entry.date} - ${entry.time}</small>`;

            timeline.appendChild(moodDiv);
        });
    }

    // Save selected mood
    moodButtons.forEach(button => {
        button.addEventListener("click", function () {
            const mood = this.dataset.mood;
            const moods = JSON.parse(localStorage.getItem("moodLog")) || [];
            const now = new Date();

            // Format date and time
            const date = now.toISOString().split('T')[0]; // YYYY-MM-DD format
            const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:MM format

            moods.push({ date, time, mood });
            localStorage.setItem("moodLog", JSON.stringify(moods));
            loadMoods();
        });
    });

    loadMoods();
});
