const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://bp-golf-app-backend.vercel.app';

function showLoginForm() {
    document.body.innerHTML = `
        <h2>Admin Login</h2>
        <form id="loginForm">
            <label for="username">Username:</label>
            <input type="text" id="username" required><br>
            <label for="password">Password:</label>
            <input type="password" id="password" required><br>
            <button type="submit">Login</button>
        </form>
        <div id="loginError" style="color:red; margin-top:1em;"></div>
    `;
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) throw new Error('Invalid username or password');
            const data = await response.json();
            localStorage.setItem('admin_jwt', data.token);
            location.reload();
        } catch (err) {
            document.getElementById('loginError').innerText = 'Login failed: ' + err.message;
        }
    });
}

function logout() {
    localStorage.removeItem('admin_jwt');
    location.reload();
}

function showAdminUI(players) {
    document.body.innerHTML = `
        <button id="logoutBtn" style="float:right;">Logout</button>
        <h2>Players</h2>
        <table>
            <thead>
                <tr><th>Name</th></tr>
            </thead>
            <tbody id="playersTable"></tbody>
        </table>
        <h3>Add Player</h3>
        <form id="playerForm">
            <input type="text" id="playerName" placeholder="Player Name" required>
            <button type="submit">Add Player</button>
        </form>
        <div id="playerError" style="color:red; margin-top:1em;"></div>
    `;
    document.getElementById('logoutBtn').addEventListener('click', logout);

    const playersTable = document.getElementById('playersTable');
    playersTable.innerHTML = '';
    players.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${player.name}</td>`;
        playersTable.appendChild(row);
    });

    const playerForm = document.getElementById('playerForm');
    playerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const playerName = document.getElementById('playerName').value;
        const token = localStorage.getItem('admin_jwt');
        try {
            const response = await fetch(`${API_URL}/api/admin/players`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: playerName }),
            });
            if (!response.ok) {
                throw new Error(`Failed to add player: ${response.status} ${response.statusText}`);
            }
            alert('Player added successfully!');
            playerForm.reset();
            location.reload();
        } catch (error) {
            document.getElementById('playerError').innerText = 'Failed to add player. Please try again.';
        }
    });
}

async function fetchPlayersWithAuth() {
    const token = localStorage.getItem('admin_jwt');
    if (!token) return null;
    try {
        const response = await fetch(`${API_URL}/api/admin/players`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.status === 401 || response.status === 403) {
            logout();
            return null;
        }
        if (!response.ok) throw new Error('Failed to fetch players');
        return await response.json();
    } catch (error) {
        logout();
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const players = await fetchPlayersWithAuth();
    if (!players) {
        showLoginForm();
    } else {
        showAdminUI(players);
    }
});