class ApiHero.WebSock.ChatMessageList extends ApiHeroUI.core.View
  template:templates['websock/chat-message-list']
  collection: ApiHero.WebSock.Messages.getInstance()
  messageHandler:(data)->
    o = _.extend {}, {body:data.attributes}, {header:data.header}
    @$el.append itm = @messageTemplate o
    @trigger 'added-item', itm
  init:->
    @collection.on 'add', @messageHandler, @