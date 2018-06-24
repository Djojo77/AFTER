$(window).ready(function () {

    // Window Event
    $(window).click(function(ev) {
        if ($('.catIcon.active').length > 0) {
            closeCat();
        }
        if (ev.target !== $('.mainContent')[0]) {
            unsetActiveCanvas();
        }
        closeAutocpl();
    });

    $('#search').click(function() { event.stopPropagation(); });
    $('#searchBarInput').click(function() { event.stopPropagation(); });
    $('.catLists').click(function() { event.stopPropagation(); });
    $('.map').click(function() { event.stopPropagation(); closeAutocpl(); });
    $('.info').click(function() { event.stopPropagation() });
    $('#searchBarInput')[0].onkeyup= function() { autocomplete($('#searchBarInput').val()); };
    // END Window Event

    // ModalBar ----------------------------------------------

    $('#smallLogo').click(function() {
        event.stopPropagation();
        toggleModal();
        // let target = this.getAttribute('data-target');
        // $('#'+target).toggleClass('hide');
    });

    $('.catIcon').click(function() {
        event.stopPropagation();

        let self = $(this);
        let target = this.getAttribute('data-target');
        let targetBack = '.categorie';

        if (self.hasClass('active')) {
            if (!$('#'+target).hasClass('hide')) {
                self.removeClass('active');
            }
        } else {
            closeLists();
            $('.catIcon').each(function() {
                if ($(this).hasClass('active') && $(this) !== self) {
                    $(this).removeClass('active')
                }
            });
            self.toggleClass('active');
        }
        $('#'+target).toggleClass('hide');
    });

    $('.buttonBack').click(function() {
        closeCat();
    });

    $('.listIcon').click(function() {
        let name = this.getAttribute('data-value');
        activeCanvas(name);
        $('#searchBarInput')[0].value = name;

    });

    let closeLists = function () {
        $('.catLists').each(function() {
            if (!$(this).hasClass('hide')) {
                $(this).toggleClass('hide');
            }
        });
    };

    let closeCat = function () {
        $('.catIcon.active').each(function() {
            let target = ($(this)[0].hasAttribute('data-target')) ? $(this).attr('data-target') : false;
            if (target !== false) {
                if (!$('#'+target).hasClass('hide')) {
                    $('#'+target).toggleClass('hide');
                }
            }
            $(this).removeClass('active');
        })
    };
    let closeModal = function () {
        if (!$('#modalCat').hasClass('hide')) {
            $('#modalCat').toggleClass('hide');
            closeCat();
        }
    };

    let toggleModal = function () {
        if ($('#modalCat').hasClass('hide')) {
            $('#modalCat').removeClass('hide');
        } else {
            closeCat();
            $('#modalCat').toggleClass('hide');
        }
    };
    // END ModalBar ----------------------------------------------

    // SearchBar ----------------------------------------------
    $('#search').click(function() {
        let input = ($('#searchBarInput')[0].value != '') ? ($('#searchBarInput')[0].value).toLowerCase() : 'null';
        activeCanvas(input);
    });
    // END SearchBar ----------------------------------------------


    // Canvas ----------------------------------------------
    let unsetActiveCanvas = function () {
        if ($('.canvas.active').length > 0) {
            $('.canvas.active').each(function() {
                $(this).removeClass('active');
            })
        }
        closeInfo();

    };

    let activeCanvas = function (input) {
        closeInfo();
        unsetActiveCanvas();
        let name = input.toLowerCase();
        target = ($('[name='+name+']').length > 0) ? $('[name='+name+']') : false;
        if (target !== false) {
            if (!target.hasClass('active')) {
                target.toggleClass('active');
            }
        }
        openInfo();
    };

    $('.canvas').click(function() {
        if (!$(this).hasClass('active')) {
            closeInfo();
            unsetActiveCanvas();
            $(this).toggleClass('active');
            openInfo();
        }
    });
    // END Canvas ----------------------------------------------

    function autocomplete(input) {
        let arr = ['zara', 'celio', 'resto', 'carrefour'];
        $('#autocomplete')[0].innerHTML = '';
        if (input !== '') {
            for (let i = arr.length - 1; i >= 0; i--) {
                for (let j = 0; j < input.length; j++) {
                    if (input[j] !== arr[i][j]) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            }
            for (let cnt = 0; cnt < arr.length; cnt++) {
                $('#autocomplete')[0].innerHTML += '<p class="autoInput">' + arr[cnt] + '</p>';
            }
            $('.autoInput').click(function () {
                let val = $(this)[0].innerHTML;
                $('#searchBarInput').val(val);
            });
            if (arr.length > 0 && $('#autocomplete').hasClass('hide')) {
                $('#autocomplete').removeClass('hide');
            } else if (arr.length <= 0 && !$('#autocomplete').hasClass('hide')) {
                $('#autocomplete').addClass('hide');
            }
        } else {
            closeAutocpl();
        }

    }

    function closeAutocpl() {
        if (!$('#autocomplete').hasClass('hide')) $('#autocomplete').addClass('hide');
    }

    function openInfo() {
        if ($('.info').hasClass('hide')) $('.info').removeClass('hide');
    }
    function closeInfo() {
        if (!$('.info').hasClass('hide')) $('.info').addClass('hide');
    }

});
