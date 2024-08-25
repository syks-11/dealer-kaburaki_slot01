$(function(){
  const numberInput01 = $('#numberInput01');
  const numberInput02 = $('#numberInput02');
  const numberInput03 = $('#numberInput03');
  const addButton = $('#addButton');
  const deleteButton = $('#deleteButton');
  const slotButton = $(".slotButton");
  const spinButton = $('#spinButton');
  const resetButton = $('#resetButton');
  const reelElement01 = $('#reel01');
  const reelElement02 = $('#reel02');
  const reelElement03 = $('#reel03');
  const lever = $('#lever');

  const textLight = $(".textWrapper .text");
  let numbersArray = [];

  const numHeight = $(".reel .num").innerHeight();

  function reelRandom(input,reel) {
    const inputValue = input.val();
    const reelInner = reel.find(".reelInner");
    disabledButton(input);
    reelInner.children().not(":last-child").remove();
    if (inputValue !== '') {
      numbersArray = inputValue.split(',');
      var numRandomOutputs = numbersArray.length;
      var remainingValues = numbersArray.slice();
      for (var i = 0; i < numRandomOutputs; i++) {
        var randomIndex = Math.floor(Math.random() * remainingValues.length);
        var randomValue = remainingValues[randomIndex];
        remainingValues.splice(randomIndex, 1);
        reelInner.prepend("<p class='num' data-value="+ randomValue +"><span>"+ randomValue +"</span></p>");
      }
      reelInner.css("transform","translateY("+ -(numHeight *  numRandomOutputs) +"px)");
    } else {
      reelInner.prepend("<p class='num'><span>?</span></p>");
    }
  }


  function disabledButton(input) {
    const inputValue = input.val();
    if (inputValue !== '') {
      slotButton.removeClass("disabled");
    } else {
      slotButton.addClass("disabled");
    }
  }


  addButton.on('click', function() {
    $(".reel").removeClass("active");
    textLight.removeClass("active");
    reelRandom(numberInput01,reelElement01);
    reelRandom(numberInput02,reelElement02);
    reelRandom(numberInput03,reelElement03);
  });

  deleteButton.on('click', function() {
    $(this).addClass("active");
    const deleteItem01 = reelElement01.find(".num").first().data('value');
    const regex01 = new RegExp(deleteItem01 + '(,\\s*)?');
    const updateValue01 = numberInput01.val().replace(regex01, '');

    const deleteItem02 = reelElement02.find(".num").first().data('value');
    const regex02 = new RegExp(deleteItem02 + '(,\\s*)?');
    const updateValue02 = numberInput02.val().replace(regex02, '');

    const deleteItem03 = reelElement03.find(".num").first().data('value');
    const regex03 = new RegExp(deleteItem03 + '(,\\s*)?');
    const updateValue03 = numberInput03.val().replace(regex03, '');

    if (updateValue01.endsWith(',')) {
      var updatedValue = updateValue01.slice(0, -1); // 文末のカンマを削除
      numberInput01.val(updatedValue);
    } else {
      numberInput01.val(updateValue01);
    }

    if (updateValue02.endsWith(',')) {
      var updatedValue = updateValue02.slice(0, -1); // 文末のカンマを削除
      numberInput02.val(updatedValue);
    } else {
      numberInput02.val(updateValue02);
    }

    if (updateValue03.endsWith(',')) {
      var updatedValue = updateValue03.slice(0, -1); // 文末のカンマを削除
      numberInput03.val(updatedValue);
    } else {
      numberInput03.val(updateValue03);
    }

  });

  spinButton.on('click', function() {
    $(".reel").addClass("active");
    $(this).addClass("active");
    lever.addClass("active");
    textLight.addClass("active");
    setTimeout(function() {
      spinButton.removeClass("active");
      spinButton.addClass("disabled");
    }, 5000);
    setTimeout(function() {
      lever.removeClass("active");
    }, 3000);

  });

  resetButton.on('click', function() {
    $(".reel").removeClass("active");
    textLight.removeClass("active");
    reelRandom(numberInput01,reelElement01);
    reelRandom(numberInput02,reelElement02);
    reelRandom(numberInput03,reelElement03);
    $(this).addClass("active");
    setTimeout(function() {
      resetButton.removeClass("active");
    }, 500);
  });


});
