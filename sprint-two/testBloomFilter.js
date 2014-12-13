/*global BloomFilter */
// Run 10,000 trials of trying to retrieve a mix of items that are in the filter and not in the filter.
var e = Math.exp(1);
var configs = {};
configs.refresh = function () {
  this.n = +$('.nValue').val();
  this.m = +$('.mValue').val();
  this.k = +$('.kValue').val();
  this.theoretical = Math.pow(1 - Math.pow(e, (-this.k * this.n / this.m)), this.k);
  this.wordSize = 6;
  this.numTests = 10000;
};
configs.refresh();

var generateRandomString = function (size) {
  var string = "";
  var i;
  var rand;
  for (i = 0; i < size; i++) {
    rand = Math.floor(Math.random() * 93) + 33;
    string += String.fromCharCode(rand);
  }
  return string;
};

var runTest = function () {
  var bloomFilter = new BloomFilter(configs.m, configs.k);
  var results = {'falsePositives': 0};
  var words = [];
  var i;
  var word;
  for (i = 0; i < configs.n; i++) {
    word = generateRandomString(configs.wordSize);
    bloomFilter.insert(word);
    words.push(word);
  }
  for (i = 0; i < configs.numTests; i++) {
    word = generateRandomString(configs.wordSize);
    if (bloomFilter.predict(word) && !_(words).contains(word)) {
      results.falsePositives++;
    }
  }
  $('.testResults').html(results.falsePositives / configs.numTests * 100 + "%");
  $('.theoreticalResults').html(configs.theoretical * 100 + "%");
};

// Record the empirical rate of false-positives by comparing your result with what you know to be true from inputs.
// Compare that rate with the approximation given for Bloom filters.
$('button').click(function () {
  configs.refresh();
  runTest();
});
