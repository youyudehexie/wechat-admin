/**
 * Session
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
    openid: {
        type: 'string',
        required: true,
        index: true
    },
    state: {
        type: 'int',
        defaultsTo: 0
    }

  }

};
