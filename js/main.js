window.onload = function() {
    var menuToggle = document.getElementById("open-menu");
    var mainContainer = document.getElementById("st-container");
    
    var isOpen = false;    
    
    menuToggle.onclick = function() {
        mainContainer.className = "st-container st-effect" + (isOpen ? "" : " st-menu-open");
        isOpen = !isOpen;
    };
};