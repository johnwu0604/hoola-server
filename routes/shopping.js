var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.redirect('/unauthenticated')
}
var shoppingController = require('../api/controller/shoppingController')

/**
 * Routes for shopping list management
 *
 * @param app
 * @param passport
 */
module.exports = function (app, passport) {

    /**
     * Retrieves all shopping list items for the authenticated user
     */
    app.get('/shopping-list-items', isAuthenticated, function(req,res) {
        shoppingController.getUserShoppingItems(req, function(items) {
            res.send({
                "user_authenticated": true,
                "items": items
            })
        })
    })

    /**
     * Adds an item to the shopping list of an authenticated user
     */
    app.post('/shopping-list-item', isAuthenticated, function (req, res) {
        shoppingController.addShoppingItemToUser(req, function(items) {
            res.status(200).send({
                "user_authenticated": true,
                "items": items
            })
        })
    })

    /**
     * Updates the item of an item in the shopping list of an authenticated user
     */
    app.put('/shopping-list-item/:item_id', isAuthenticated, function (req, res) {
        shoppingController.updateShoppingItem(req, function(items) {
            res.status(200).send({
                "user_authenticated": true,
                "items": items
            })
        })
    })

    /**
     * Deletes the an item from the shopping list of an authenticated user
     */
    app.delete('/shopping-list-item/:item_id', isAuthenticated, function (req, res) {
        shoppingController.deleteShoppingItem(req, function (items) {
            res.status(200).send({
                "user_authenticated": true,
                "items": items
            })
        })
    })

}