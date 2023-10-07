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