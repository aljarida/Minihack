document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("soupKitchensContainer");

    container.addEventListener("click", function (event) {
        const target = event.target.closest(".soup-kitchen");

        if (target) {
            // Toggle the expanded class
            target.classList.toggle("expanded");

            // Toggle the display of expanded content
            const expandedContent = target.querySelector(".expanded-content");
            if (expandedContent) {
                expandedContent.style.display = expandedContent.style.display === "none" ? "block" : "none";
            }
        }
    });
});

function calculateDistanceToCurrentLocation(location, callback) {
    const apiKey = 'fb6d7ba712de4feba9f178f58a60f0cf';

    // Function to convert an address to latitude and longitude using the OpenCage Geocoding API
    async function geocodeAddress(address) {
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const result = data.results[0];
                const lat = result.geometry.lat;
                const lng = result.geometry.lng;
                return { lat, lng };
            } else {
                throw new Error("Address not found or an error occurred.");
            }
        } catch (error) {
            throw new Error(`Error geocoding address: ${error.message}`);
        }
    }

    // Function to calculate the Haversine distance between two sets of coordinates
    function calculateHaversineDistance(coord1, coord2) {
        const earthRadius = 6371; // Radius of the Earth in kilometers

        // Convert latitude and longitude from degrees to radians
        const lat1 = (Math.PI / 180) * coord1.lat;
        const lon1 = (Math.PI / 180) * coord1.lng;
        const lat2 = (Math.PI / 180) * coord2.lat;
        const lon2 = (Math.PI / 180) * coord2.lng;

        // Haversine formula
        const dlat = lat2 - lat1;
        const dlon = lon2 - lon1;
        const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Calculate the distance
        const distance = earthRadius * c;
        return distance;
    }

    // Function to get the user's current location
    async function getUserLocation() {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    },
                    (error) => {
                        reject(new Error(`Error getting user location: ${error.message}`));
                    }
                );
            } else {
                reject(new Error("Geolocation is not supported in your browser."));
            }
        });
    }

    (async () => {
        try {
            const [locationCoords, userLocation] = await Promise.all([
                geocodeAddress(location),
                getUserLocation()
            ]);

            // Calculate the distance between the given location and the user's location
            const distance = calculateHaversineDistance(locationCoords, userLocation);

            callback(null, distance);
        } catch (error) {
            callback(error);
        }
    })();
}
