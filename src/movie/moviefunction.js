const ActorMovie = require("./actormovietable");
const Actor = require("./actortable");
const Movie = require("./movietable");

exports.createMovie = async (movieObj) => {
    try {
        const checkForMovie = await Movie.findOne({where:{title:movieObj.title}});
        let newMovie={};  // beacause of scope
        if (checkForMovie == null){
            console.log("Entering create / add Movie")
            newMovie = await Movie.create({title:movieObj.title, director:movieObj.director, addedBy:movieObj.addedBy})
            console.log("New Movie Created",newMovie);
        } else {
            newMovie = await Movie.findOne({where:{title:movieObj.title}});
        }

        const checkForActor = await Actor.findOne({where:{name:movieObj.actor}});
        let newActor = {};
        if (checkForActor == null){
            console.log("Entering Actor Add")
            newActor = await Actor.create({name:movieObj.actor, info: movieObj.info})
        }

        if (newActor != {} || newMovie !={}){
            console.log("Entering Actor/Movie Add");
            await ActorMovie.create({MovieId: newMovie.id, ActorId: newActor.id})
        }
    } catch (error) {
        console.log(error);
    }
};