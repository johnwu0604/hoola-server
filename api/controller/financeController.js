var UUID = require('uuid/v1')
var Finance = require('../model/finance')
var financeService = require('../service/financeService')
var async = require('async')

module.exports = {

    /**
     * Retrieve all the finances for a user
     *
     * @param req
     * @param done
     */
  getUserFinances: function (req, done) {
    async.parallel([
      function (done) {
        financeService.retrieveAllFinanceTypes(function (types) {
          return done(null, types)
        })
      },
      function (done) {
        financeService.retrieveAllFinanceCategories(function (categories) {
          return done(null, categories)
        })
      },
      function (done) {
        financeService.findFinanceItemsByUserId(req.user.user_id, function (items) {
          return done(null, items)
        })
      }
    ], function (err, results) {
      if (err) {
        return err
      }
      return done({
        'types': results[0],
        'categories': results[1],
        'items': results[2]
      })
    })
  },

    /**
     * Add a financial item to the user
     *
     * @param req
     * @param done
     */
  addItemToUser: function (req, done) {
    var finance = new Finance()
    finance.item_id = UUID()
    finance.user_id = req.user.user_id
    finance.type_id = req.body.type_id
    finance.category_id = req.body.category_id
    finance.date = req.body.date
    finance.description = req.body.description
    finance.amount = req.body.amount
    financeService.addFinanceItem(finance, function () {
      financeService.findFinanceItemsByUserId(req.user.user_id, function (items) {
        return done(items)
      })
    })
  },

    /**
     * Delete a financial item given an id
     *
     * @param item_id
     * @param done
     */
  deleteItem: function (req, done) {
    financeService.deleteItem(req.params.item_id, function () {
      financeService.findFinanceItemsByUserId(req.user.user_id, function (items) {
        return done(items)
      })
    })
  }

}
