/**
 * WechatController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var url = require('url');
var Wechat = require('../services/wechat'); 
var XmlParser = require('xml2json');
var TOKEN = '_ceshi'

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
            var token = access.token;
            return wechat.checkSignature(token, req, res);           
        });
    }

    if(req.method === 'POST'){
        var xml = req.body.test;
        try{ 
           var msg = JSON.parse(XmlParser.toJson(xml)).xml; 
        }
        catch(err){
            return res.send({path: '/wechat/mp', error: 'xml format error'}, 500); 
        }
        console.log(msg)
        return res.send(msg);
    } 
    
    res.send({path: '/wechat/mp', error: 'method error'}, 500);
     
  }

};
