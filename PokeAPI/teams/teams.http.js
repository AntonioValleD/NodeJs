const axios = require('axios');
const to = require('../tools/to');


// Controllers
const usersController = require('../auth/users.controller');
const teamsController = require('./teams.controller');

const getTeamOfUser = async (req, res) => {
    // Check that userToken correspond to a registered user
    try {
        await usersController.checkUserToken(req.user);
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'});
    }

    let userTeam = await teamsController.getUserTeam(req.user.userId);
    res.status(200).json({
        trainer: req.user.userName, 
        team: userTeam
    });
};

const setTeamOfUser = async (req, res) => {
    // Check that userToken correspond to a registered user
    try {
        await usersController.checkUserToken(req.user);

    } catch (error) {
        return res.status(401).json({message: 'Invalid token'});
    }
    
    try {
        await teamsController.setUserTeam(req.user.userId, req.body.team);
        return res.status(201).json({message: 'Team successfully set up'});
    } catch (error) {
        return res.status(error.statusCode).json({message: error.message});
    }
};

const addPokemonToUserTeam = async (req, res) => {
    // Check that userToken correspond to a registered user
    try {
        await usersController.checkUserToken(req.user);
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'});
    }

    let pokemonName = req.body.pokemonName;
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then(async function (response) {
            // handle success
            let pokemon = {
                pokemonName: pokemonName, 
                pokeId: response.data.id
            };
            try {
                await teamsController.addPokemon(req.user.userId, pokemon);
                return res.status(201).json({message: 'Pokemon added successfully'});
            } catch (error) {
                // If no pokemon data is provided
                return res.status(error.statusCode).json({message: error.message});
            }
        })
        .catch(function (error) {
            // handle error
            return res.status(400).json({message: error});
        })
        .finally(function () {
            // always executed
        });
};

const deletePokemonOfUserTeam = async (req, res) => {
    // Check that userToken correspond to a registered user
    try {
        await usersController.checkUserToken(req.user);
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'});
    }

    try {
        await teamsController.deletePokemon(req.user.userId, req.params.pokeId);
        res.status(200).json({message: 'Pokemon deleted successfuly'});
    } catch (error) {
        return res.status(400).json({message: 'Pokemon not found'});
    }
};


exports.getTeamOfUser = getTeamOfUser;
exports.setTeamOfUser = setTeamOfUser;
exports.addPokemonToUserTeam = addPokemonToUserTeam;
exports.deletePokemonOfUserTeam = deletePokemonOfUserTeam;