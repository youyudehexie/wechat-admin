var url = require('url'),
    querystring = require('querystring'),
    crypto = require('crypto'),
    events = require('events'),
    emitter = new events.EventEmitter(),
    xml2js = require('xml2js');

var Wechat = function() {
}


//检验 token
Wechat.prototype.checkSignature = function(token, req, res) {
    var queryObj = querystring.parse(url.parse(req.url).query);
    var signature = queryObj.signature;
    var timestamp = queryObj.timestamp;
    var nonce = queryObj.nonce;
    var echostr = queryObj.echostr;

    var sha1 = crypto.createHash('sha1');
    var sha1Str = sha1.update([token, timestamp, nonce].sort().join('')).digest('hex');
        
    return res.send((sha1Str === signature) ? echostr : ''); 
}

//解析器
Wechat.prototype.toJSON = function(xml) {
  xml2js.parseString(xml, function (err, result) {
    if(err) {
        return new Error('xml format error');
    }

    var data = result.xml;
    var msg = {};
    msg.ToUserName = data.ToUserName[0];
    msg.FromUserName = data.FromUserName[0];
    msg.CreateTime = data.CreateTime[0];
    msg.MsgType = data.MsgType[0];

    switch(msg.MsgType) {
      case 'text' : 
        msg.Content = data.Content[0];
        msg.MsgId = data.MsgId[0];

        break;

      case 'image' : 
        msg.PicUrl = data.PicUrl[0];
        msg.MsgId = data.MsgId[0];

        break;

      case 'location' : 
        msg.Location_X = data.Location_X[0];
        msg.Location_Y = data.Location_Y[0];
        msg.Scale = data.Scale[0];
        msg.Label = data.Label[0];
        msg.MsgId = data.MsgId[0];
   
        break;

      case 'link' : 
        msg.Title = data.Title[0];
        msg.Description = data.Description[0];
        msg.Url = data.Url[0];
        msg.MsgId = data.MsgId[0];

        break;

      case 'event' : 
        msg.Event = data.Event[0];
        msg.EventKey = data.EventKey[0];

        break;
    }

    return msg;
  });
}

//监听文本信息
Wechat.prototype.text = function(callback) {
  emitter.on("text", callback);
  return this;
}

//监听图片信息
Wechat.prototype.image = function(callback) {
  emitter.on("image", callback);
  return this;
}

//监听地址信息
Wechat.prototype.location = function(callback) {
  emitter.on("location", callback);
  return this;
}

//监听链接信息
Wechat.prototype.link = function(callback) {
  emitter.on("link", callback);
  return this;
}

//监听事件信息
Wechat.prototype.event = function(callback) {
  emitter.on("event", callback);
  return this;
}

//监听所有信息
Wechat.prototype.all = function(callback) {
  emitter.on("text", callback);
  emitter.on("image", callback);
  emitter.on("location", callback);
  emitter.on("link", callback);
  emitter.on("event", callback);

  return this;
}

//将 js 组装成 xml
Wechat.prototype.toXML = function(data) {
  var msg = "" +
      "<xml>" +
      "<ToUserName><![CDATA[" + data.ToUserName + "]]></ToUserName>" +
      "<FromUserName><![CDATA[" + data.FromUserName + "]]></FromUserName>" +
      "<CreateTime>" + Date.now() + "</CreateTime>" +
      "<MsgType><![CDATA[" + data.MsgType + "]]></MsgType>" +
      "<FuncFlag>" + data.FuncFlag + "</FuncFlag>";

  switch(data.MsgType) {
    case 'text' : 
      msg += "" +
        "<Content><![CDATA[" + data.Content + "]]></Content>" +
        "</xml>";
      return msg;

    case 'music' :
      msg += "" +
        "<Music>" +
        "<Title><![CDATA[" + data.Title + "]]></Title>" +
        "<Description><![CDATA[" + data.Description + "]]></Description>" +
        "<MusicUrl><![CDATA[" + data.MusicUrl + "]]></MusicUrl>" +
        "<HQMusicUrl><![CDATA[" + data.HQMusicUrl + "]]></HQMusicUrl>" +
        "</Music>" +
        "</xml>";
      return msg;

    case 'news' : 
      var ArticlesStr = "";
      var ArticleCount = data.Articles.length;
      for (var i in data.Articles) {
        ArticlesStr += "" +
          "<item>" + 
          "<Title><![CDATA[" + data.Articles[i].Title + "]]></Title>" + 
          "<Description><![CDATA[" + data.Articles[i].Description + "]]></Description>" + 
          "<PicUrl><![CDATA[" + data.Articles[i].PicUrl + "]]></PicUrl>" + 
          "<Url><![CDATA[" + data.Articles[i].Url + "]]></Url>" + 
          "</item>";
      }

      msg += "<ArticleCount>" + ArticleCount + "</ArticleCount><Articles>" + ArticlesStr + "</Articles></xml>";
      return msg;
  }
}

//回复消息
Wechat.prototype.send = function(data) {
  RES.writeHead(200, {'Content-Type': 'text/plain'});
  RES.end(this.toXML(data));
  return RES;
}

module.exports = new Wechat();
