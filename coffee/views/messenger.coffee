class ApiHero.WebSock.Messenger extends ApiHeroUI.core.View
  tenplate: templates['socketio-messenger/chat-layout']
  subviews:
    '#message-list': ApiHero.WebSock.ChatMessageList
    '#message-input': ApiHero.WebSock.ChatInput
  
  sendMessage:(mssg)->
    cordova.plugins.Keyboard.close() if global.Util.isPhonegap()
    @model.set text:mssg if mssg
    return unless (@model.get 'text')
    @model.save()
    @model.clear()
    @$('input[name=memo]').val ''
    @$('a.btn.submit').addClass 'disabled'
    
  childrenComplete:->
    @['#messages-input'].on 'send', @sendMessage, @

  init:->
    _oHeight = 0
    @model ?= new ApiHero.WebSock.Message
    @messanger.on 'add', @messageHandler, @
    # window.addEventListener 'native.keyboardshow', =>
      # _oHeight = @$('#messages').height()
      # @$('#messages-list').css 'height', _oHeight + 50
    # window.addEventListener 'native.keyboardhide', =>
      # @$('#messages-list').css 'height', _oHeight + 2