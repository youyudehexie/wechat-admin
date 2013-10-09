module.exports = function(req, res, ok){ 
    if(!!req.session.user){
        req.query.user_id = req.session.user.id;
        ok(); 
    } else {
        res.send('Forbinden', 403);  
    } 
  
}
