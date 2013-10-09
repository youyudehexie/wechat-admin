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

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  
  mp: function(req, res){
    var mpid = req.params.id;

    console.log(req.rawBody);
    if(!mpid){
        return res.send({path: '/wechat/mp', error: 'argument error'}, 500);
    }
   
    if(req.method === 'GET'){
        console.log(req.query);
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
       

        var state = WXSession.get(openId);
        if(!state){
            WXSession.set(openId, 0); 
            state = 0;
        }



        return res.send(msg);
        
    } 
     
  }

};
