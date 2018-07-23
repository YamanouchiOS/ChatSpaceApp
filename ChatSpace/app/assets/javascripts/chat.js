$(function(){
  function buildHTML(message){
    var img = message.img ? `<img class="lower-message__image" src="${message.img}">` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <ul class="user">
                    <li class="list user__name">
                      ${message.user_name}
                    </li>
                    <li class="list user__date">
                      ${message.created}
                    </li>
                  </ul>
                  <p class="text">
                    ${message.body}
                  </p>
                  ${img}
                </div>`
    return html
  }
  function scrollBottom(target){
    $('.content').animate({scrollTop:$('.content')[0].scrollHeight},{duration:1000});
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
      $('.content').append(buildHTML(data));
      scrollBottom();
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
          var id = $('.message').last().data('messageId');
          var insertHTML = '';
          data.messages.forEach(function(message){
            if(message.id > id ){
              insertHTML += buildHTML(message);
              scrollBottom();
            }
          });
          $('.content').append(insertHTML);
        })
        .fail(function(data){
          alert('メッセージの更新ができませんでした')
        });
      }
    else{
      clearInterval(interval);
    }
  },1000 );
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

