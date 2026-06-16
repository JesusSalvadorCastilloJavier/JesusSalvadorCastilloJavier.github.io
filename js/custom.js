/* Portafolio — interacciones y animaciones */
document.addEventListener('DOMContentLoaded', function () {
	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* Año en el footer */
	var yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	/* Nav: estado al hacer scroll */
	var nav = document.getElementById('siteNav');
	function onScroll() {
		if (window.scrollY > 40) nav.classList.add('scrolled');
		else nav.classList.remove('scrolled');
	}
	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });

	/* Nav: menú móvil */
	var navToggle = document.getElementById('navToggle');
	var navLinks = document.getElementById('navLinks');
	navToggle.addEventListener('click', function () {
		var open = navLinks.classList.toggle('open');
		navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
	});
	navLinks.querySelectorAll('a').forEach(function (link) {
		link.addEventListener('click', function () {
			navLinks.classList.remove('open');
			navToggle.setAttribute('aria-expanded', 'false');
		});
	});

	/* Hero: roles que cambian */
	var roles = ['Ingeniero en Sistemas', 'Docente universitario', 'Desarrollador Web & Móvil', 'Diseñador de software'];
	var roleEl = document.getElementById('roleText');
	if (roleEl) {
		if (reduceMotion) {
			roleEl.textContent = roles[0];
		} else {
			var ri = 0, ci = 0, deleting = false;
			(function typeLoop() {
				var word = roles[ri];
				ci += deleting ? -1 : 1;
				roleEl.textContent = word.slice(0, ci);
				var delay = deleting ? 35 : 70;
				if (!deleting && ci === word.length) { delay = 1600; deleting = true; }
				else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 300; }
				setTimeout(typeLoop, delay);
			})();
		}
	}

	/* Revelado al hacer scroll */
	var revealEls = document.querySelectorAll('.reveal, .timeline-item');
	if ('IntersectionObserver' in window) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('in-view');
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15 });
		revealEls.forEach(function (el) { io.observe(el); });
	} else {
		revealEls.forEach(function (el) { el.classList.add('in-view'); });
	}

	/* Línea de tiempo: progreso al hacer scroll */
	var timeline = document.querySelector('.timeline');
	var progress = document.getElementById('timelineProgress');
	function updateProgress() {
		if (!timeline || !progress) return;
		var rect = timeline.getBoundingClientRect();
		var vh = window.innerHeight;
		var total = rect.height;
		var visible = vh * 0.6 - rect.top;
		var pct = Math.max(0, Math.min(1, visible / total));
		progress.style.height = (pct * 100) + '%';
	}
	updateProgress();
	window.addEventListener('scroll', updateProgress, { passive: true });
	window.addEventListener('resize', updateProgress);
});
