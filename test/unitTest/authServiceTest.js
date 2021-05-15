const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const {userAuthService} = require('../../services/authService');
const userRepository = require('../../repositories/userRepository');
const mockUserSearchResult = require('../utils/mockUserSearchResult.json');


describe('userAuthService Testing', () => {

    it('should return a token when the username and password is matched', async () => {
        const email = 'rcai073@uottawa.ca';
        const password = 'cairui';
        sinon.stub(userRepository, 'findAUserByEmail')
            .withArgs(email)
            .resolves(mockUserSearchResult)

        const response = await userAuthService(email, password);
        expect(response.status).equal(200);
        expect(response.body.token).to.not.be.null;
    })

})

