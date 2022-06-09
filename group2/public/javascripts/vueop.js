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
        }
    }
});