var app = new Vue({
  el: '#app',
  data: {
    start: 0,
    bpm: null,
    avgBpm: null,
    taps: []
  },

  methods: {
    add: function(a, b){
        return a + b;
    },
    trigger: function (event) {
      if(this.start == 0){
        this.start = new Date().getTime()
      }
      else{
        var time = new Date().getTime()
        var diff = time - this.start
        this.bpm = 60000 / diff
        this.taps.push(this.bpm)
        var tempTaps = this.taps
        this.avgBpm = Math.round(tempTaps.reduce(this.add, 0) / this.taps.length)
        this.start = time
      }
    }
  }
})

$('button').on('mousedown',
    function(e) {
        e.preventDefault();
    }
);

$(document).ready(function() {
  $(document).keydown(function(e) {
    if (e.keyCode == '32') {
      app.trigger()
    }
    if (e.keyCode == '27') {
      app.start = 0
      app.bpm = null
      app.avgBpm = null
      app.taps = []
    }
  });
});
