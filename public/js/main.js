(function ($) {

	var $window = $(window),
		$banner = $('#banner'),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		default: ['1681px', null],
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Menu.
	$('#menu')
		.append('<a href="#menu" class="close"></a>')
		.appendTo($body)
		.panel({
			target: $body,
			visibleClass: 'is-menu-visible',
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right'
		});

	// Form
	$('form').on('submit', (e) => {
		e.preventDefault();
		const name = $('#name_input').val().trim();
		const email = $('#email_input').val().trim();
		const text = $('#message_input').val().trim();
		const subject = "Contacto"

		const data = {
			name,
			email,
			subject,
			text
		};

		$.post('/email', data, () => {
			$('form').trigger("reset");

			$('#result').show().html("Thanks for contacting us!");

			setTimeout(() => {
				$('#result').fadeOut();
			}, 2000);
		})
	})

	// Add data-toggle to hide menu when clicking (mobile)
	if ($window.width() <= 974) {
		$(".nav-item").attr("data-toggle", "collapse")
			.attr("data-target", "#navbarSupportedContent");
		$(".logo").attr("data-toggle", "collapse")
			.attr("data-target", "#navbarSupportedContent");
	}

	// Team
	$('.slide-control').on('click', (e) => {
		let slide = parseInt(e.target.id.split('-')[1])
		$('#team-imgs').carousel(slide);
	});

})(jQuery);