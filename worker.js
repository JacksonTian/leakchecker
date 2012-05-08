var argv = process.argv;

var modulePath = argv[2];
var methodName = argv[3];
var args = argv.slice(4);

var mod = require(modulePath);
var method = mod[methodName];

var usage1 = process.memoryUsage();
var usage2 = {rss: usage1.rss, heapTotal: usage1.heapTotal, heapUsed: usage1.heapUsed, count: 1};

for(var i = 0; i < 100000; i++) {
  process.nextTick(function () {
    method.apply(this, args);
  });
}

setInterval(function () {
  var usage = process.memoryUsage();
  usage2.rss += usage.rss;
  usage2.heapTotal += usage.heapTotal;
  usage2.heapUsed += usage.heapUsed;
  usage2.count++;
}, 5000);

setTimeout(function () {
  var avg = {
    rss: Math.round(usage2.rss / usage2.count),
    heapTotal: Math.round(usage2.heapTotal / usage2.count),
    heapUsed: Math.round(usage2.heapUsed / usage2.count)
  };
  process.send([usage1, avg, process.memoryUsage()]);
}, 2 * 60 * 1000);
