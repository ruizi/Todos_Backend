const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const userService = require('../../services/userService');
const userRepository = require('../../repositories/userRepository');
const mockUserProfileSearchResult = require('../utils/mockUserProfileSearchResult.json');
const mockUserCreateResult = require('../utils/mockUserCreateResult.json');

describe('userService Testing', () => {
    it('should return user profile', async () => {
        const userId = '60a014c28e0d92f2b9324f89';
        sinon.stub(userRepository, 'findAUserByIdAndPopulate')
            .withArgs(userId)
            .resolves(mockUserProfileSearchResult)

        const response = await userService.userProfileService(userId);
        expect(response.status).equal(200);
        expect(response.body.profile).is.not.null;
        expect(response.body.profile._id).equal(userId);
    });

    it('should return user register successfully', async function () {

        const email = 'rcai080@uottawa.ca';
        const username = 'Dave';
        const password = 'Dave';

        sinon.stub(userRepository, 'findAUserByEmail')
            .withArgs(email)
            .resolves(null);
        sinon.stub(userRepository, 'creatANewUser')
            .withArgs(email, username, password)
            .resolves(mockUserCreateResult);

        const response = await userService.userRegisterService(email, username, password);
        expect(response.status).equal(200);
        expect(response.body.newUser).is.not.null;
        expect(response.body.newUser.email).equal(email);

    });
})