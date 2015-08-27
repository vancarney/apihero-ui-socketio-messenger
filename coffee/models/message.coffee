#### class Message
#> Basic Message object for socket.io
class ApiHero.WebSock.Message extends ApiHero.WebSock.StreamModel
  # defines header as type message
  header:
    type:"Message"
    # overrides initialize
  initialize:->
    # insures header type is message
    @header.type = 'Message'
    # invokes super method
    Message.__super__.initialize.apply @, arguments
  # overrides save
  save:(to_room)->
    # insures room_id is set from user object value
    @header.room_id = to_room
    # tests for text, returns if empty
    return unless @attributes.text?.length and @header.room_id?
    # invokes super
    Message.__super__.save.apply @, arguments