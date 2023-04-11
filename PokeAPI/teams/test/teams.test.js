const usersController = require('../../auth/users.controller');
const teamsController = require('../../teams/teams.controller');
let user1 = {userName: 'team1', password: '2222'};
usersController.addUser(user1.userName, user1.password);


const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app').app;
chai.use(chaiHttp);

describe('Teams testing', () => {
    it ('Sould return 201 for successful team set up', (done) => {
        let team = [{pokemonName: 'pk1'}, {pokemonName: 'pk2'}];
        chai.request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send(user1)
            .end((err, res) => {
                let token = res.body.token;
                chai.request(app)
                    .put('/team')
                    .set('Authorization', `JWT ${token}`, 
                        'Content-Type', 'application/json')
                    .send({team: team})
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 201);
                        done();
                    });
            });
    });
    it ('Sould return 409 when team exceds capacity', (done) => {
        let team = [
            {pokemonName: 'pk1'}, 
            {pokemonName: 'pk2'},
            {pokemonName: 'pk3'}, 
            {pokemonName: 'pk4'},
            {pokemonName: 'pk5'}, 
            {pokemonName: 'pk6'},
            {pokemonName: 'pk7'}, 
            {pokemonName: 'pk8'}
        ];
        chai.request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send(user1)
            .end((err, res) => {
                let token = res.body.token;
                chai.request(app)
                    .put('/team')
                    .set('Authorization', `JWT ${token}`, 
                        'Content-Type', 'application/json')
                    .send({team: team})
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 409);
                        done();
                    });
            });
    });
    it ('Sould return 200 and the team of the specified user', (done) => {
        let team = [{pokemonName: 'pk5'}, {pokemonName: 'pk4'}];
        chai.request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send(user1)
            .end((err, res) => {
                let token = res.body.token;
                chai.request(app)
                    .put('/team')
                    .set('Authorization', `JWT ${token}`, 
                        'Content-Type', 'application/json')
                    .send({team: team})
                    .end((err, res) => {
                        chai.request(app)
                            .get('/team')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, user1.userName);
                                done();
                            });
                    });
            });
    });
    it ('Sould return 200, the team and the itemId of the specified user', (done) => {
        let pokemonName = 'Bulbasaur';
        chai.request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send(user1)
            .end((err, res) => {
                let token = res.body.token;
                chai.request(app)
                    .post('/team/pokemon')
                    .set('Authorization', `JWT ${token}`, 
                        'Content-Type', 'application/json')
                    .send({pokemonName: pokemonName})
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 201);
                        chai.request(app)
                            .get('/team')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, user1.userName);
                                done();
                            });
                    });
            });
    });
    it ('Sould return 200 when deleted is done', (done) => {
        let pokemonName = 'Pikachu';
        let pokeId = 1;
        chai.request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send(user1)
            .end((err, res) => {
                let token = res.body.token;
                chai.request(app)
                    .post('/team/pokemon')
                    .set('Authorization', `JWT ${token}`, 
                        'Content-Type', 'application/json')
                    .send({pokemonName: pokemonName})
                    .end((err, res) => {
                        chai.request(app)
                            .delete(`/team/pokemon/${pokeId}`)
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.assert.equal(res.statusCode, 200);
                                chai.request(app)
                                    .get('/team')
                                    .set('Authorization', `JWT ${token}`)
                                    .end((err, res) => {
                                        chai.assert.equal(res.statusCode, 200);
                                        chai.assert.equal(res.body.trainer, user1.userName);
                                        done();
                                    });
                            });
                    });
            });
    });
});

after(async () => {
    await usersController.cleanUpUsers();
    await teamsController.cleanUpTeam();
});



/*

{
    "team": [
        {"pokemonName": "pk1", "pokeId": 1},
        {"pokemonName": "pk2", "pokeId": 2},
        {"pokemonName": "pk3", "pokeId": 3}]
}

{
    "userName": "Antonio",
    "password": "4815"
}

{
    "pokemonName": "Pikachu"
}*/