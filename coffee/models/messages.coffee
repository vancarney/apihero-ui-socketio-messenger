#### class Messages
#> handles all Message objects from socket.io
class ApiHero.WebSock.Messages extends ApiHero.WebSock.StreamCollection
  model:ApiHero.WebSock.Message
  # overrides add
  add:(attr,opts)->
    Messages.__super__.add.call @, attr, opts
  # acts as singleton
  @getInstance: ->
    @__instance ?= new @