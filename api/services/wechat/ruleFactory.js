var RuleFactory = function(msg, rules){
    console.log('fewfewf');
    this.rules = rules || [];
    this.msg = msg;
    console.log('fuck');
    console.log(msg, rules);
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
        console.log(rule);
        result = rule.update(this.msg); 
        if(result) break;
    }

    return result;

}

module.exports = RuleFactory;
