/**
 * Rule
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
    name: {
        type: 'string',
        required: true,
        unique: true,
        maxLength: 15
    },

    type: {
        type: 'int',
        max: 255,
        defaultsTo: 0
    },
    pattern: {
        type: 'string',
        required: true
    },

    action: {
        type: 'string',
        defaultsTo: ''
    },
    state: {
        type: 'int'
    },
    user_id: {
        type: 'int'
    }
  }

};
