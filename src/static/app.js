document.addEventListener('DOMContentLoaded', function() {
    fetchActivities();
});

function fetchActivities() {
    fetch('/activities')
        .then(response => response.json())
        .then(data => {
            const activitiesList = document.getElementById('activities-list');
            activitiesList.innerHTML = '';
            for (const [name, details] of Object.entries(data)) {
                const activityDiv = document.createElement('div');
                activityDiv.className = 'activity-card';

                // Participants section with delete icon
                let participantsHTML = '';
                if (details.participants.length > 0) {
                    participantsHTML = `
                        <ul class="participants-list">
                            ${details.participants.map(email => `
                                <li style="display: flex; align-items: center;">
                                    <span class="participant-email">${email}</span>
                                    <span class="delete-participant" title="Remove" onclick="unregisterParticipant('${name.replace(/'/g, "\\'")}', '${email.replace(/'/g, "\\'")}')">&times;</span>
                                </li>
                            `).join('')}
                        </ul>
                    `;
                } else {
                    participantsHTML = `<div class="no-participants">No participants yet.</div>`;
                }

                activityDiv.innerHTML = `
                    <h4>${name}</h4>
                    <p>${details.description}</p>
                    <p><strong>Schedule:</strong> ${details.schedule}</p>
                    <p><strong>Max Participants:</strong> ${details.max_participants}</p>
                    <p><strong>Current Participants:</strong> ${details.participants.length}</p>
                    <div class="participants-section">
                        <strong>Participants:</strong>
                        ${participantsHTML}
                    </div>
                    <form onsubmit="signup(event, '${name}')">
                        <div class="form-group">
                            <input type="email" id="email-${name}" placeholder="Your email" required>
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                `;
                activitiesList.appendChild(activityDiv);
            }
        })
        .catch(error => console.error('Error fetching activities:', error));
}

// Add this function to handle unregistering
function unregisterParticipant(activityName, email) {
    fetch(`/activities/${encodeURIComponent(activityName)}/signup`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email: email })
    })
    .then(response => {
        if (response.ok) {
            fetchActivities();
        } else {
            return response.json().then(data => {
                alert(data.detail);
            });
        }
    })
    .catch(error => console.error('Error removing participant:', error));
}

function signup(event, activityName) {
    event.preventDefault();
    const email = document.getElementById(`email-${activityName}`).value;
    fetch(`/activities/${encodeURIComponent(activityName)}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email: email })
    })
    .then(response => {
        if (response.ok) {
            fetchActivities(); // Refresh the list
            // Clear the input field for this activity
            document.getElementById(`email-${activityName}`).value = '';
        } else {
            return response.json().then(data => {
                alert(data.detail);
            });
        }
    })
    .catch(error => console.error('Error signing up:', error));
}
