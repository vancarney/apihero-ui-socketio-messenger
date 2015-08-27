class ApiHeroUI.WebSock.ChatInput extends ApiHero.core.View
  template:templates['websock/chat-input']
  events:
    "submit form":(evt)->
      evt.preventDefault()
      @sendMessage()
      false
    "focus input[name=memo]":"keyboardOnHandler"
    "blur input[name=memo]":"keyboardOffHandler"
    "propertychange input[name=memo]":"changeHandler"
    "change input[name=memo]":"changeHandler"
    "keyup input[name=memo]":"keyUpHandler"
    "input input[name=memo]":"changeHandler"
    "paste input[name=memo]":"changeHandler"
    "click a.btn.submit":(evt)->
      evt.preventDefault()
      @sendMessage()
      false
  sendMessage:->
    @trigger 'send', mssg if (mssg = @$('input[name=memo]').val())?
  keyboardOnHandler:(evt)->
    if global.Util.isMobile() 
      $('nav').addClass 'hidden'
      @$('.input-row').css bottom: 0 # if window.orientation is 0 then 0 else 25
      @resize width:window.innerWidth, height:window.innerHeight
  keyboardOffHandler:(evt)->
    if global.Util.isMobile() 
      $('nav').removeClass 'hidden'
      @$('.input-row').css bottom:50
      # @$('#messages').height @$('#messages').height() - 100
      @resize width:window.innerWidth, height:window.innerHeight
  keyUpHandler:(evt)->
    if global.Util.isMobile() and (global.Util.isPhonegap() is false)
      @sendMessage mssg if (mssg = @$('input[name=memo]').val())? if evt.which is 13
      $(evt.target).blur()
  changeHandler:(evt)->
    console.log 'change'
    @model.set text: (t = $(evt.target).val())
    @$('a.btn.submit')["#{if t.length then 'remove' else 'add'}Class"] 'disabled'
