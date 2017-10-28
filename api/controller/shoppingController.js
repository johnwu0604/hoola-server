var UUID = require('uuid/v1')
var ShoppingItem = require('../model/shoppingItem')
var shoppingService = require('../service/shoppingService')

module.exports = {

    /**
     * Retrieve all the shopping items for a user
     *
     * @param req
     * @param done
     */
    getUserShoppingItems: function (req, done) {
        shoppingService.findShoppingItemsByUserId(req.user.user_id, function(items) {
            return done(items)
        })
    },

    /**
     * Add shopping item to the user
     *
     * @param req
     * @param done
     */
    addShoppingItemToUser: function (req, done) {
        var item = new ShoppingItem()
        item.item_id = UUID()
        item.user_id = req.user.user_id
        item.description = req.param('description')
        shoppingService.addShoppingItem(item, function() {
            shoppingService.findShoppingItemsByUserId(req.user.user_id, function(items) {
                return done(items)
            })
        })
    },

    /**
     * Delete a shopping item given an id
     *
     * @param req
     * @param done
     */
    deleteShoppingItem: function (req, done) {
        shoppingService.deleteShoppingItem(req.params.item_id, function() {
            shoppingService.findShoppingItemsByUserId(req.user.user_id, function(items) {
                return done(items)
            })
        })
    },

    /**
     * Updates a shopping item
     *
     * @param req
     * @param done
     */
    updateShoppingItem: function (req, done) {
        shoppingService.findShoppingItemById(req.params.item_id, function(item) {
            item.description = req.param('description') || item.description
            shoppingService.updateShoppingItem(item, function() {
                shoppingService.findShoppingItemsByUserId(req.user.user_id, function(items) {
                    return done(items)
                })
            })
        })
    }

}