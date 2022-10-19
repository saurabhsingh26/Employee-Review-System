
const User = require('../models/users');
const Review = require('../models/review');


module.exports.create = async function(req, res){

    try {

        if(req.body.password != req.body.confirm_password){
            req.flash('error','Password did not');
            return res.redirect('/users/sign-up');
        }

        let user = await User.findOne({ email : req.body.email });

        if(user){
            req.flash('error','User already exists');
            return res.redirect('/users/sign-in');
        }else{
            await User.create({
                name : req.body.name,
                email : req.body.email,
                isAdmin : false,
                password : req.body.password
            });
            
            req.flash('success','Logged In Successfully');
            
            return res.redirect('/');
        }
    
    } catch (error) {
        console.log('error while creating user', error);
        return res.redirect('/users/sign-up');
    }
    
}




module.exports.createSession = function(req, res){
    req.flash('success','Logged In Successfully');
    return res.redirect('/');
}


module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success','Logged Out Successfully');
    return res.redirect('/users/sign-in');
}




module.exports.signIn = function(req, res){
    
    if(req.isAuthenticated()){
        return res.render('home', {
            title : "Home"
        });
    }
    return res.render('user_sign_in', {
        title : "Login"
    });
}



module.exports.signUp = function(req, res){

    if(req.isAuthenticated() && req.user.isAdmin){
        return res.render('user_sign_up', {
            title : "Sign Up"
        });
    }

    if(req.isAuthenticated()){
        return res.render('home', {
            title : "Home"
        });
    }
    
    return res.render('user_sign_up', {
        title : "Sign Up"
    });
    
}

// home
module.exports.home = async function(req, res){

    try {
        if(!req.isAuthenticated()){
            return res.redirect('/users/sign-in');
        }

        let user = await User.findById(req.user.id);
        let review = await Review.find({to : req.user.id});
        

        let recipients = [];

        for(let i = 0; i < user.to.length; i++){
            let x = await User.findById(user.to[i]);
            recipients.push(x);
        }

        // find reviews
        let reviews = [];

        for(let i = 0; i < review.length; i++){
            let x = await User.findById(review[i].from);
            

            let curr_review = {
                name : x.name,
                review : review[i].review,
                updated : review[i].updatedAt,
            };
            reviews.push(curr_review);
        }

        return res.render('home', {
            title : "Home",
            recipients: recipients,
            reviews: reviews,
            user : user,
        });

    }catch(error) {
        console.log(error);
        return;
    }
    
}
