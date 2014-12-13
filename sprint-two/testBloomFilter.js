// Run 10,000 trials of trying to retrieve a mix of items that are in the filter and not in the filter.
var items = [];

for (var i = 0; i < 10000; i++){

}


// Record the empirical rate of false-positives by comparing your result with what you know to be true from inputs.
var e = Math.exp(1);
var configs = {};

configs.refresh = function () {
  this.n = +$('.nValue').val();
  this.m = +$('.mValue').val();
  this.k = +$('.kValue').val();
  this.ideal = Math.exp(1 - Math.pow(e, (-this.k * this.n / this.m)), this.k);
};
configs.refresh();

$('button').click(function () {
  configs.refresh();
});


// Compare that rate with the approximation given for Bloom filters.