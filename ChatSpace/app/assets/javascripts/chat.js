$(function(){
  function buildHTML(message){
    var image_html =``;
    if(message.image){
      image_html = `<img class="lower-message__image" src="${message.image}">`;
    }
    var html = `
      <div class="message" data-message-id="${message.id}">
        <div class="upper-message">
          <div class="upper-message__user-name">${message.name}</div>
          <div class="upper-message__date">${message.created_at}</div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">${message.content}</p>
          ${image_html}
        </div>
      </div>`
      return html;
  }

  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast')
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    // console.log(this)
    var formData = new FormData(this)
    // console.log(formData)
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
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__submit ').attr('disabled',false);
      $('#new_message')[0].reset();
      scroll()
    })
    .fail(function(){
      alert('error');
      $('.form__submit ').attr('disabled',false)
    })
  })
})
