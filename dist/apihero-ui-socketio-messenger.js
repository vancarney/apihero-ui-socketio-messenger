var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHero.WebSock.Message = (function(superClass) {
  extend(Message, superClass);

  function Message() {
    return Message.__super__.constructor.apply(this, arguments);
  }

  Message.prototype.header = {
    type: "Message"
  };

  Message.prototype.initialize = function() {
    this.header.type = 'Message';
    return Message.__super__.initialize.apply(this, arguments);
  };

  Message.prototype.save = function(to_room) {
    var ref;
    this.header.room_id = to_room;
    if (!(((ref = this.attributes.text) != null ? ref.length : void 0) && (this.header.room_id != null))) {
      return;
    }
    return Message.__super__.save.apply(this, arguments);
  };

  return Message;

})(ApiHero.WebSock.StreamModel);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHero.WebSock.Messages = (function(superClass) {
  extend(Messages, superClass);

  function Messages() {
    return Messages.__super__.constructor.apply(this, arguments);
  }

  Messages.prototype.model = ApiHero.WebSock.Message;

  Messages.prototype.add = function(attr, opts) {
    return Messages.__super__.add.call(this, attr, opts);
  };

  Messages.getInstance = function() {
    return this.__instance != null ? this.__instance : this.__instance = new this;
  };

  return Messages;

})(ApiHero.WebSock.StreamCollection);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHero.WebSock.ChatInput = (function(superClass) {
  extend(ChatInput, superClass);

  function ChatInput() {
    return ChatInput.__super__.constructor.apply(this, arguments);
  }

  ChatInput.prototype.template = templates['websock/chat-input'];

  ChatInput.prototype.events = {
    "submit": function(evt) {
      evt.preventDefault();
      this.sendMessage();
      return false;
    },
    "submit form": function(evt) {
      evt.preventDefault();
      this.sendMessage();
      return false;
    },
    "focus input[name=memo]": "keyboardOnHandler",
    "blur input[name=memo]": "keyboardOffHandler",
    "propertychange input[name=memo]": "changeHandler",
    "change input[name=memo]": "changeHandler",
    "keyup input[name=memo]": "keyUpHandler",
    "input input[name=memo]": "changeHandler",
    "paste input[name=memo]": "changeHandler",
    "click a.btn.submit": function(evt) {
      evt.preventDefault();
      this.sendMessage();
      return false;
    }
  };

  ChatInput.prototype.sendMessage = function() {
    var mssg;
    if (global.Util.isPhonegap()) {
      cordova.plugins.Keyboard.close();
    }
    if ((mssg = this.$('input[name=memo]').val()) != null) {
      this.model.set({
        text: mssg
      });
    }
    if (!(this.model.get('text'))) {
      return;
    }
    this.model.save();
    this.model.clear();
    this.$('input[name=memo]').val('');
    return this.$('a.btn.submit').addClass('disabled');
  };

  ChatInput.prototype.keyboardOnHandler = function(evt) {
    if (global.Util.isMobile()) {
      $('nav').addClass('hidden');
      this.$('.input-row').css({
        bottom: 0
      });
      return this.resize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  };

  ChatInput.prototype.keyboardOffHandler = function(evt) {
    if (global.Util.isMobile()) {
      $('nav').removeClass('hidden');
      this.$('.input-row').css({
        bottom: 50
      });
      return this.resize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  };

  ChatInput.prototype.keyUpHandler = function(evt) {
    var mssg;
    if (global.Util.isMobile() && (global.Util.isPhonegap() === false)) {
      if (evt.which === 13) {
        if ((mssg = this.$('input[name=memo]').val()) != null) {
          this.sendMessage(mssg);
        }
      }
      return $(evt.target).blur();
    }
  };

  ChatInput.prototype.changeHandler = function(evt) {
    var t;
    console.log('change');
    this.model.set({
      text: (t = $(evt.target).val())
    });
    return this.$('a.btn.submit')[(t.length ? 'remove' : 'add') + "Class"]('disabled');
  };

  ChatInput.prototype.init = function() {
    return this.model != null ? this.model : this.model = new ApiHero.WebSock.Message;
  };

  return ChatInput;

})(ApiHeroUI.core.View);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHero.WebSock.ChatItem = (function(superClass) {
  extend(ChatItem, superClass);

  function ChatItem() {
    return ChatItem.__super__.constructor.apply(this, arguments);
  }

  ChatItem.prototype.template = templates['websock/chat-item'];

  return ChatItem;

})(ApiHeroUI.core.View);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHero.WebSock.ChatMessageList = (function(superClass) {
  extend(ChatMessageList, superClass);

  function ChatMessageList() {
    return ChatMessageList.__super__.constructor.apply(this, arguments);
  }

  ChatMessageList.prototype.template = templates['websock/chat-message-list'];

  ChatMessageList.prototype.collection = ApiHero.WebSock.Messages.getInstance();

  ChatMessageList.prototype.messageHandler = function(data) {
    var itm, o;
    o = _.extend({}, {
      body: data.attributes
    }, {
      header: data.header
    });
    this.$el.append(itm = this.messageTemplate(o));
    return this.trigger('added-item', itm);
  };

  ChatMessageList.prototype.init = function() {
    return this.collection.on('add', this.messageHandler, this);
  };

  return ChatMessageList;

})(ApiHeroUI.core.View);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHero.WebSock.Messenger = (function(superClass) {
  extend(Messenger, superClass);

  function Messenger() {
    return Messenger.__super__.constructor.apply(this, arguments);
  }

  Messenger.prototype.tenplate = templates['socketio-messenger/chat-layout'];

  Messenger.prototype.subviews = {
    '#message-list': ApiHero.WebSock.ChatMessageList,
    '#message-input': ApiHero.WebSock.ChatInput
  };

  Messenger.prototype.init = function() {
    return this.messanger.on('add', this.messageHandler, this);
  };

  return Messenger;

})(ApiHeroUI.core.View);
/*
  use mincer compiler directives below to include dependencies
(=) require_tree ./models
(=) require_tree ./views
 */
;
