const usersController = require('../auth/users.controller');

// Models
const TeamModel = require('../connect.db').TeamModel;

let teamsDatabase = {};

const bootstrapTeam = (userId) => {
    return new Promise((resolve, reject) => {
        let newTeam = new TeamModel({
            userId: userId,
            team: []
        });
        newTeam.save().then(() => console.log('Team saved'))
        resolve();
    });
};

const cleanUpTeamDatabase = () => {
    return new Promise((resolve, reject) => {
        teamsDatabase = {};
        resolve();
    });
};

const cleanUpTeam = () => {
    return new Promise(async (resolve, reject) => {
        await TeamModel.deleteMany({}).exec();
        resolve();
    });
};

const setUserTeam = (userId, userTeam) => {
    return new Promise(async (resolve, reject) => {
        if (!userTeam){
            // userTeam must not be undefined
            reject({message: 'Missing data', statusCode: 400});
        } else if (userTeam.length > 6) {
            // userTeam must not have more than 6 pokemons
            reject({message: 'Team must not have more than 6 pokemons', statusCode: 409});
        }
        TeamModel.updateOne({userId: userId, team: userTeam}).exec();;
        resolve();
    });

};

const addPokemon = (userId, pokemon) => {
    return new Promise(async (resolve, reject) => {
        if (!pokemon || !pokemon.pokemonName){
            // Pokemon object must exist and have pokemonName value
            reject({message: 'Missing data', statusCode: 400});
        }
        let team =(await TeamModel.findOne({userId: userId}).exec()).team;
        if (team.length == 6){
            // Teams must not have more than 6 pokemons
            reject({message: 'Exceding team capacity', statusCode: 409});
        } else {
            team.push(pokemon);
            TeamModel.updateOne({userId: userId, team: team}).exec();
            resolve();
        }
    });
};

const getUserTeam = (userId) => {
    return new Promise(async (resolve, reject) => {
        let team = (await TeamModel.findOne({userId: userId}).exec()).team;
        resolve(team);
    });
};

const deletePokemon = (userId, pokeId) => {
    return new Promise(async (resolve, reject) => {
        if (!pokeId){
            // pokeId object must exist
            reject();
        }
        let team = (await TeamModel.findOne({userId: userId}).exec()).team;
        count = 0;
        for (let pokemon of team){
            if (pokemon.pokeId == pokeId){
                team.splice(count, 1);
                TeamModel.updateOne({team: team}).exec();
                resolve();
            }
            count ++;
        }
        reject();
    });
};


exports.bootstrapTeam = bootstrapTeam;
exports.cleanUpTeamDatabase = cleanUpTeamDatabase;
exports.cleanUpTeam = cleanUpTeam;
exports.addPokemon = addPokemon;
exports.setUserTeam = setUserTeam;
exports.getUserTeam = getUserTeam;
exports.deletePokemon = deletePokemon;