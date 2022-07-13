// html will loop around to the top. Page location displayed in degrees

$(document).ready(function() {
  var scrollValue = 15;
  var divDegs = [];
  var divHeights = [];
  var htmlHeight = 0;
  var wheelDegree = 0;
  var divDegree = 0;
  $(".main_div").each(function(i) {
     var hght = Math.ceil($(this).children(".content").height()/ scrollValue) * scrollValue;
     var degrees = ((360 / $(".main_div").length) / (hght) );
     $(this).css("top",htmlHeight);
     htmlHeight += hght;
     divDegs.push(degrees);
     divHeights.push(hght);
     ScrollEffect(1);
     ScrollEffect(1);
  })



  // events

  // scroll desktop
  // **** get position from css for samsies accross browsers
  $(document).on("wheel",function(e) {
    var sign;
    // console.log(e.originalEvent.deltaY);
    if (e.originalEvent.deltaY > 0){
      sign = 1;
      $(".main_div").each(function() {
        var int = parseInt($(this).css("top").replace("px",""));
        $(this).css("top", int - scrollValue);
      })
    }
    if(e.originalEvent.deltaY < 0 ){
      sign = -1;
      $(".main_div").each(function() {
        var int = parseInt($(this).css("top").replace("px",""));
        $(this).css("top", int + scrollValue);
      })
    }
    ScrollEffect(sign);
    SpinEffect(sign);
  })

  // scroll small
  var direction = null;
  $(".mobileScroll .top").on("touchstart mousedown",function(){
    direction = "up";
    touchIntv = setInterval(touchGo, 10);
  })
  $(".mobileScroll .bottom").on("touchstart mousedown",function(){
    direction = "down";
    touchIntv = setInterval(touchGo, 10);
  })
  $(".mobileScroll *").on("touchend mouseup",function(e){
    direction = null;
    clearInterval(touchIntv);
  })
  var touchGo = () => {
    var sign;
    if (direction === "up"){
      sign = -1;
      $(".main_div").each(function() {
        var int = parseInt($(this).css("top").replace("px",""));
        $(this).css("top", int + scrollValue);
      })
    }
    if(direction === "down"){
      sign = 1;
      $(".main_div").each(function() {
        var int = parseInt($(this).css("top").replace("px",""));
        $(this).css("top", int - scrollValue);
      })
    }
    ScrollEffect(sign);
  }

  // create loop
  function ScrollEffect(sign){
    $(".main_div").each(function(i) {
      var top = parseInt($(this).css("top").replace("px",""));
      if (- top > divHeights[i] && sign > 0){
        var marg = i === 0
          ? parseInt($(".main_div").eq( $(".main_div").length - 1 ).css("top").replace("px",""))
          : parseInt($(".main_div").eq(i-1).css("top").replace("px",""));
        var hght = i === 0
          ? divHeights[ $(".main_div").length - 1 ]
          : divHeights[i-1];
        $(this).css("top",marg+hght+"px");
      }
      var a = i < 1 ? $(".main_div").length - 1 : i - 1;
      var b = i < 2 ? $(".main_div").length - 2 : i - 2;
      var c = i === $(".main_div").length - 1 ? 0 : i + 1;
      if( top > divHeights[a] + divHeights[b]){
        $(this).css("top",parseInt($(".main_div").eq(c).css("top").replace("px","")) - divHeights[i]);
      }
      if (top === scrollValue && sign < 0 ){
        var a = i < 1 ? $(".main_div").length - 1 : i - 1;
        divDegree = divDegs[a];
        console.log("degreeR=",a);
      }
      else if (top === - scrollValue && sign > 0) {
        divDegree = divDegs[i];
        console.log("degreeR=",i);
      }
    })
  }
  function SpinEffect(sign) {
      wheelDegree += divDegree * scrollValue * sign;
      $("#IconWheel").css("transform", "rotate("+wheelDegree+"deg)");
  }
})
