var str = "";
exports.sayHello = function (name) {
  str += "append, ";
};

var leakArray = [];
exports.leak = function () {
  leakArray.push("leak" + Math.random());
};

exports.noleak = function () {
  var noleak = "leak" + Math.random();
};