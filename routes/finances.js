var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.redirect('/unauthenticated')
}
var financeController = require('../api/controller/financeController')

/**
 * Routes for financial management
 *
 * @param app
 * @param passport
 */
module.exports = function (app, passport) {
    /**
     * Retrieves all data required to load the finances page
     */
  app.get('/finances', isAuthenticated, function (req, res) {
    financeController.getUserFinances(req, function (finances) {
      res.send({
        'user_authenticated': true,
        'finances': finances
      })
    })
  })

    /**
     * Adds a financial item to an authenticated user
     */
  app.post('/finance', isAuthenticated, function (req, res) {
    financeController.addItemToUser(req, function (items) {
      res.status(200).send({
        'user_authenticated': true,
        'items': items
      })
    })
  })

    /**
     * Deletes a financial item for an authenticated user
     */
  app.delete('/finance/:item_id', isAuthenticated, function (req, res) {
    financeController.deleteItem(req, function (items) {
      res.status(200).send({
        'user_authenticated': true,
        'items': items
      })
    })
  })
}
