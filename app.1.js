require('dotenv').config();

var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           =require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override")
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds")


//Requiring Routes:    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
    

    
console.log(process.env.DATABASEURL);
var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp_v18Delpoyed"
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // this means that we can leave off the '.ejs' for the landing page and other files we import.
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

//Seed the databse
//seedDB(); // removes all campgrounds from the database


//PASSPORT CONFIGURATION:
app.use(require("express-session")({
    secret: "Ive just added express sessions to my yelpcamp app",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){   // lets us access currentUser, and for eg the username, from every page
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); // needed to move on to the next code..
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes); // we have shorter route declarations by providing the prefix here..
app.use("/campgrounds", campgroundRoutes); // by adding "/campgrounds", we can remove '"/campgrounds"' from the campgrounds.js routes, as this will append it to the routes 



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp Server Has Started!");
});