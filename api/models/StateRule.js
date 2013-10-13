/**
 * StateRule
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
    
   rule_id: {
        type: 'int',
        requied: true
   },
   state_id: {
        type: 'int',
        required: true
   }
  }

};
