class ApiHero.WebSock.ChatMessageList extends ApiHero.core.View
  template:templates['websock/chat-message-list']
  collection: ApiHero.WebSock.Messages.getInstance()
  messageHandler:(data)->
    console.log 'messageHandler:'
    console.log data
    o = _.extend {}, data.attributes, data.header.__user
    @$el.append @messageTemplate o
  init:->
    @collection.on 'add', @messageHandler, @