// lockHeader allows you to trigger classes when certain
// elements are within the viewport.


(function (root, plugin) {
// ================= Plugin Name ================= //
//                                                 //
	var name = 'lockHeader';
//                                                 //
// =============================================== //
	root.ambient.prop[name] = plugin;
})(this,
// ================= Plugin Code ================= //
//                                                 //
{
	getCurrentValue: function () {
		var w = window,
			d = document,
			b = d.body,
			e = d.documentElement,

			top = (w.pageYOffset != null) ? w.pageYOffset : (e.clientHeight && e || b).scrollTop,
			width = w.innerWidth || b.clientWidth;

		// the location of the element could change if the
		// page width changes, so watch that too and include
		// it in the current value so it can be checked
		// for changes
		return top + '_' + width;
	},

	getActiveClasses: function (topWidth, className, cfg) {
		var d = document,
			vals = topWidth.split('_').map(function (v) {return parseInt(v, 10);}),
			top = vals[0],
			obj = d.getElementById(cfg.elId),
			elTop = 0,
			elOffset = cfg.offset || 0;

		if (obj == null){
			return [];
		}

		if (obj.offsetParent) {
			do {
				elTop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		if (elTop + elOffset < top) { return [className]; }

		return [];
	},
	watchEvent: 'scroll resize'
}
//                                                 //
// =============================================== //
);