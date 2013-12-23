window.onload = function() {
    var menuToggle = document.getElementById("open-menu");
    var navDrawer = document.getElementById("nav-drawer");
    
    var isOpen = false;    
    
    menuToggle.onclick = function() {
        if (!isOpen) {
            navDrawer.className = "open";
        } else {
            navDrawer.className = "";
        }
        isOpen = !isOpen;
    };
};