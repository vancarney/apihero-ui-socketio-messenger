
;

;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.WebSock.ChatInput = (function(superClass) {
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

})(ApiHero.core.View);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.WebSock.ChatItem = (function(superClass) {
  extend(ChatItem, superClass);

  function ChatItem() {
    return ChatItem.__super__.constructor.apply(this, arguments);
  }

  ChatItem.prototype.template = templates['websock/chat-item'];

  return ChatItem;

})(ApiHero.core.View);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.WebSock.ChatMessageList = (function(superClass) {
  extend(ChatMessageList, superClass);

  function ChatMessageList() {
    return ChatMessageList.__super__.constructor.apply(this, arguments);
  }

  ChatMessageList.prototype.template = templates['websock/chat-message-list'];

  ChatMessageList.prototype.collection = ApiHeroUI.WebSock.Messages.getInstance();

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

})(ApiHero.core.View);var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ApiHeroUI.WebSock.ChatView = (function(superClass) {
  extend(ChatView, superClass);

  function ChatView() {
    return ChatView.__super__.constructor.apply(this, arguments);
  }

  ChatView.prototype.subviews = {
    '#messages-list': ApiHeroUI.WebSock.ChatMessageList,
    '#messages-input': ApiHeroUI.WebSock.ChatInput
  };

  ChatView.prototype.sendMessage = function(mssg) {
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

  ChatView.prototype.render = function() {
    ChatView.__super__.render.call(this);
    if (global.Util.isPhonegap()) {
      return this.$('#messages').addClass('pg-margin');
    }
  };

  ChatView.prototype.resize = function(d) {
    var mrgn, offset;
    return;
    if (d == null) {
      return;
    }
    mrgn = (this.$('#messages').css('margin-top')) || 0;
    if (typeof mrgn === 'string') {
      mrgn = parseInt(mrgn.replace('px', ''));
    }
    offset = $('nav').css('display') === 'none' ? 85 : 100;
    offset = offset - (global.Util.isPhonegap() ? 23 : 0);
    return this.$('#messages').height(d.height - (offset + mrgn));
  };

  ChatView.prototype.init = function() {
    var _oHeight;
    _oHeight = 0;
    this.model = new yungcloud.Message;
    this.messanger.on('add', this.messageHandler, this);
    window.addEventListener('native.keyboardshow', (function(_this) {
      return function() {
        _oHeight = _this.$('#messages').height();
        return _this.$('#messages').css('height', _oHeight + 50);
      };
    })(this));
    return window.addEventListener('native.keyboardhide', (function(_this) {
      return function() {
        return _this.$('#messages').css('height', _oHeight + 2);
      };
    })(this));
  };

  return ChatView;

})(ApiHeroUI.core.View);
/*
  use mincer compiler directives below to include dependencies
(=) require_tree ./models
(=) require_tree ./views
 */
;
