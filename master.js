var cp = require('child_process');


var testcases = [];

var TestCase = function (name, module, method, args) {
  this.name = name;
  this.module = module;
  this.method = method;
  this.args = args || [];
};

TestCase.prototype.getName = function () {
  return this.name || this.module + "/" + this.method + "/" + this.args.join(",");
};

var startWorker = function (testcase) {
  var worker = cp.fork(__dirname + "/worker.js", [testcase.module, testcase.method].concat(testcase.args));
  worker.on('message', function(result) {
    console.log("Case " + testcase.name + ":");
    console.log(result);
    var init = result[0];
    var avg = result[1];
    var final = result[2];

    if (final.rss > avg.rss) {
      console.error("有内存泄漏啦");
    } else if (final.rss > init.rss + 1024 * 1024) {
      console.warn("疑似内存泄漏");
    } else {
      console.log("您滴方法是安全滴");
    }
  });
};

var cases = [];
cases.push(new TestCase("leak", "./testcase.js", "leak"));
cases.push(new TestCase("noleak", "./testcase.js", "noleak"));

cases.forEach(function (testcase, index) {
  startWorker(testcase);
});

