import Vue from 'vue';

Vue.filter('formatMoney', value => value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
