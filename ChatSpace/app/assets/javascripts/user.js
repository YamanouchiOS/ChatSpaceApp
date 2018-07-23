$(function() {
  var search_list = $("#user-search-result")
  var group_user_list = $("#chat-group-users")

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html)
  }

  function appendNoUser(user){
    var html =
      `<div class='chat-group-user clearfix'>${user}</div>`
      $("#user-search-result").append(html)
  }

  function addUser(name, id){
    var member_count =$(".js-chat-member").length;
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${member_count}'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    group_user_list.append(html)
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if(input == ""){
      $("#user-search-result").empty();
    }
    else{
      $.ajax({
        type: 'GET',
        url: '/users',
        data: {keyword: input},
        dataType: 'json'
      })
      .done(function(users){
        $("#user-search-result").empty();
        if(users.length !== 0){
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else{
          appendNoUser("一致するユーザーはいません")
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました')
      })
    }
  });

  $("#user-search-result").on('click', '.js-add-btn', function() {
    var name = $(this).data("user-name")
    var id = $(this).data("user-id")
    addUser(name, id);
    $(this).parent().remove();
  });

  $("#chat-group-users").on("click", '.js-remove-btn', function() {
    $(this).parent().remove();
  })

});
