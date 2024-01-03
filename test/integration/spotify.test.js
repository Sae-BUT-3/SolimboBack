'use strict';
const Hapi = require('@hapi/hapi');
const User = require("../../lib/domain/model/User")
const bcrypt = require("bcrypt");
let server
const mockUserRepository = {}
const mockSpotifyRepository = {}
mockUserRepository.getUsersByPseudo = jest.fn((pseudo) =>{return []})
mockSpotifyRepository.getSpotifySearchList = jest.fn((query, filter, limitSize) =>{return {}})
mockSpotifyRepository.getSpotifyArtist = jest.fn((id) =>{return {}}) // mock la fct de repo 

describe('spotify route', () => {

    beforeEach(async () => {
        server = Hapi.server({
            port: process.env.PORT || 3000
        });
        await server.register([
            require('../../lib/interfaces/routes/spotify'),
        ]);
        server.app.serviceLocator = {
            userRepository: mockUserRepository,
            spotifyRepository:mockSpotifyRepository
        }
    });
    afterEach(async () => {
        await server.stop();
    });
    describe("/spotify/search", ()=>{
        it('should respond code 400 invalid query', async () => {
            const res1 = await server.inject({
                method: 'GET',
                url: `/spotify/search?query=${"a".repeat(51)}&spotify_filter=trddzack&allow_user=true&limit=10`,
            });
            expect(res1.statusCode).toBe(400);
        });
        it('should respond code 400 invalid spotify_filter', async () => {
            const res1 = await server.inject({
                method: 'GET',
                url: `/spotify/search?query=query&spotify_filter=trddzack&allow_user=true&limit=10`,
            });

            expect(res1.statusCode).toBe(400);
        });
        it('should respond code 400 invalid allow_user', async () => {
            const res1 = await server.inject({
                method: 'GET',
                url: `/spotify/search?query=query&spotify_filter=track&allow_user=dsd&limit=10`,
            });

            expect(res1.statusCode).toBe(400);
        });
        it('should respond code 400 invalid limit', async () => {
            const res1 = await server.inject({
                method: 'GET',
                url: `/spotify/search?query=query&spotify_filter=track&allow_user=true&limit=cez`,
            });
            expect(res1.statusCode).toBe(400);
        });

        it('should respond code 200', async () => {
            const allowedValues = ["track","artist","album"]
            const getAllSubset = (array) =>{
                const n = array.length;
                const allSubsets = [];

                // Generate all possible combinations using binary representation
                for (let i = 0; i < Math.pow(2, n); i++) {
                    const subset = [];
                    for (let j = 0; j < n; j++) {
                        if ((i & (1 << j)) > 0) {
                            subset.push(array[j]);
                        }
                    }
                    allSubsets.push(subset);
                }
                return allSubsets;
            }
            const subset = getAllSubset(allowedValues)
            for(let i =1; i<subset.length ; ++i){
                let res1 = await server.inject({
                    method: 'GET',
                    url: `/spotify/search?query=query&spotify_filter=${subset[i].join(",")}&allow_user=true&limit=10`,
                });
                expect(res1.statusCode).toBe(200);
            }
        });
    }),
    

    describe("/spotify/FetchArtist", ()=>{
        it('should respond code 400 invalid query/id', async () => {
            const res1 = await server.inject({
                method: 'GET',
                url: `/spotify/fetchArtist?query=`,
            });
            expect(res1.statusCode).toBe(400);
        });
        it('should respond code 200', async () => {
            const res1 = await server.inject({
                method: 'GET',
                url: `/spotify/fetchArtist?query=query`,
            });
            expect(res1.statusCode).toBe(200);
        });
    })
});
