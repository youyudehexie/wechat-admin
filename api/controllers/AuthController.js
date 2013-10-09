/**
 * AuthController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var crypto = require('crypto');
var local = require('../../config/local');

// private
function gen_session(user, req, res) {
  var auth_token = encrypt(user.id + '\t' + user.name + '\t' + user.passwd + '\t' + user.email, local.cookie_secret);
  req.session.user = user;
  res.cookie(local.auth_cookie_name, auth_token, {path: '/', maxAge: 1000 * 60 * 60 * 24 * 30}); //cookie 有效期30天
}

function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

function decrypt(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

function randomString(size) {
  size = size || 6;
  var code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var max_num = code_string.length + 1;
  var new_pass = '';
  while (size > 0) {
    new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
    size--;
  }
  return new_pass;
}

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  status: function(req, res){
   
    if(!req.session.user){
        return res.send({user: {name: ''}, isLogin: false});
    } else {
        var user = req.session.user;
        return res.send({user: {name: user.name, id: user.id}, isLogin: true});
    }

  },

  signOut: function(req, res){
    req.session.user = null;
    res.clearCookie(local.auth_cookie_name, { path: '/' });
    res.redirect(req.headers.referer || '/');
  },

  signUp: function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var passwd = req.body.passwd;
  
    if(!name || !email || !passwd){
        return res.send({path: '/user/signup', error: 'argument error'},500);
    }
    var md5 = crypto.createHash('md5');
    md5.update(passwd);

    var addUser = function(){
        User.create({
          name: name,
          email: email,
          passwd: md5.digest('hex') 
        },function(err, user){
            if(err){
              return res.send({path: '/user/signup', error: err},500);       

            }
            gen_session(user, req, res);         
            return res.send({user: {name: user.name, id: user.id}, isExist: false})
        })

    }

    User.findOne({
        where: {
         or: [{name: name}, {email: email}]
        } 
    }).done(function(err, user){
      if(err){
        return res.send({path: '/user/signup', error: err},500);
      } 

      if(user){
        return res.send({user: {name: user.name, id: user.id}, isExist: true});
      } else {
        
        addUser();
      } 
    })
  },

  signIn: function(req, res){
    var name = req.body.name;
    var passwd = req.body.passwd;
 
    if(!name || !passwd){
        return res.send({path: '/user/signin', error: 'argument error'}, 500);  
    }
    

    var md5 = crypto.createHash('md5');
    md5.update(passwd);
 
    User.findOne({
      name: name,
      passwd: md5.digest('hex')  
    }).done(function(err, user){
       if(err){ 
        return res.send({path: '/user/signin', error: err});
       }
       
       if(user){
        gen_session(user, req, res);
        return res.send({user: {name: user.name, id: user.id}, isLogin: true});
       } else {
        return res.send({user: {name: ''}, isLogin: false});
       }
    
    });
    
  }

};
