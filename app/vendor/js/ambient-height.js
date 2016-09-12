(function (root, plugin) {
// ================= Plugin Name ================= //
//                                                 //
    var name = 'height';
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
            b = d.body;

        return w.innerHeight || b.clientHeight;
    },
    getActiveClasses: function (winHeight, className, props) {
        var aboveMin, belowMax,
            min = props.min || 0,
            max = props.max || Infinity;

        aboveMin = winHeight >= min;
        belowMax = winHeight < max;

        if (aboveMin && belowMax) {
            return [className];
        } else {
            return [];
        }
    },
    watchEvent: 'resize'
}
//                                                 //
// =============================================== //
);