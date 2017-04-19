/**
* Provides form submission, validation, and registration via a toggled modal
*/
var registerModal = {

  /**
  * Show or hide demo form depending on parameter passed in
  *
  * @method validateField
  * @param {string} formName: the name either ID or class of the form to be registered
  * @param {boolean} showbool:  if assigned true, shows form. if assigned false, hides form
  * @return void
  */
  toggleForm: function(formName, showbool) {
    var $formModal = $(formName).parents('.form-wrapper');

    if(showbool) {
      $formModal.fadeIn();
      $formModal.css({'top':'0px'});
      $formModal.find('aside, .bg-buddhi').fadeIn(800);
    }
    else {
      $formModal.find('aside, .bg-buddhi').fadeOut(200);
      $formModal.fadeOut(200);
    }
  },

  /**
  * Validate form fields and return an error message if failing
  *
  * @method validateField
  * @param {object} target: the field to be validated
  * @return void
  */
  validateField: function(target) {
    var string = target.attr('value')
      , type   = target.attr('type')
      , holder = target.attr('placeholder')
      , pin    = target.parent().find('label')
      , fade   = (pin.css('opacity') === '1') ? false : true;

    var invalid = (type === 'text' && (string == '' || string == holder || !/[一-龠]+|[ぁ-ん]+|[ァ-ヴー]+|[a-zA-Z0-9]+|[ａ-ｚＡ-Ｚ０-９]+/.test(string))) ||
      (type === 'email' && !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string)) ||
      (type === 'select' && string === '-') ||
      (type === 'password' && string.length < 5);

    if(invalid) {
      // Animate error message
      // Use position for animation to prevent jumping on multi-column forms
      pin.css({
        'opacity' : ((fade === false) ? 1 : 0),
        'left' : '20px',
        'display' : 'block'
      })
      .animate({
        'opacity' : 1,
        'left' : '0px'
      }, 300);

      target
        .removeClass('set')
        .parent()
        .addClass('error');
    } else {
      pin.animate({
        'opacity' : 0,
        'margin-left' : '1em'
      }, 200, function(){
        $(this).hide();
        target
          .parent()
          .removeClass('error');
      });

      target.addClass('set');
    }

    return !invalid;
  },

  /**
  * Register Form Lead through ajax call to register-modal.php and display success
  * or failure messages
  *
  * @method registerLead
  * @param {string} formName: the name either ID or class of the form to be registered
  * @param {string} successString: the string to display when the lead has successfully registered
  * @return void
  */

  registerLead: function(formName,successString) {
    var $form    = $(formName)
      , required = $form.find('.required')
      , successMessage = successString;

    for(var i = 0; i < required.length; i++) {
      registerModal.validateField($(required[i]));
    }

    if($form.find('ul li.error').length === 0) {
      var companySize = $form.find('#select-employees').text()
        , countryName = $('#MailingCountry').val();

      $form
        .find('.loading').css({ 'display': 'table' }).end()
        .find('ul').animate({ opacity: 0.1 }, 200).end()
        .siblings('header').animate({ opacity: 0.1 }, 200);

      if(companySize === '1-9' || (companySize === '10-49' && (countryName === 'United States' || countryName === 'Canada')) ) {
        $.ajax({
            url: '/app/pricing',
            data: $form.serialize(),
            type: 'POST',
            complete: function(xhr, textStatus) {
              webutils.createLead(formName);
              webutils.track('Pricing > Enterprise Request');

              setTimeout(function() {
                var response = $.parseJSON(xhr.responseText);

                if (response.success === 'true') {
                  $form.find('li').css('opacity',0);
                  $form.find('.loading').html(successMessage);
                } else {
                  $form.find('li').css('opacity',0);
                  $form.find('.loading').html("We're sorry. It appears that we may be having technical issues. Please return at a later time or send us a message through our <a href='//www.zendesk.com/support/contact/'>contact page</a>.");
                }
              }, 1000); // Faux wait time in case it's too fast
            }
        });
      } else {
        webutils.createLead(formName);

        setTimeout(function() {
          $form.find('li').css('opacity',0);
          $form.find('.loading').html(successMessage);
        }, 1000); // Faux wait time in case it's too fast
      }

    }
  },

  init: function() {
    /*
     * Listeners
     *
     */

    // Open form onclick

    $('#contactDemo, #reqDemo').on('click', function(){
      $('#demoFormWrapper h3 .plan-title').html($(this).attr('data-plan'));
      registerModal.toggleForm('.form-contact',true);
      $('#plan').val($(this).attr('data-plan'));

      return false;
    });

    // Close form onclick
    $('.close-btn').on('click', function(){
      registerModal.toggleForm('.form-contact',false);
    });

    // Select interaction
    $('form.form-contact')
      .on('keyup', '.required', function(){
        if($(this).attr('data-state') === 'active') {
          var target = $(this);

          window.clearTimeout(timer);
          timer = setTimeout(function() {
            registerModal.validateField(target);
          }, 800);
        }
      })
      .on('blur', '.required', function(){
        if($(this).attr('data-state') != 'active') {
          $(this).attr('data-state', 'active');
        }

        registerModal.validateField($(this));
      })
      .on('change', 'select', function(){
        if($(this).attr('data-state') != 'active') {
          $(this).attr('data-state', 'active');
        }

        registerModal.validateField($(this));

        $(this)
          .siblings('.select-label')
          .find('.txt')
          .text($(this).val())
      });

    $('.btn-submit').on('click',function(){
      webutils.setMAVs(false);
      registerModal.registerLead('.form-contact', '<p style="color:white;">Your request has been sent.</p><p style="color:white;">One of our customer service representatives will contact you shortly.</p>');
    });

    // Employee faux select switching
    $('form.form-contact select').change(function(){
      $(this).parent()
        .find('.select')
        .html(webutils.escapeHTML($(this).find('option:selected').text()) + '<span class="toggle"></span>')
        .addClass('set')
        .parent()
        .removeClass('error');
    });

    if(db && dbase.registry_country) {
      $('#MailingCountry').val(dbase.registry_country); // dbase.country_name
    }

    $('#owner\\[name\\]').on('blur', function(){
      var name = webutils.escapeHTML($(this).val())
        , first
        , last;

      name = webutils.escapeHTML(name);
      if(name.indexOf(' ') !== -1) {
        first = name.substr(0, name.indexOf(' '));
        last  = name.substr(name.indexOf(' ') + 1);

        if(last.length === 0)
          last = name;
      }

      $('form.form-contact #FirstName').val(first);
      $('form.form-contact #LastName').val(last);
    });
  }
};
