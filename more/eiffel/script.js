const eiffelTowerCoords = { lat: 48.8584, lng: 2.2945 };

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function calculateBearing(lat1, lon1, lat2, lon2) {
    const dLon = toRadians(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(toRadians(lat2));
    const x = Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
              Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);
    const brng = toDegrees(Math.atan2(y, x));
    return (brng + 360) % 360; // Normalize to 0-360
}

function updateInfo(position) {
    const userCoords = { lat: position.coords.latitude, lng: position.coords.longitude };
    const distance = calculateDistance(userCoords.lat, userCoords.lng, eiffelTowerCoords.lat, eiffelTowerCoords.lng);
    const bearing = calculateBearing(userCoords.lat, userCoords.lng, eiffelTowerCoords.lat, eiffelTowerCoords.lng);

    document.getElementById('distance').textContent = `Distance: ${distance.toFixed(2)} km`;
    document.getElementById('direction').textContent = `Direction: ${bearing.toFixed(2)}°`;
}

function handleError(error) {
    console.error('Geolocation error:', error);
    document.getElementById('distance').textContent = 'Unable to determine location';
    document.getElementById('direction').textContent = 'Unable to determine direction';
}

function updateCompassHeading(heading) {
    const compassImage = document.getElementById('compassImage');
    compassImage.style.transform = `rotate(${360 - heading}deg)`; // Invert rotation for correct orientation
}

if ('DeviceOrientationEvent' in window) {
    window.addEventListener('deviceorientation', function(event) {
        const heading = event.alpha || 0; // Get compass heading
        updateCompassHeading(heading);
    });
} else {
    console.error('Device orientation not supported');
}

if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(updateInfo, handleError, {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000
    });
} else {
    handleError({ message: 'Geolocation not supported' });
}