/**
 * State
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
    state: {
        type: 'int',
        max: 255,
        min: 0,
        defaultsTo: 0
    },
    name: {
        type: 'string',
        maxLength: 15,
        required: true
    },
    rule_id: {
        type: 'int',
        defaultsTo: 0
    }
  }

};
