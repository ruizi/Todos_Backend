const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const todoItemRepository = require('../../repositories/todoItemRepository');
const userRepository = require('../../repositories/userRepository');
const todoService = require("../../services/todosService");

const mockTodoItemsFetchResult = require('../utils/mockTodoItemsFetchResult.json');
const mockTodoItemCreateResult = require('../utils/mockUserCreateResult.json');
const mockTodoItemUpdateUserSearchResult = require('../utils/mockTodoItemUpdateUserSearchResult.json')
const mockTodoItemUpdateResult = require('../utils/mockTodoItemUpdateResult.json');
const mockUserSearchResult = require('../utils/mockUserSearchResult.json');
const mockTodoItemSearchResult = require('../utils/mockTodoItemSearchResult.json')

describe('todosService Testing', () => {
    afterEach(() => {
        sinon.restore();
    })
    it('should return all todoItems belong to a user', async function () {
        const creatorId = '609c89ee482a379d71fcdfea';
        sinon.stub(todoItemRepository, 'findTodoItemsByCreatorId')
            .withArgs(creatorId)
            .resolves(mockTodoItemsFetchResult)

        const response = await todoService.todosFetchService(creatorId);
        expect(response.status).equal(200);
        expect(response.body.todoItems).is.not.null;
        expect(response.body.todoItems).equal(mockTodoItemsFetchResult);
    });

    it('should return a new todoItem', async function () {
        const creatorId = '609c89ee482a379d71fcdfea';
        const todoItemInfo = {
            title: 'a test todo Item',
            subTitle: 'a subTitle',
            description: 'testing',
            scheduleAt: "",
            repeatCircle: "",
        }
        sinon.stub(todoItemRepository, 'createANewTodoItem')
            .resolves(mockTodoItemCreateResult)
        sinon.stub(userRepository, 'findAUserAndAddTodoItems')
            .withArgs(creatorId, mockTodoItemCreateResult._id)

        const response = await todoService.createTodoItemService(creatorId, todoItemInfo);
        console.log(response)
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
        sinon.stub(userRepository, 'findAUserById')
            .withArgs(creatorId)
            .resolves(mockTodoItemUpdateUserSearchResult)
        sinon.stub(todoItemRepository, 'findTodoItemByIdAndUpdate')
            .resolves()
        sinon.stub(todoItemRepository, 'findTodoItemsByTodoId')
            .withArgs(newTodoItemInfo._id)
            .resolves(mockTodoItemUpdateResult)

        const response = await todoService.updateTodoItemService(creatorId, newTodoItemInfo)

        expect(response.status).equal(200);
        expect(response.body.updatedTodoItem).is.not.null;
        expect(response.body.updatedTodoItem).equal(mockTodoItemUpdateResult);
    });

    it('should delete an exist todoItem', async function () {
        const userId = '609c89ee482a379d71fcdfea';
        const todoId = '609d6f8818c821ab29669022';
        sinon.stub(userRepository, 'findAUserById')
            .withArgs(userId)
            .resolves(mockUserSearchResult)
        sinon.stub(todoItemRepository, 'findTodoItemsByTodoId')
            .withArgs(todoId)
            .resolves(mockTodoItemSearchResult)
        sinon.stub(userRepository, 'deleteATodoItemInTodoList')
            .withArgs(userId, todoId)
        sinon.stub(todoItemRepository, 'deleteATodoItemFromCollection')
            .withArgs(todoId)

        const response = await todoService.deleteTodoItemService(userId, todoId);
        expect(response.status).equal(200);
        expect(response.body.message).equal('TodoItem delete successfully');

    });

})