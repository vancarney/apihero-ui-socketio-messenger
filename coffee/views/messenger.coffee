class ApiHero.WebSock.Messenger extends ApiHeroUI.core.View
  tenplate: templates['socketio-messenger/chat-layout']
  subviews:
    '#message-list': ApiHero.WebSock.ChatMessageList
    '#message-input': ApiHero.WebSock.ChatInput
  init:->
    @messanger.on 'add', @messageHandler, @
    # window.addEventListener 'native.keyboardshow', =>
      # _oHeight = @$('#messages').height()
      # @$('#messages-list').css 'height', _oHeight + 50
    # window.addEventListener 'native.keyboardhide', =>
      # @$('#messages-list').css 'height', _oHeight + 2