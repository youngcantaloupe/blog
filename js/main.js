function toggleClass(id, displayType= "block") {
    const element = document.getElementById(id);
    const currentDisplay = window.getComputedStyle(element).display;

    element.style.display = (currentDisplay === "none") ? displayType : "none";
}

function toggleWorld(worldId) {
    const panels = document.querySelectorAll('.world-panel');
    panels.forEach (panel => {
        panel.style.display = (panel.id === worldId) ? "block" : "none";
    });
}