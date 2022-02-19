if (typeof b === 'undefined') {
  #include "../../basil.js";
}
if (typeof b.test === 'undefined') {
  #include "../../lib/basil.test.js";  
}

b.test('download', {

  testDownload: function() {
    b.download("https://raw.githubusercontent.com/basiljs/basil.js/master/changelog.txt");
    assert(new File("./download/changelog.txt"));
  },

  testDownloadWithQueryString: function() {
    b.download("https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=https://basiljs.ch", "qrcode.png");
    assert(new File("./qrcode.png"));
  },
  
  testDownloadWithSpacesInPath: function() {
    b.download("https://raw.githubusercontent.com/basiljs/basil.js/master/lib/basil.png", "folder with spaces/basil.png");
    assert(new File("./folder with spaces/basil.png"));
  }

});

// print collected test results
b.test.result();