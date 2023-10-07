document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form input values
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const kitchenName = document.getElementById("kitchen-name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const daysOpen = document.getElementById("days-open").value;
        const hours = document.getElementById("hours").value;
        const address = document.getElementById("address").value;
        const comment = document.getElementById("comment").value;

        // Create a new kitchen object
        const newKitchen = {
            name: kitchenName,
            location: address,
            weekdayHours: hours,
            currentStatus: true, // You can set the default value as needed
            glutenFree: false, // Set default values for other properties
            kosher: false,
            halal: false,
            vegan: false,
            lactoseIntolerant: false,
            headCount: 0,
            totalCapacity: 100, // Set an initial value for capacity
            waitTime: "0 minutes", // Set an initial wait time
            staffAvailability: 0, // Set initial staff availability
            volunteerOpenings: 0, // Set initial volunteer openings
            skillsNeeded: "", // Set initial skills needed
        };

        // Add the new kitchen to the SOUPKITCHENS array
        SOUPKITCHENS.push(newKitchen);

        window.location.href = "#";

        // You can optionally update the form or show a success message
        form.reset();
        alert("Kitchen registration successful!");

        // You may want to save the updated array back to your soupkitchens.js file here
        // This depends on your server setup and how you're managing data persistence

        // For example, you can update the soupkitchens.js file as follows:
        const updatedData = `const SOUPKITCHENS = ${JSON.stringify(SOUPKITCHENS, null, 2)};`;
        // // Send updatedData to the server to save it

    });
});
