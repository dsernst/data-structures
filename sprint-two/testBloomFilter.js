// Run 10,000 trials of trying to retrieve a mix of items that are in the filter and not in the filter.
var generateRandomString = function (size) {
  var string = "";
  for (var i = 0; i < size; i++) {
    var rand = Math.floor(Math.random() * 93) + 33;
    string += String.fromCharCode(rand);
  }
  return string;
};

var runTest = function () {
  var bloomFilter = new BloomFilter(configs.m, configs.k);
  var results = {'falsePositives': 0};
  var words = [];
  for (var i = 0; i < configs.n; i++) {
    var word = generateRandomString(configs.wordSize);
    bloomFilter.insert(word);
    words.push(word);
  }
  for (var i = 0; i < configs.numTests; i++) {
    word = generateRandomString(configs.wordSize);
    if ( bloomFilter.predict(word) && !_(words).contains(word) ) {
      results.falsePositives++;
    }
  }
  $('.testResults').html(results.falsePositives / configs.numTests * 100 + "%");
  $('.idealResults').html(configs.ideal * 100 + "%");
};

// Record the empirical rate of false-positives by comparing your result with what you know to be true from inputs.
var e = Math.exp(1);
var configs = {};
configs.refresh = function () {
  this.n = +$('.nValue').val();
  this.m = +$('.mValue').val();
  this.k = +$('.kValue').val();
  this.ideal = Math.pow(1 - Math.pow(e, (-this.k * this.n / this.m)), this.k);
  this.wordSize = 6;
  this.numTests = 10000;
};
configs.refresh();

$('button').click(function () {
  configs.refresh();
  runTest();
});


// Compare that rate with the approximation given for Bloom filters.
