$(function(){
  // 各入力フィールドとボタンの要素を選択
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

  // テキストのライトアップ用クラス選択
  const textLight = $(".textWrapper .text");
  // 数字の配列を保持するための配列
  let numbersArray = [];

  // スロットマシンの数値部分の高さを取得
  const numHeight = $(".reel .num").innerHeight();

  // スロットの値をランダムに設定する関数
  function reelRandom(input, reel) {
    const inputValue = input.val();
    const reelInner = reel.find(".reelInner");
    disabledButton(input); // ボタンの有効・無効を切り替える
    reelInner.children().not(":last-child").remove();
    if (inputValue !== '') {
      numbersArray = inputValue.split(',');
      var numRandomOutputs = numbersArray.length;
      var remainingValues = numbersArray.slice();
      var maxLimit = 40;
      if(numRandomOutputs < maxLimit) {
        var difference = maxLimit - numRandomOutputs // 足りない数を計算
        for (var i = 0; i < difference; i++) {
          var randomNumber = Math.floor(Math.random() * 40) + 1; // 1から40のランダムな値を生成
          reelInner.prepend("<p class='num'><span>" + randomNumber + "</span></p>");
        }
        for (var i = 0; i < numRandomOutputs; i++) {
          var randomIndex = Math.floor(Math.random() * remainingValues.length);
          var randomValue = remainingValues[randomIndex];
          remainingValues.splice(randomIndex, 1);
          reelInner.prepend("<p class='num' data-value=" + randomValue + "><span>" + randomValue + "</span></p>");
        }
        reelInner.css("transform", "translateY(" + -(numHeight * maxLimit) + "px)");
      } else {
        for (var i = 0; i < numRandomOutputs; i++) {
          var randomIndex = Math.floor(Math.random() * remainingValues.length);
          var randomValue = remainingValues[randomIndex];
          remainingValues.splice(randomIndex, 1);
          reelInner.prepend("<p class='num' data-value=" + randomValue + "><span>" + randomValue + "</span></p>");
        }
        reelInner.css("transform", "translateY(" + -(numHeight * numRandomOutputs) + "px)");
      }

    } else {
      reelInner.prepend("<p class='num'><span>?</span></p>");
      reelInner.css("transform", "translateY(0px)");
    }
  }

  // 入力値に基づいてボタンを有効・無効にする関数
  function disabledButton(input) {
    const inputValue = input.val();
    if (inputValue !== '') {
      slotButton.removeClass("disabled");
    } else {
      slotButton.addClass("disabled");
    }
  }

  // addButtonのクリックイベントハンドラ
  addButton.on('click', function() {
    $(".reel").removeClass("active");
    textLight.removeClass("active");
    reelRandom(numberInput01, reelElement01);
    reelRandom(numberInput02, reelElement02);
    reelRandom(numberInput03, reelElement03);
  });

  // deleteButtonのクリックイベントハンドラ
  deleteButton.on('click', function() {
    $(this).addClass("active");
    // 入力された値から削除対象の値を削除する
    const deleteItem01 = reelElement01.find(".num").first().data('value');
    const regex01 = new RegExp(deleteItem01 + '(,\\s*)?');
    const updateValue01 = numberInput01.val().replace(regex01, '');

    // 削除後の末尾のカンマを削除
    if (updateValue01.endsWith(',')) {
      var updatedValue = updateValue01.slice(0, -1);
      numberInput01.val(updatedValue);
    } else {
      numberInput01.val(updateValue01);
    }

    // 以下同様に他の入力フィールドに対しても実行
    const deleteItem02 = reelElement02.find(".num").first().data('value');
    const regex02 = new RegExp(deleteItem02 + '(,\\s*)?');
    const updateValue02 = numberInput02.val().replace(regex02, '');
    if (updateValue02.endsWith(',')) {
      var updatedValue = updateValue02.slice(0, -1);
      numberInput02.val(updatedValue);
    } else {
      numberInput02.val(updateValue02);
    }

    const deleteItem03 = reelElement03.find(".num").first().data('value');
    const regex03 = new RegExp(deleteItem03 + '(,\\s*)?');
    const updateValue03 = numberInput03.val().replace(regex03, '');
    if (updateValue03.endsWith(',')) {
      var updatedValue = updateValue03.slice(0, -1);
      numberInput03.val(updatedValue);
    } else {
      numberInput03.val(updateValue03);
    }
  });

  // spinButtonのクリックイベントハンドラ
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

  // resetButtonのクリックイベントハンドラ
  resetButton.on('click', function() {
    $(".reel").removeClass("active");
    textLight.removeClass("active");
    reelRandom(numberInput01, reelElement01);
    reelRandom(numberInput02, reelElement02);
    reelRandom(numberInput03, reelElement03);
    $(this).addClass("active");
    setTimeout(function() {
      resetButton.removeClass("active");
    }, 500);
  });

});
