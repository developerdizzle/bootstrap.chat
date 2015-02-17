(function($) {
    $.fn.chat = function(option) {
        var $chat = $(this);
        var recipient = $chat.data('chat-recipient');
        
        var $tab = null;
        var $unread = null;

        if (option == "send") {
            return function(message) {
                $chat.trigger('send.bs.chat', {
                    recipient: recipient,
                    message: message
                });
                var $chatBody = $chat.find('.chat-body');
                var $message = $('<p class="text-right text-muted"></p>').text(message);

                $chatBody.append($message);

                //TODO: is this correct?

                $chatBody.scrollTop($chatBody[0].scrollHeight);
            };
        }

        if (option == "receive") {
            return function(message) {
                var $chatBody = $chat.find('.chat-body');

                var $message = $('<p class="text-left"></p>').text(message);

                $chatBody.append($message);

                $chatBody.scrollTop($chatBody[0].scrollHeight);
            };
        }
        
        if (option == "tab") {
            if (!$tab) {
                var $pane = $chat.closest('.tab-pane');
                var tabid = $pane.attr('id');
                
                $tab = $('[data-toggle="tab"][href="#' + tabid + '"]');
            }
            
            return $tab;
        }
        
        if (option == "unread") {
            if (!$unread) {
                $unread = $chat.chat("tab").find(".badge");
            }
            
            return $unread;
        }
    };

    $(function() {
        $('body').on('keypress', '.chat input[type="text"]', function(e) {
            if (e.which == 13) {
                var $input = $(this);
                var $chat = $input.closest('.chat');

                $chat.chat('send')($input.val());
                
                $input.val('');
            }
        });
        $('body').on('click', '.chat button', function() {
            var $button = $(this);
            var $chat = $button.closest('.chat');
            var $input = $chat.find('input[type="text"]');

            $chat.chat('send')($input.val());
            
            $input.val('');
        });
    });
})(jQuery);