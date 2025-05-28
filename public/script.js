// This script restores the original form and table logic for the homepage

document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    loadScores();

    document.getElementById('courseSelect').addEventListener('change', renderHoleInputs);

    document.getElementById('scoreForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const playerName = document.getElementById('playerName').value.trim();
        const courseId = document.getElementById('courseSelect').value;
        const holeInputs = document.querySelectorAll('.hole-input');
        const strokes = Array.from(holeInputs).map(inp => parseInt(inp.value, 10));
        if (!playerName || !courseId || strokes.some(isNaN)) {
            alert('Please fill out all fields with valid values.');
            return;
        }
        try {
            const res = await fetch('/api/scores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ player: playerName, courseId, strokes })
            });
            if (!res.ok) throw new Error('Failed to submit score');
            document.getElementById('scoreForm').reset();
            document.getElementById('holesContainer').innerHTML = '';
            loadScores();
        } catch (err) {
            alert(err.message);
        }
    });
});

let courseMap = {}; // id -> course object

async function loadCourses() {
    try {
        const res = await fetch('/api/courses');
        if (!res.ok) throw new Error('Failed to load courses');
        const data = await res.json();
        const courses = Array.isArray(data.courses) ? data.courses : data;
        courseMap = {};
        const select = document.getElementById('courseSelect');
        select.innerHTML = '<option value="">Select a course</option>';
        courses.forEach(course => {
            courseMap[course.id] = course;
            const option = document.createElement('option');
            option.value = course.id;
            option.textContent = course.name;
            select.appendChild(option);
        });
    } catch (err) {
        alert(err.message);
    }
}

function renderHoleInputs() {
    const courseId = document.getElementById('courseSelect').value;
    const container = document.getElementById('holesContainer');
    container.innerHTML = '';
    if (!courseId || !courseMap[courseId]) return;
    const pars = courseMap[courseId].pars || [];
    for (let i = 0; i < pars.length; ++i) {
        const group = document.createElement('div');
        group.className = "mb-2";
        group.innerHTML = `
            <label class="form-label">Hole ${i+1} (Par ${pars[i]})</label>
            <input type="number" class="form-control hole-input" min="1" required>
        `;
        container.appendChild(group);
    }
}

async function loadScores() {
    try {
        const res = await fetch('/api/scores');
        if (!res.ok) throw new Error('Failed to fetch scores');
        const data = await res.json();
        const scores = Array.isArray(data.scores) ? data.scores : data;
        const table = document.getElementById('scoresTable');
        table.innerHTML = '';
        scores.forEach(score => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${score.player}</td>
                <td>${score.date ? new Date(score.date).toLocaleDateString() : ''}</td>
                <td>${score.courseName || score.course || ''}</td>
                <td>${Array.isArray(score.strokes) ? score.strokes.reduce((a,b) => a+b, 0) : ''}</td>
            `;
            table.appendChild(tr);
        });
    } catch (err) {
        document.getElementById('scoresTable').innerHTML = `<tr><td colspan="4" class="text-danger">${err.message}</td></tr>`;
    }
}