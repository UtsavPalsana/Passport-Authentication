const LocalStrategy = require('passport-local').Strategy;
const { User }  = require('./database.js');
exports.initializingPassport = (passport) => {
    passport.use(new LocalStrategy(async(username, password, done) =>{
        try {
            const user = await User.findOne({username});

        if(!user) return  done(null, false); // No user

        if(user.password  !== password) return done(null, false);// Wrong Password

        return done(null, user);
        }
        catch (error){
            return done(error, false);
        } 
    }));
    passport.serializeUser((user, done)=>done(null, user.id));
    passport.deserializeUser(async(id, done)=>{ 
        try{
            const user = await  User.findById(id);

            done (null, user);
        } catch (error) {
            done(error, false);
        }
    
    })
}



exports.isAunthenticated = (req, res, done) =>
{
    if(req.user) return done();
    res.redirect("/login");
    
};