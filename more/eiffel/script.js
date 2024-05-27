function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function updateDistanceAndCompass(position) {
    const eiffelTowerLat = 48.8584;
    const eiffelTowerLon = 2.2945;
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    const distance = getDistance(userLat, userLon, eiffelTowerLat, eiffelTowerLon);
    document.getElementById('distance').innerText = `Distance to Eiffel Tower: ${distance.toFixed(2)} meters`;

    const angle = Math.atan2(eiffelTowerLon - userLon, eiffelTowerLat - userLat) * (180 / Math.PI);
    document.getElementById('compass').style.transform = `rotate(${angle}deg)`;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateDistanceAndCompass, showError);
} else {
    alert("Geolocation is not supported by this browser.");
}
