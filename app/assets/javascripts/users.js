$(function() {
  var user_list = $('#user-search-result');

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    user_list.append(html);
  }

  function appendErrMsgToHTML() {
    var html =`<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">ユーザーが見つかりません</p>
   </div>`
    user_list.append(html);
  }

  function groupUser(name, id) {
    var html = `<div class="chat-group-user clearfix">
                  <input name="group[user_ids][]" type="hidden" value="${id}">
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('.js-add-user').append(html);
  }

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      } else {
         appendErrMsgToHTML();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });

  $(document).on('click', '.user-search-add', function() {
    var userName = $(this).attr('data-user-name');
    var userId = $(this).attr('data-user-id');
    $(this).parent().remove();
    console.log(userName);
    groupUser(userName, userId);
  });

  $(document).on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  });
});