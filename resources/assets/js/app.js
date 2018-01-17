
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import Vue from 'vue';
import $ from "jquery";
import 'eonasdan-bootstrap-datetimepicker';
import 'bootstrap-select';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import query from 'query-string';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

$(document).ready(()=> {
  $('.carousel').carousel();
  $('#datepicker').datetimepicker({
    format: "dddd, Do MMMM YYYY",
    locale: 'id'
  });
  $('#hourpicker').datetimepicker({
    format: "LT"
  });
  $('.selectpicker').selectpicker({
    style: 'btn-info',
    size: 4
  });


  $('.selectPostal').selectpicker({
    style: 'btn-info',
    size: 3,
    liveSearch: true,
    liveSearchPlaceholder: 'Search kodepos'
  });

  if(!localStorage.quiz) {
    // $('#modal-quiz').modal('show');
  }
// Tooggle sticky calculator
  $('#calculator-toggle').click(()=> {
    const $calculator = $('.calculator-container');
    if($calculator.hasClass('active')) {
      $calculator.removeClass('active');
      $calculator.animate({
        right: '-20%'
      }, 300);

      return;
    }
    $calculator.addClass('active');
     $calculator.animate({
      right: 0
    });
  });

  $('.toggle-menu').click(function() {
    var $menu = $('#menu-mobile');
    if($menu.hasClass('active')) {
      $menu.removeClass('active');
      $menu.animate({
        right: '-100%'
      }, 300);

      return;
    }
    $menu.addClass('active');
     $menu.animate({
      right: "0"
    });
  });
  $('.close-toggle').click(function() {
    var $menu = $('#menu-mobile');
    $menu.removeClass('active');
    $menu.animate({
      right: '-100%'
    }, 300);
  });

  $('.panel-parolamas .panel-heading').click(function() {
      $('.panel-parolamas .panel-heading').removeClass('active');
      $(this).addClass('active');
  });

  const params = query.parse(window.location.search);
  const tab    = $('.tab-pane');
  if(params.page) {
      tab.removeClass('active');
      $(`.nav-tabs a`).parents().removeClass('active');
      $(`#${params.page}`).addClass('active');
      $(`.nav-tabs a[href="#${params.page}"]`).parents().addClass('active');
  }

});

// Vue

const contact = new Vue({
    el: '#contact',

    components: {
    },
    beforeCreate() {
      console.log('contact created');
    },
    data: {
        notif: false,
        loader: false,
        contactForm: {
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          type: 'Asuransi Rumah'
        },
        errors: {
          errEmail:'',
          errName:'',
          errPhone:'',
          errDate:'',
          errTime: '',
        },
        isValid: false,
    },

    mounted() {
    },

    methods: {
      changeTime(evt) {
        this.contactForm.time = evt.target.value;
      },
      changeDate(evt) {
        this.contactForm.date = evt.target.value;
      },
      submitContact() {
        let vm = this;
        let formData = new FormData();
        const {name, email, phone, date, time, type} = this.contactForm;
        if(!vm.validate().isValid) {
          console.log('invalid');
          vm.errors = vm.validate().errors;
          return;
        }
        vm.loader = true;
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('date', date);
        formData.append('time', time);
        formData.append('type', type);
        axios.post('/registration', formData)
        .then( (d) => {
          vm.notif = true;
          setTimeout(function() {
            vm.notif = false;
            vm.loader = false;
            vm.resetForm();
            vm.errors = {};
          }, 1200);
        })
        .catch(error => {
            const err = error.response.data;
            alert(err.message);
            vm.loader = false;
        });
      },
      validate() {
        const {contactForm}  = this;
        let errors = {};
        if (!Validator.isEmail(contactForm.email)) {
            errors.errEmail = 'This field must be a valid email address.';
        }
        if (Validator.isEmpty(contactForm.email)) {
            errors.errEmail = 'This field is required.';
        }
        if (Validator.isEmpty(contactForm.name)) {
            errors.errName = 'This field is required.';
        }
        if (Validator.isEmpty(contactForm.phone)) {
            errors.errPhone = 'This field is required.';
        }
        if (Validator.isEmpty(contactForm.date)) {
            errors.errDate = 'This field is required.';
        }
        if (Validator.isEmpty(contactForm.time)) {
            errors.errTime = 'This field is required.';
        }
        // console.log(errors);
        return {
          errors,
          isValid: isEmpty(errors)
        };
      },
      resetForm() {
        this.contactForm = {
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          type: 'Asuransi Rumah'
        };
      }
    },

    updated: function () {
    }
});
