const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const todoItemRepository = require('../../repositories/todoItemRepository');
const userRepository = require('../../repositories/userRepository');
const todoItemService = require("../../services/todoItemsService");
const todoGroupRepository = require('../../repositories/todoGroupRepository');

const mockTodoItemsFetchResult = require('../utils/mockTodoItemsFetchResult.json');
const mockTodoItemCreateResult = require('../utils/mockTodoItemCreateResult.json');
const mockTodoItemUpdateUserSearchResult = require('../utils/mockTodoItemUpdateUserSearchResult.json')
const mockTodoItemUpdateResult = require('../utils/mockTodoItemUpdateResult.json');
const mockUserSearchResult = require('../utils/mockUserSearchResult.json');
const mockTodoItemSearchResult = require('../utils/mockTodoItemSearchResult.json')

describe('todoItemService Testing', () => {
    afterEach(() => {
        sinon.restore();
    })
    it('should return all todoItems belong to a user', async function () {
        const creatorId = '609c89ee482a379d71fcdfea';
        sinon.stub(todoItemRepository, 'findTodoItemsByCreatorId')
            .withArgs(creatorId)
            .resolves(mockTodoItemsFetchResult)

        const response = await todoItemService.todosFetchService(creatorId);
        expect(response.status).equal(200);
        expect(response.body.todoItems).is.not.null;
        expect(response.body.todoItems).equal(mockTodoItemsFetchResult);
    });

    it('should return a new todoItem', async function () {
        const creatorId = '609c89ee482a379d71fcdfea';
        const groupId = '60a017c621ef5df2f1e95d20';
        const newTodoItem = {
            title: 'a test todo Item',
            subTitle: 'a subTitle',
            description: 'testing',
            scheduleAt: "",
            repeatCircle: "",
            groupId: groupId
        }
        const todoItem = mockTodoItemCreateResult;
        sinon.stub(todoItemRepository, 'createANewTodoItem')
            .resolves(todoItem)
        sinon.stub(todoGroupRepository, 'findTheGroupAndAddTodoItems')
            .withArgs(groupId, todoItem._id)
            .resolves()

        const response = await todoItemService.createTodoItemService(creatorId, newTodoItem);
        expect(response.status).equal(200);
        expect(response.body.newTodoItem).equal(mockTodoItemCreateResult);

    });

    it('should update an exist todoItem', async function () {
        const creatorId = '609c89ee482a379d71fcdfea';
        const newTodoItemInfo = {
            isFinished: true,
            _id: '609f48373da2e8e25b49ff0b',
            creator: '609c89ee482a379d71fcdfea',
            title: 'a testing todo',
            createAt: '2021-05-13T03:39:21.989Z',
            scheduleAt: '2022-12-17T08:24:00.000Z',
            __v: 0
        }
        // sinon.stub(userRepository, 'findAUserById')
        //     .withArgs(creatorId)
        //     .resolves(mockTodoItemUpdateUserSearchResult)
        sinon.stub(todoItemRepository, 'findTodoItemsByTodoId')
            .withArgs(newTodoItemInfo._id)
            .resolves(mockTodoItemSearchResult)
        sinon.stub(todoItemRepository, 'findTodoItemByIdAndUpdate')
            .resolves(mockTodoItemUpdateResult)


        const response = await todoItemService.updateTodoItemService(creatorId, newTodoItemInfo)
        expect(response.status).equal(200);
        expect(response.body.updatedTodoItem).is.not.null;
        expect(response.body.updatedTodoItem).equal(mockTodoItemUpdateResult);
    });

    it('should delete an exist todoItem', async function () {
        const userId = '609c89ee482a379d71fcdfea';
        const todoId = '609d6f8818c821ab29669022';
        // sinon.stub(userRepository, 'findAUserById')
        //     .withArgs(userId)
        //     .resolves(mockUserSearchResult)
        sinon.stub(todoItemRepository, 'findTodoItemsByTodoId')
            .withArgs(todoId)
            .resolves(mockTodoItemSearchResult)
        sinon.stub(todoGroupRepository, 'deleteATodoItemInATodoGroup')
            .withArgs()
            .resolves()

        sinon.stub(todoItemRepository, 'deleteATodoItemFromCollection')
            .withArgs(todoId)

        const response = await todoItemService.deleteTodoItemService(userId, todoId);
        expect(response.status).equal(200);
        expect(response.body.message).equal('TodoItem delete successfully');

    });

})