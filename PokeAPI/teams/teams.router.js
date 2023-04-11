const express = require('express');
const router = express.Router();

// Teams http functions
const teamsHttpHandler = require('./teams.http');


// Team routes
router.route('/')
    // Get team route
    .get(teamsHttpHandler.getTeamOfUser)

    // Put team route
    .put(teamsHttpHandler.setTeamOfUser);

router.route('/pokemon')
    // Add pokemon route
    .post(teamsHttpHandler.addPokemonToUserTeam);

router.route('/pokemon/:pokeId')
    // Delete pokemon route
    .delete(teamsHttpHandler.deletePokemonOfUserTeam)

exports.router = router;