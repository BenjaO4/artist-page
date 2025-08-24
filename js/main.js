document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn"); // <--- lägg till
    const closeBtn = modal.querySelector(".close");

    // Öppna modal när man klickar på login-knappen
    loginBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Flik-knappar
    const tablinks = modal.querySelectorAll(".tablink");
    const tabcontents = modal.querySelectorAll(".tabcontent");

    tablinks.forEach(btn => {
        btn.addEventListener("click", () => {
            tablinks.forEach(b => b.classList.remove("active"));
            tabcontents.forEach(tc => tc.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(btn.dataset.tab).classList.add("active");
        });
    });

    // Stäng modal
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
    };

    // Login
    const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
        localStorage.setItem("userId", data.userId); // spara användar-ID
        alert(data.message);
        document.getElementById("loginModal").style.display = "none";
        showLoggedInState(); // uppdatera knappen
    } else {
        alert(data.message);
    }
});

    // Registrering
    const registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = registerForm.username.value;
        const password = registerForm.password.value;

        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        alert(data.message);
    });

    function showLoggedInState() {
        const userId = localStorage.getItem("userId");
        const loginBtn = document.getElementById("loginBtn");
    
        if (userId) {
            loginBtn.textContent = "Logga ut";
            loginBtn.onclick = () => {
                localStorage.removeItem("userId");
                location.reload(); // uppdaterar sidan
            }
        } else {
            loginBtn.textContent = "Logga in";
            loginBtn.onclick = () => {
                const modal = document.getElementById("loginModal");
                modal.style.display = "block";
            }
        }
    }

    localStorage.setItem("userId", data.userId);
    document.getElementById("loginModal").style.display = "none";
    showLoggedInState();

    showLoggedInState(); // <-- kallar på funktionen när sidan laddas
    
});
