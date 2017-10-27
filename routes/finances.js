/**
 * Created by JohnWu on 2017-07-09.
 */
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.redirect('/unauthenticated')
}
var financeController = require('../api/controller/financeController')

module.exports = function (app, passport) {

    app.get('/finances', isAuthenticated, function(req,res) {
        financeController.getUserFinances(req, function(finances) {
            res.send({
                "user_authenticated": true,
                "finances": finances
            })
        })
    })

    app.post('/finance', isAuthenticated, function (req, res) {
        financeController.addItemToUser(req, function(items) {
            res.status(200).send({
                "user_authenticated": true,
                "finances": items
            })
        })
    })

    app.delete('/finance/:item_id', isAuthenticated, function (req, res) {
        financeController.deleteFinanceItem(req, function (items) {
            res.status(200).send({
                "user_authenticated": true,
                "finances": items
            })
        })
    })

}
