/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */


module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
    
 status: function(req, res){
   
    if(!req.session.user){
        return res.send({path: '/user/status', error: 'session is not exist'}); 
    } else {
        var user = req.session.user;
        return res.send({user: {name: user.name}, isLogin: true});
    }
 
 }
 
};
