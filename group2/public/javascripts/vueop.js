// use to hide and display a section
var part = new Vue({
    el: '#notblue',
    data: {
      show_info: true,
      show_event: true,
      button:"Hide Penal"
    },
    methods: {
        hideShow: function () {
        this.show_info = !(this.show_info);

        if (this.show_info) {
          this.button = "Hide Penal";
        }else {
          this.button = "Show Penal";
        }
        }
    }
});