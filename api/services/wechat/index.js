var crypto = require('crypto');

var Wechat = function() {
}


//检验 token
Wechat.prototype.checkSignature = function(token, req, res) {

    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;

    var sha1 = crypto.createHash('sha1');
    var sha1Str = sha1.update([token, timestamp, nonce].sort().join('')).digest('hex');
        
    return res.send((sha1Str === signature) ? echostr : ''); 
}

module.exports = new Wechat();
