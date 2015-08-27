
;

;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHero.WebSock.ChatInput = (function(superClass) {
  extend(ChatInput, superClass);

  function ChatInput() {
    return ChatInput.__super__.constructor.apply(this, arguments);
  }

  ChatInput.prototype.template = templates['websock/chat-input'];

  ChatInput.prototype.events = {
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
    if ((mssg = this.$('input[name=memo]').val()) != null) {
      return this.trigger('send', mssg);
    }
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
    var o;
    console.log('messageHandler:');
    console.log(data);
    o = _.extend({}, data.attributes, data.header.__user);
    return this.$el.append(this.messageTemplate(o));
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

  Messenger.prototype.sendMessage = function(mssg) {
    if (global.Util.isPhonegap()) {
      cordova.plugins.Keyboard.close();
    }
    if (mssg) {
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

  Messenger.prototype.childrenComplete = function() {
    return this['#messages-input'].on('send', this.sendMessage, this);
  };

  Messenger.prototype.init = function() {
    var _oHeight;
    _oHeight = 0;
    if (this.model == null) {
      this.model = new ApiHero.WebSock.Message;
    }
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
