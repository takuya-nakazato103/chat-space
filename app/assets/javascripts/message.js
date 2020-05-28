$(function() {
  function buildHTML(message) {
    if (message.image) {
      var html =
        `<div class="message__container">
          <div class="message__info">
            <p class="message__info--user">
              ${message.user_name}
            </p>
            <p class="message__info--date">
              ${message.created_at}
            </p>
          </div>
          <p class="message__text">
            ${message.body}
          </p>
          <img src=${message.image}>
        </div>`
        return html;
    } else {
      var html = 
        `<div class="message__container">
          <div class="message__info">
            <p class="message__info--user">
              ${message.user_name}
            </p>
            <p class="message__info--date">
              ${message.created_at}
            </p>
          </div>
          <p class="message__text">
            ${message.body}
          </p>
        </div>`
        return html;
    };
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.main__messages').append(html);
      $('form')[0].reset();
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージの送信に失敗しました");
    })
    .always(function() {
      $('.send__btn').removeAttr('disabled');
    });
  });
});