const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const todoGroupService = require('../../services/todoGroupService');
const todoGroupRepository = require('../../repositories/todoGroupRepository');
const userRepository = require('../../repositories/userRepository');
const todoItemRepository = require('../../repositories/todoItemRepository');

const mockTodoGroupCreateResult = require('../utils/mockTodoGroupCreateResult.json');
const mockUserSearchResult = require('../utils/mockUserSearchResult.json');
const mockTodoGroupSearchResult = require('../utils/mockTodoGroupSearchResult.json');
const mockUserTodoGroupDeletedResult = require('../utils/mockUserTodoGroupDeletedResult.json')

describe('todoGroupService Testing', () => {
    afterEach(() => {
        sinon.restore();
    })

    it('should create a new todoGroup', async function () {
        const creatorId = '60a014c28e0d92f2b9324f89';
        const todoGroupName = 'a new group';
        const todoGroupId = '60a017c621ef5df2f1e95d20';
        sinon.stub(todoGroupRepository, 'createANewTodoGroup')
            .withArgs(creatorId, todoGroupName)
            .resolves(mockTodoGroupCreateResult)
        sinon.stub(userRepository, 'findAUserAndAddTodoGroup')
            .withArgs(creatorId, todoGroupId)
            .resolves()

        const response = await todoGroupService.todoGroupCreateService(creatorId, todoGroupName);
        expect(response.status).equal(200);
        expect(response.body.todoGroup).equal(mockTodoGroupCreateResult);

    });

    it('should delete an exist todoGroup', async function () {
        const creatorId = '60a014c28e0d92f2b9324f89';
        const todoGroupId = '60a017c621ef5df2f1e95d20';
        sinon.stub(userRepository, 'findAUserById')
            .withArgs(creatorId)
            .resolves(mockUserSearchResult)
        sinon.stub(todoGroupRepository, 'findGroupById')
            .withArgs(todoGroupId)
            .resolves(mockTodoGroupSearchResult)
        sinon.stub(todoItemRepository, 'deleteByGroupId')
            .withArgs(todoGroupId)
        sinon.stub(userRepository, 'deleteAGroup')
            .withArgs(creatorId, todoGroupId)
            .resolves(mockUserTodoGroupDeletedResult)
        sinon.stub(todoGroupRepository, 'deleteByGroupId')
            .withArgs(todoGroupId)

        const response = await todoGroupService.todoGroupDeleteService(creatorId, todoGroupId);
        expect(response.status).equal(200);
        expect(response.body.updatedUser).is.not.null;
        expect(response.body.updatedUser).equal(mockUserTodoGroupDeletedResult);


    });
})

