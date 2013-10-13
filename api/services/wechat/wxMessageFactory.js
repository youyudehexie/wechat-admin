var XmlParser = require('xml2json');

var RuleFactory = function(msg, rules){
    this.rules = rules || [];
    this.msg = msg;
}


RuleFactory.prototype.registerRule = function(rule){
    this.rules.push(rule);
}

RuleFactory.prototype.removeRule = function(rule){
    
    var i = this.rules.indexOf(rule);

    if(i >= 0){
        rules.splice(i, 1); 
    }
}


RuleFactory.prototype.traverRules = function(){
    var action = ''
    var rules = this.rules;
    var length = rules.length;
    
    for(var i = 0; i < length; i++ ){
        var rule = rules[i];
        result = rule.update(this.msg); 
        if(result) break;
    }

    return result;

}

var Rule = function(rule){
    this.rule = rule;
};


Rule.prototype.update = function(msg){
    var content = msg.Content;
    var type = msg.MsgType;
 
    if(content == this.rule.pattern){
        return this.rule 
    }   
     
    return null;
}

var WXMessageFactory = function(msg, rules, state){ 
    this.msg = msg;
    this.rules = rules;
    this.state = state;
    
}

WXMessageFactory.prototype.exec = function(){

    this.prepare();
    
    var rule = this.ruleFactory.traverRules();

    var result = this.createResponse(rule); 
    return result;
} 

WXMessageFactory.prototype.prepare = function(){
    this.ruleFactory = new RuleFactory(this.msg);
    var ruleFactory = this.ruleFactory; 
    var rules = this.rules;
    var length = rules.length;

    for(var i=0; i < length; i++){
        ruleFactory.registerRule(new Rule(rules[i])); 
    }

} 

WXMessageFactory.prototype.createResponse = function(rule){

    var defaultRule = function(rules, state){
        var length = rules.length; 
        for(var i = 0; i < length; i++){
            if(rules[i].state == state){
                console.log(rules[i]);
                return rules[i]; 
            } 
        }
    }
    console.log(this.state);

    if(!rule){
        var rule = defaultRule(this.rules, this.state)     
    }

    var msg = "" +
      "<xml>" +
      "<ToUserName><![CDATA[" + this.msg.ToUserName + "]]></ToUserName>" +
      "<FromUserName><![CDATA[" + this.msg.FromUserName + "]]></FromUserName>" +
      "<CreateTime>" + parseInt(Date.now()/1000) + "</CreateTime>" +
      "<MsgType><![CDATA[text]]></MsgType>" +
      "<Content><![CDATA[" + rule.action + "]]></Content>"

    return [msg, rule.state];
}
module.exports = WXMessageFactory;
