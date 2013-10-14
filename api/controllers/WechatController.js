/**
 * WechatController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var url = require('url');
var Wechat = require('../services/wechat'); 
var XmlParser = require('xml2json');
var WXSession = require('../services/wechat/session');
var WXMessageFactory = require('../services/wechat/wxMessageFactory');

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  
  mp: function(req, res){
    var mpid = req.params.id;

    if(!mpid){
        return res.send({path: '/wechat/mp', error: 'argument error'}, 500);
    }
   
    if(req.method === 'GET'){
        Access.findOne({
            mpid: mpid    
        }).done(function(err, access){
            if(err){
                return res.send({path: '/wechat/mp', error: err}, 500); 
            }
            if(!access) return res.send({path: '/wechat/mp', error: 'fobbin to access'}, 500);
            
            var token = access.token;
            access.status = 1;
            access.save(function(err){
                if(err) return res.send({path: '/wechat/mp', error: err}, 500);
                return Wechat.checkSignature(token, req, res);           
            })
        });
    }

    if(req.method === 'POST'){
        
        var xml = req.rawBody;
        try{ 
           var msg = JSON.parse(XmlParser.toJson(xml)).xml; 
           var openId = msg.FromUserName;
        }
        catch(err){
            return res.send({path: '/wechat/mp', error: 'xml format error'}, 500); 
        }       

        var rules = [];
        var sessionState = WXSession.get(openId); 

        var getRulesFromState = function(msg, stateId){
            return StateRule.find({state_id: stateId}).then(function(stateRules){
                return stateRules;  
            })
            .then(function(stateRules){
                var result;
                stateRules.forEach(function(stateRule){
                    result = Rule.findOne({id: stateRule.rule_id}).then(function(rule){
                        if(rule) rules.push(rule);
                        return rule;
                    }); 
                    
                });
                return msg;
            })
            .then(function(msg){
                var wxMessageFactory = new WXMessageFactory(msg, rules, stateId);
                var wxsession = wxMessageFactory.exec();

                WXSession.set(openId, wxsession);

                res.send(wxsession); 
            }).fail(function(err){
                console.log(err); 
            })        
        
        }

        if(!sessionState){
             
            var access = Access.findOne({mpid: mpid})
            .then(function(access){
                return State.findOne({user_id: access.user_id}).then(function(state){
                    return state; 
                }); 
            })
            .then(function(state){
                getRulesFromState(msg, state.id)
            }, function(err){
                console.log(err); 
            })
 
        } else {
            getRulesFromState(msg, sessionState);
        }


      //  return res.send(msg);
        
    } 
     
  }

};
