var isMobileSafari = (navigator && navigator.userAgent && navigator.userAgent.match(/AppleWebKit/) && navigator.userAgent.match(/Mobile/));

$(function()
{
	// stagger loading
	$('html').addClass('has-js');
	$('a').each(function(i, elem)
	{
		var e = $(elem);
		var b = e.parent().find('b');
		e.fadeTo(200, 1.0);
		b.fadeTo(800, 1.0);
	});

	// exit if on iPhone/iPod touch/iPad
	if (isMobileSafari) return;

	$('a').each(function()
	{
		if (this.href.match(/kickstarter/)) return;
		
		$(this).mousemove(function(e)
		{
			if (this.isAlreadyAnimating) return;

			var baseExpX = 4; 	// 2 ^ 4 == 16
			var baseExpY = 2; 	// 2 ^ 4 == 16

			// element proportions
			var w = this.offsetWidth;
			var h = this.offsetHeight;
			var hw = w/2;
			var hh = h/2;
			
			var t = $(this);
			var b = t.parent().find('b');
			var both = $.merge(t, b);

			var offsets = t.offset(); // element position relative to page
			var pos = // mouse position relative to element
			{
				x : e.pageX - offsets.left,
				y : e.pageY - offsets.top
			};

			// mouse position offset from center of element
			var cx = pos.x - hw;
			var cy = pos.y - hh;

			// percentage from center to edge
			var px = Math.abs(cx/hw);
			var py = Math.abs(cy/hh);

			// new top/left positions
			var nx = Math.round(Math.pow(2, px * baseExpX)) * (cx < 0 ? -1 : 1);
			var ny = Math.round(Math.pow(2, py * baseExpY)) * (cy < 0 ? -1 : 1);
			
			both.css(
			{
				zIndex	: 10,
				left 	: nx + 'px',
				top 	: ny + 'px'
			});
		});

		$(this).mouseout(function(e) // out
		{	
			var t = $(this);
			var b = t.parent().find('b');
			var both = $.merge(t, b);
			
			var pos = 
			{
				x: parseInt(t.css('left')),
				y: parseInt(t.css('top'))
			};
			t.css('z-index', 1);

			this.isAlreadyAnimating = true;
			both.animate
			({
				top 	: pos.y * -1,
				left 	: pos.x * -1
			}, 50, 'swing').animate
			({
				top 	: pos.y * .75,
				left 	: pos.x * .75
			}, 75, 'swing').animate
			({
				top 	: pos.y * -.5,
				left 	: pos.x * -.5
			}, 50, 'swing').animate
			({
				top 	: pos.y * .25,
				left 	: pos.x * .25
			}, 100, 'swing').animate
			({
				top 	: 0,
				left 	: 0
			}, 100, 'swing', function()
			{
				both.css({ zIndex: 0 });
				this.isAlreadyAnimating = false;
			});
		});
	});
});