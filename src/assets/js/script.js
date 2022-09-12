//swiper
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});


//drawer
$(function() {
  //処理を書く部分
  $(".header-hamburger-item").click(function () {//ボタンがクリックされたら
    $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
      $(".header-drawer-nav").toggleClass('active');//ナビゲーションにactiveクラスを付与
  });
  
  $(".header-drawer-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
      $(".header-hamburger-item").removeClass('active');//ボタンの activeクラスを除去し
      $(".header-drawer-nav").removeClass('active');//ナビゲーションのactiveクラスも除去
  });
  });

  

  //トップに戻る
// .to-top-btnをクリックした際の設定
$('.to-top-btn').click(function () {
  $('body,html').animate({
      scrollTop: 0//ページトップまでスクロール
  }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false;//リンク自体の無効化
});


//アコーディオンをクリックした時の動作
$(".service__question-card").on("click", function(){
  $(this).find(".service__question-box-title").toggleClass("active")//質問分が赤くなる
  $(this).find(".service__question-box-btn").toggleClass("active")//「+」から「×」に変化
  $(this).find(".service__question-card-answer").slideToggle(500);//回答文が現れる
})

