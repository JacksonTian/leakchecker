var checker = require('./master.js');
var TestCase = checker.TestCase;

var cases = [];
cases.push(new TestCase("leak", "./testcase.js", "leak"));
cases.push(new TestCase("noleak", "./testcase.js", "noleak"));

checker.start(cases);

