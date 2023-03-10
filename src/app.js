const yargs = require("yargs");
const {sequelize} = require ("./db/connection");
const {createMovie} = require ("./movie/moviefunction");
const Movie = require("./movie/movietable");
const Actor = require("./movie/actortable");
const ActorMovie = require("./movie/actormovietable");

async function app(yargsInput) {
    await sequelize.sync({});
    if (yargsInput.create) {
      //place code to create a movie here
      console.log("Entering create"); 
      await createMovie({
        title: yargsInput.title,
        actor: yargsInput.actor,
        director: yargsInput.director,
        addedby: yargsInput.addedby
      });
      console.log("Created Movie");

    } else if (yargsInput.read) {
      //place code to list all our movies here
      const results = await sequelize.query("SELECT title, name, director, addedby FROM Movies JOIN ActorMovies ON Movies.id=ActorMovies.MovieId JOIN Actors ON Actors.id=ActorMovies.ActorId;"); 
      // console.log(results);
        for (let index = 0; index < results[0].length; index++) {
          const element = results[0][index];
          console.log(`${element.title} Staring ${element.name} Directed by ${element.director} Added By ${element.addedby}`);
        }

    } else if (yargsInput.updateActor) {
      //place code to update actor field here
      // use findOne() to find title want updated then Set() method to change value of actor, then call the save() method.
      // /Check if the actor already exists (findOne)
      //If the actor does not exist add them to the actor table
      //Delete(destroy) the existing relationship in the ActorMovie table
      //Get the Movie Id from the Movie table
      //Get the actor id from the actor table
      //create a new entry in the actormovie table with above
      const mymovieid = await Movie.findOne({ where: { title : yargsInput.title } });
      await ActorMovie.destroy ({where:{MovieId:mymovieid.id}});
      const checkForActor = await Actor.findOne({where:{name:yargsInput.actor}});
      let newActor = {};  // because of scope
      if (checkForActor == null){
          console.log("Entering Actor Add");
          newActor = await Actor.create({name: yargsInput.actor, info: yargsInput.info});
      }
      const myactorid = await Actor.findOne({where:{name:yargsInput.actor}});
      await ActorMovie.create ({MovieId:mymovieid.id, ActorId:myactorid.id});

    } else if (yargsInput.updateAddedBy) {
      //place code to update who added movie goes here
      const newaddedby = await Movie.findOne({ where: { title : yargsInput.title } });
        if (newaddedby) {
          newaddedby.addedby= yargsInput.addedby
          await newaddedby.save();
          console.log ("Updated who added Movie Successfully");
        } else {
          console.log("Movie not found");
        }

    } else if (yargsInput.updateDirector) {
      //place code to update director field here
      const newDirector = await Movie.findOne({ where: { title : yargsInput.title } });
        if (newDirector) {
          newDirector.director= yargsInput.director
          await newDirector.save();
          console.log ("Updated Movie Director Successfully");
        } else {
          console.log("Movie not found");
        }

    } else if (yargsInput.delete) {
      //place code to delete a movie from our table here
      const deleteMovie = await Movie.findOne({ where: { title : yargsInput.title } });
        if (deleteMovie ) {
          deleteMovie.title= yargsInput.title
          await deleteMovie.destroy();
          console.log("Movie Successfully Deleted")
        } else {
          console.log("Movie not found");
        }  
    } else {
      console.log("Unrecognized Yargs command");
    }
    await sequelize.close();
}

app(yargs.argv);