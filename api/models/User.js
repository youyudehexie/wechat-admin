/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

var crypto = require('crypto');
var hat = require('hat');

module.exports = {

  attributes: {
    name: {
        type: 'string',
        maxLength: 15,
        minLength: 1,
        index: true,
        required: true
    },

    email: {
        type: 'email',
        required: true
    },

    passwd: {
        type: 'string',
        required: true
    },
  	/* e.g.
  	nickname: 'string'
  	*/

   toJSON: function(){
    var obj = this.toObject();
    delete obj.passwd;
    return obj;
   }

  },


  // Lifecycle Callbacks
  afterCreate: function(user, next) {
    
    var auth_token = user.id + '\t' + user.name + '\t' + user.email + '\t' + user.passwd; 
    var mpid = crypto.createHash('md5').update(auth_token).digest('hex');
    var token = hat();    

    var newAccess = {
        mpid: mpid,
        token: token,
        user_id: user.id
    }
    Access.create(newAccess)
    .done(function(err, access){
        if(err) return next(err);
        next();
    }); 
  }

};
