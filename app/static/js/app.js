document.getElementById("promptForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const prompt = document.getElementById("promptInput").value.trim();
    const model = document.getElementById("modelSelector").value;

    if (!prompt) {
        alert("Prompt cannot be empty!");
        return;
    }

    document.getElementById("spinner").style.display = "block"; // Show spinner
    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt, model }),
        });
        const data = await response.json();
        document.getElementById("spinner").style.display = "none"; // Hide spinner

        if (data.error) {
            document.getElementById("resultText").textContent = `Error: ${data.error}`;
        } else {
            document.getElementById("resultText").textContent = data.result;
        }
    } catch (err) {
        console.error("Error:", err);
        document.getElementById("spinner").style.display = "none";
        document.getElementById("resultText").textContent = "An error occurred!";
    }
});

function updateCharCount() {
    const maxLength = 200;
    const currentLength = document.getElementById("promptInput").value.length;
    document.getElementById("charCount").textContent = `Characters left: ${maxLength - currentLength}`;
}

function exportText() {
    const text = document.getElementById("resultText").innerText;
    if (!text) {
        alert("No text to export!");
        return;
    }
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "generated_text.txt";
    link.click();
}
