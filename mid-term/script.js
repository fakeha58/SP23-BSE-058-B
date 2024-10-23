function loadDescription(filePath, elementId) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }
            return response.text();
        })
        .then(data => {
            const descriptionElement = document.getElementById(elementId);
            descriptionElement.textContent = data;
            descriptionElement.style.display = 'block'; // Make description visible
        })
        .catch(error => {
            console.error('Error:', error);
            const descriptionElement = document.getElementById(elementId);
            descriptionElement.textContent = 'Failed to load description.';
            descriptionElement.style.display = 'block'; // Show error
        });
}
