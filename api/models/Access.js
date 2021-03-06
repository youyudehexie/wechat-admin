/**
 * Access
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */


module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    
    user_id: {
        type: 'int',
        required: 'true' 
    },
    mpid: {
        type: 'string',
        index: 'true',
        required: 'true'
    }, 
    status: {
        type: 'int',
        defaultsTo: 0
    },
    token: {
        type: 'string',
        required: 'true'
    }
  }

};
