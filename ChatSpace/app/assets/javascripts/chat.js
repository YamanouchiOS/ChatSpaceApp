$(function(){
  const INTERVAL = 10000
  function buildHTML(message){
    var img = message.img ? `<img class="lower-message__image" src="${message.img}">` : "";

    var html = `<div class="message">
                  <div class="message__user-name">
                    ${message.name}
                  </div>
                  <div class="message__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="meesage__content">
                  <p class="message__text">
                    ${message.content}
                  </p>
                  ${img}
                </div>`
    return html
  }

  function scrollMessage() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast')
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      $('.messages').append(buildHTML(data));
      scrollMessage();
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージを入力して下さい');
      $('.form__submit').prop('disabled', false);
    })
  })

  var interval = setInterval(function(){
    if(window.location.pathname.match(/\/groups\/\d+\/messages/)){
        $.ajax({
            url: location.pathname,
            type: "GET",
            dataType: 'json',
            processData: false,
            contentType: false
        })

        .done(function(data){
          var addHTML = '';
          var updatedMessage = $('.message').length;
          var Messages = data.messages.length;
            for(var i = updatedMessage; i < Messages; i++) {
              addHTML += buildHTML(data.messages[i]);
            };
            $('.messages').append(addHTML);
        })

        .fail(function(data){
          // alert('メッセージは最新の状態です。')
          console.log("失敗");
        });
      }
    else{
      clearInterval(interval);
    }
  },INTERVAL);
});


// $(function(){
//   function buildHTML(message){
//     var image_html =``;
//     if(message.image){
//       image_html = `<img class="lower-message__image" src="${message.image}">`;
//     }
//     var html = `
//       <div class="message" data-message-id="${message.id}">
//         <div class="upper-message">
//           <div class="upper-message__user-name">${message.name}</div>
//           <div class="upper-message__date">${message.created_at}</div>
//         </div>
//         <div class="lower-message">
//           <p class="lower-message__content">${message.content}</p>
//           ${image_html}
//         </div>
//       </div>`
//       return html;
//   }

//   function scroll() {
//     $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast')
//   }

//   $('#new_message').on('submit', function(e){
//     e.preventDefault();
//     // console.log(this)
//     var formData = new FormData(this)
//     // console.log(formData)
//     var url = $(this).attr('action')
//     $.ajax({
//       url: url,
//       type: "POST",
//       data: formData,
//       dataType: 'json',
//       processData: false,
//       contentType: false
//     })

//     .done(function(data){
//       var html = buildHTML(data);
//       $('.messages').append(html);
//       $('.form__submit ').attr('disabled',false);
//       $('#new_message')[0].reset();
//       scroll()
//     })
//     .fail(function(){
//       alert('error');
//       $('.form__submit ').attr('disabled',false)
//     })

//     function update(){
//       var lastMessageId = $('.message').last().data('message-id');
//       $.ajax({
//         url: location.href,
//         type: "GET",
//         data: { id: lastMessageId },
//         dataType: 'json'
//       })
//       .done(function(data){
//         data.messages.forEach(function(message) {
//           var html = buildHTML(message);
//           $('.messages').append(html);
//           scroll()
//         });
//       })
//       .fail(function(data){
//         alert('メッセージの更新ができませんでした')
//       })
//     }
//     $(window).bind("load",function(){
//       if (location.pathname.match(/\/groups\/\d+\/messages/)) {
//           setInterval(update,20);
//       }
//     })
//   })
// })

