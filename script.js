const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://bp-golf-app-backend.vercel.app';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`${API_URL}/api/courses`);
        if (!response.ok) {
            throw new Error(`Failed to fetch courses: ${response.status} ${response.statusText}`);
        }
        const courses = await response.json();
        const courseSelect = document.getElementById('courseSelect');
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course._id;
            option.textContent = course.name;
            courseSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        alert('Unable to load courses. Please try again later.');
    }

    try {
        const response = await fetch(`${API_URL}/api/scores`);
        if (!response.ok) {
            throw new Error(`Failed to fetch scores: ${response.status} ${response.statusText}`);
        }
        const scores = await response.json();
        const scoresTable = document.getElementById('scoresTable');
        scores.forEach(score => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${score.playerName}</td>
                <td>${new Date(score.date).toLocaleDateString()}</td>
                <td>${score.courseName}</td>
                <td>${score.total}</td>
            `;
            scoresTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching scores:', error);
        alert('Unable to load scores. Please try again later.');
    }

    const scoreForm = document.getElementById('scoreForm');
    scoreForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const playerName = document.getElementById('playerName').value;
        const courseId = document.getElementById('courseSelect').value;
        const holeScores = Array.from(document.querySelectorAll('#holesContainer input')).map(input => parseInt(input.value) || 0);
        const total = holeScores.reduce((sum, score) => sum + score, 0);

        try {
            const response = await fetch(`${API_URL}/api/scores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playerName,
                    courseId,
                    holeScores,
                    total,
                    date: new Date().toISOString(),
                }),
            });
            if (!response.ok) {
                throw new Error(`Failed to submit score: ${response.status} ${response.statusText}`);
            }
            alert('Score submitted successfully!');
            scoreForm.reset();
            location.reload();
        } catch (error) {
            console.error('Error submitting score:', error);
            alert('Failed to submit score. Please try again.');
        }
    });

    const courseSelect = document.getElementById('courseSelect');
    courseSelect.addEventListener('change', async () => {
        const courseId = courseSelect.value;
        if (courseId) {
            try {
                const response = await fetch(`${API_URL}/api/courses/${courseId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch course details: ${response.status} ${response.statusText}`);
                }
                const course = await response.json();
                const holesContainer = document.getElementById('holesContainer');
                holesContainer.innerHTML = '';
                for (let i = 1; i <= course.holes; i++) {
                    const div = document.createElement('div');
                    div.className = 'mb-3';
                    div.innerHTML = `
                        <label for="hole${i}" class="form-label">Hole ${i}</label>
                        <input type="number" class="form-control" id="hole${i}" min="1" required>
                    `;
                    holesContainer.appendChild(div);
                }
            } catch (error) {
                console.error('Error fetching course holes:', error);
                alert('Unable to load course details. Please try again.');
            }
        }
    });
});