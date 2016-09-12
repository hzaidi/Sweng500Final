(function() {'use strict';var app = angular.module('piStatus');

	// #-------------------------------# //
	// #----- Helper (scrollHelp) -----# //
	app.factory('scrollHelp', function ($document) {

		function scrollTo (eID) {
			doScroll(elmYPosition(eID));
		}

		function scrollToTop() {
			doScroll(0);
		}

		function doScroll(endYPosition) {
			var startY = window.pageYOffset || 0,
				stopY = endYPosition,
				distance = stopY > startY ? stopY - startY : startY - stopY,
				speed = 20,
				step = Math.round(distance / 25),
				leapY = stopY > startY ? startY + step : startY - step,
				timer = 0, i, top;

			if (distance < 100) {
				window.scrollTo(0, stopY); return;
			}

			if (stopY > startY) {
				for ( i=startY; i<stopY; i+=step ) {
					top = leapY - 60;
					setTimeout('window.scrollTo(0, '+top+')', timer * speed);
					leapY += step;
					if (leapY > stopY) { leapY = stopY; }
					timer++;
				}
			} else {
				for ( i=startY; i>stopY; i-=step ) {
					top = leapY - 60;
					setTimeout('window.scrollTo(0, '+top+')', timer * speed);
					leapY -= step;
					if (leapY < stopY) { leapY = stopY; }
					timer++;
				}
			}
		}


		function elmYPosition(eId) {
			var elm = document.getElementById(eId),
				y, node;

			if (elm == null) { return 0; }

			y = elm.offsetTop;
			node = elm;
			while (node.offsetParent && node.offsetParent !== document.body) {
				node = node.offsetParent;
				y += node.offsetTop;
			} return y;
		}


		function hasScroll(eClass) {
			var ele = document.getElementsByClassName(eClass)[0];
			return ele.scrollHeight > ele.clientHeight
		}



		return {
			scrollTo: scrollTo,
			scrollToTop: scrollToTop,
			hasScroll
		};

	});
	// #--- END Helper (scrollHelp) ---# //
	// #-------------------------------# //

}());
