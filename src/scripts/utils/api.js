// Helper function for API URL building
export function buildURL(city) {
    const switchBtn = document.getElementById('switch');

    let url;

    if (switchBtn.checked) {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=us&include=days&key=K3QZSEQW7CN383R6MVUSAPLE2&contentType=json`;
    } else {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=metric&include=days&key=K3QZSEQW7CN383R6MVUSAPLE2&contentType=json`;
    }

    return url;
}
