$(document).ready(function() {
  // Show header text after 1 sec page is loaded
  setTimeout(function() {
    $(".header-text").addClass("fadeInUp").removeClass("hidden");
  }, 1000);

  // Add section animation
  const halfHeight = $(window).height() / 2;

  // Call on scroll functions
  $(window).on("scroll", function() {
    inlineElements();
    accentElements();
    lastElements();
  });

  // Create on scroll functions
  function inlineElements() {
    let elem = $(".inline-elem").offset().top;
    let topWindow = $(window).scrollTop();
    if (elem < (topWindow + halfHeight)) {
      $(".inline-elem").each(function(i) {
        setTimeout(function() {
          $(".inline-img").eq(i).addClass("scale fadeIn").removeClass("hidden");
          $(".inline-text").eq(i).addClass("fadeInUp").removeClass("hidden");
        }, 500 * i);
      });
    }
  }

  function accentElements() {
    let elem = $("#accent").offset().top;
    let topWindow = $(window).scrollTop();
    if (elem < (topWindow + halfHeight)) {
      $(".elem-to-animate").each(function(i) {
        setTimeout(function() {
          $(".elem-to-animate").eq(i).addClass("fadeInRight").removeClass("hidden");
          $(".trucker").addClass("fadeInUp").removeClass("hidden");
        }, 500 * i);
      });
    }
  }

  function lastElements() {
    let elem = $(".last-elem").offset().top;
    let topWindow = $(window).scrollTop();
    $(".last-elem").each(function(i) {
      if (elem < (topWindow + halfHeight)) {
        setTimeout(function() {
          $(".last-elem").eq(i).addClass("fadeInUp").removeClass("hidden");
        }, 500 * i);
      }
    });
  }

  // Form validation
  // Modal
  $("#form").submit(function(event) {
    if($("#name").val() !== "" && $("#email").val() !== "" &&
      $("#privacy").is(":checked") && $("#type-of-user").val() !== null) {
      openModal();
    }
    event.preventDefault();
  });

  $(".modal-btn").click(function() {
    closeModal();
  });

  // Open modal
  function openModal() {
    $(".modal").css("display", "flex");
  }
  // Close modal
  function closeModal() {
    $(".modal").css("display", "none");
  }


  // Validate the field
  function hasError(field) {
    let validity = field.validity;
    if (field.validity.valid) return;
    if (field.validity.valueMissing) return "This field is required";
    if (field.validity.typeMismatch) return "Enter a valid email address";
    if (validity.tooShort) return "Minimum length is " + field.getAttribute('minLength') + " characters. You are currently using " + field.value.length + " characters.";
  }

  function showError(field, error) {
    $(field).addClass("error");

    let id = field.id;
    if(!id) return;

    let message = field.form.querySelector(".error-message#error-for-" + id);
    if (!message) {
      message = document.createElement("small");
      message.className = "error-message";
      message.id = "error-for-" + id;
      field.parentNode.insertBefore(message, field.nextSibling);
    }
    message.innerHTML = error;
    message.style.display = "flex";
    message.style.display = "visible";
  }

  function removeError(field) {
    $(field).removeClass("error");
    $(field).css("background", "white");

    let id = field.id;
    if(!id) return;

    let message = field.form.querySelector(".error-message#error-for-" + id + "");
    if (!message) return;

    message.innerHTML = "";
    message.style.display = 'none';
    message.style.visibility = 'hidden';
  }

  document.addEventListener("blur", function(event) {
    let error = hasError(event.target);
    if (error) {
      showError(event.target, error);
    } else {
      removeError(event.target);
    }
  }, true);

  // Custom select input
  $('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });
  });
});
