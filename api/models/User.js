/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
    name: {
        type: 'string',
        maxLength: 15,
        minLength: 1,
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

    
  }

};
