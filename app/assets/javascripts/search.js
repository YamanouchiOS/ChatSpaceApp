$(function() {
  var search_users = $("#search-result")
  var group_menbers = $("#group-menber")

  function searchUser(user){
    var html = `<div class="chat-group-user js-chat-member clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_users.append(html)
  }

  function noUser(user){
    var html = `<div class="chat-group-user js-chat-member clearfix">
                    一致するユーザーが見つかりません。
                </div>`
    search_users.append(html)
  }

  function addUser(name, id){
    var members_count =$(".js-chat-member").length;
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${members_count}'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    group_menbers.append(html)
  }

  function removeMember(button) {
  $(button).parents('.js-chat-member').remove();
  }

  $("#user-search-field").on("keyup", function() {
    var keyword = $("#user-search-field").val();
    if (keyword.length === 0) {
      $("#search-result").empty();
    }
    else{
      $("#search-result").empty();
        $.ajax({
          type: 'GET',
          url: '/users',
          data: {keyword: keyword},
          dataType: 'json'
        })
      .done(function(users){
        if (users.length !== 0){
        $('#search-result').empty();
          users.forEach(function(user){
            searchUser(user);
          })
        }
        else{
          noUser();
        }
      })
      .fail(function(){
        alert("検索に失敗いたしました。");
      })
    }
  });

  $("#search-result").on('click', '.js-add-btn', function() {
    var name = $(this).data("user-name")
    var id = $(this).data("user-id")
    removeMember($(this));
    addUser(name, id);
    $(this).parent().remove();
  });

  $("#group-menber").on("click", '.js-remove-btn', function() {
      removeMember($(this));
      $(this).parent().remove();
  })

});
