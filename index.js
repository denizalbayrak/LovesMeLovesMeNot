$(document).ready(function() {
    // Yaprak sayısını 6 ile 20 arasında rastgele belirlemek
    //0-15 arası random üretilir, +6 ile 6-20 arası tam sayı
    var petalCount = Math.floor(Math.random() * 15) + 6;
    // Yaprakların DaisyHead etrafındaki yarıçap mesafesi
    var radius = 80;
    
    // Tıklama sayısını takip etmek için
    var clickCount = 0;

    // DaisyGroup içine yaprakları dairesel dizilimle yerleştiriyoruz
    for (var i = 0; i < petalCount; i++) {
      var angleDeg = (360 / petalCount) * i;  //360/yaprak sayısı açı bulunması için
      var angleRad = angleDeg * Math.PI / 180; // Derece -> Radyan dönüşümü

      // DaisyHead'in merkezine göre konum hesaplaması
      var x = radius * Math.cos(angleRad);
      var y = radius * Math.sin(angleRad);

      //yeni yaprak oluşturmak için
      var $petal = $('<img>')
        .attr('src', './Assets/Petal.png')
        .addClass('petal');

        //yaprakların merkezden ayarlanması
      $petal.css({
        left: (x + 120) + 'px',
        top: (y - 50) + 'px',
        transform: 'rotate(' + angleDeg + 'deg)',
        'transform-origin': 'center center'
      });

      $('#daisyGroup').append($petal); //daisyGroup a eklensin diye
    }

    // Tıklama olduğunda h1 metnini değiştirme fonksiyonu
    function updateTitle() {
      if (clickCount % 2 === 1) {
        $('#title').text('Loves Me');
      } else {
        $('#title').text('Loves Me Not');
      }
    }

    // Her yaprağa tıklandığında yaprağı aşağı süzerek kaldıran event handler
    $(document).on('click', '.petal', function() {
      clickCount++;
      updateTitle();

      // Tıklanan yaprak animasyonla aşağıya doğru süzülüp kayboluyor
      $(this).animate({
        top: "+=150",
        opacity: 0
      }, 800, function() {
        $(this).remove(); // Animasyonu tamamlanan yaprak DOM'dan kaldırılır.
        // Eğer hiç yaprak kalmadıysa, DaisyHead resmini güncelleyelim
        if ($('.petal').length === 0) {
          var titleText = $('#title').text();
          if (titleText === 'Loves Me') {
            $('#daisyHead').attr('src', './Assets/daisy_happy.png');
          } else {
            $('#daisyHead').attr('src', './Assets/daisy_sad.png');
          }
        }
      });
    });

    // DaisyGroup'un tüm elemanlarını (DaisyHead, DaisyBody, yapraklar) zıplatacak animasyon
    function bounceGroup() {
      $("#daisyGroup")
        .animate({ top: "-10px" }, 500)
        .animate({ top: "0px" }, 500, bounceGroup);
    }
    bounceGroup();
  });