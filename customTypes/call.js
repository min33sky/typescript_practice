"use strict";
var result = Array.prototype.map.call([1, 2, 3], function (item) { return item.toFixed(1); });
// [1, 2, 3].map(item => item.toFixed(1));
