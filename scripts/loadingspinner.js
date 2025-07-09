
// Show loading spinner when fetching data
function showLoadingSpinner() {
    let spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.style.display = 'block';
}

function hideLoadingSpinner() {
    let spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.style.display = 'none';
}

