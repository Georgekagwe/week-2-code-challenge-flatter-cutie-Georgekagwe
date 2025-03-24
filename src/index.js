document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");

    fetch("https://flater-cutie-backend-repo.vercel.app/characters")
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.style.marginRight = "18px";
                span.style.cursor = "pointer";
                
                span.addEventListener("click", () => displayCharacterDetails(character));
                characterBar.appendChild(span);
            });
        })
        .catch(error => console.error("Error fetching characters:", error));

    function displayCharacterDetails(character) {
        detailedInfo.innerHTML = `
            <h2>${character.name}</h2>
            <img id="character-image" src="${character.image}" alt="${character.name}" style="width:200px; height:auto; border-radius:10px; cursor:pointer;">
            <p>Votes: <span id="vote-count">${character.votes}</span></p>

            <form id="votes-form">
                <input type="number" id="vote-input" placeholder="Enter votes" required>
                <button type="submit">Submit Votes</button>
            </form>
            <button id="reset-btn">Reset Votes</button>
        `;

        // Handle form submission
        document.getElementById("votes-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const voteInput = document.getElementById("vote-input");
            const voteCount = document.getElementById("vote-count");

            const newVotes = parseInt(voteInput.value);
            if (!isNaN(newVotes)) {
                voteCount.textContent = parseInt(voteCount.textContent) + newVotes;
            }
            voteInput.value = "";
        });

        // Handle reset button
        document.getElementById("reset-btn").addEventListener("click", () => {
            document.getElementById("vote-count").textContent = "0";
        });
    }
});







