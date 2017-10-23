/**
 * Created by JohnWu on 2017-07-09.
 */
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.redirect('/unauthenticated')
}
var shoppingController = require('../api/controller/shoppingController')

module.exports = function (app, passport) {

    app.get('/shopping-items', isAuthenticated, function(req,res) {
        shoppingController.getUserShoppingItems(req, function(items) {
            res.send({
                "user_authenticated": true,
                "items": items
            })
        })
    })

    app.post('/shopping-item', isAuthenticated, function (req, res) {
        shoppingController.addShoppingItemToUser(req, function(items) {
            res.status(200).send({
                "user_authenticated": true,
                "items": items
            })
        })
    })

    app.put('/shopping-item/:item_id', isAuthenticated, function (req, res) {
        shoppingController.updateShoppingItem(req, function(items) {
            res.status(200).send({
                "user_authenticated": true,
                "items": items
            })
        })
    })

    app.delete('/shopping-item/:item_id', isAuthenticated, function (req, res) {
        shoppingController.deleteShoppingItem(req, function (items) {
            res.status(200).send({
                "user_authenticated": true,
                "items": items
            })
        })
    })

}