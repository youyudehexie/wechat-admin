
var WXSession = function(){ 
    this.sessionStore = {};
}

WXSession.prototype.set = function(key, val){
    this.sessionStore[key] = val;
}

WXSession.prototype.get = function(key){
    return this.sessionStore[key]; 
}

module.exports = new WXSession();

