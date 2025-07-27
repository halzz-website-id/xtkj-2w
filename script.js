document.addEventListener('DOMContentLoaded', function() {
	const hamburger = document.querySelector('.hamburger');
	const navLinks = document.querySelector('.nav-links');
	const body = document.querySelector('body');

	function toggleMenu() {
		hamburger.classList.toggle('active');
		navLinks.classList.toggle('active');
		body.classList.toggle('noscroll');
	}

	if (hamburger) {
	
		hamburger.addEventListener('click', function(e) {
			e.stopPropagation();
			toggleMenu();
		});
	}

	const allNavLinks = document.querySelectorAll('.nav-links li a');
	allNavLinks.forEach(link => {
		link.addEventListener('click', () => {
			if (navLinks.classList.contains('active')) {
				toggleMenu();
			}
		});
	});
	const currentLocation = window.location.pathname.split("/").pop();
	const navItems = document.querySelectorAll('.nav-links a');

	if (currentLocation === '' || currentLocation === 'index.html') {
		const homeLink = document.querySelector('.nav-links a[href="index.html"]');
		if (homeLink) homeLink.classList.add('active');
	} else {
		navItems.forEach(item => {
			item.classList.remove('active');
			if (item.getAttribute('href').endsWith(currentLocation)) {
				item.classList.add('active');
			}
		});
	}

    // Dark Mode Toggle Logic
    const themeToggle = document.getElementById('theme-toggle-checkbox');

    // Function to apply the stored theme on page load
    const applyStoredTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if(themeToggle) themeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
             if(themeToggle) themeToggle.checked = false;
        }
    };

    if(themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Apply the theme when the DOM is loaded
    applyStoredTheme();
});

// Immediately-invoked function to apply theme before DOM is fully loaded to prevent flashing
(function() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode'); // Use on html element for faster application
        document.body.classList.add('dark-mode');
    }
})();