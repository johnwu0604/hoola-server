var db = require('../../lib/db')

module.exports = {

    /**
     * Finds a financial item given an their item_id
     *
     * @param id
     * @param done
     */
  findFinanceItemById: function (id, done) {
    db.query('SELECT * FROM finances WHERE finances.item_id = $1', [id], function (err, data) {
      if (err) {
        return console.error('error running query', err)
      }
      return done(data.rows[0])
    })
  },

    /**
     * Retrieve all finance categories
     *
     * @param done
     */
  retrieveAllFinanceCategories: function (done) {
    db.query('SELECT * FROM finance_categories ORDER BY category_id ASC', [], function (err, data) {
      if (err) {
        return console.error('error running query', err)
      }
      return done(data.rows)
    })
  },

    /**
     * Retrieve all finance types
     *
     * @param done
     */
  retrieveAllFinanceTypes: function (done) {
    db.query('SELECT * FROM finance_types ORDER BY type_id ASC', [], function (err, data) {
      if (err) {
        return console.error('error running query', err)
      }
      return done(data.rows)
    })
  },

    /**
     * Find all financial items by user_id
     *
     * @param userId
     * @param done
     */
  findFinanceItemsByUserId: function (userId, done) {
    var query = 'SELECT finances.item_id, finances.user_id, finance_types.name AS type_name, finance_categories.name AS category_name, finances.date, finances.description, finances.amount' +
            ' FROM finances INNER JOIN finance_categories ON finances.category_id=finance_categories.category_id INNER JOIN finance_types ON finances.type_id=finance_types.type_id' +
            ' WHERE user_id = $1 ORDER BY date DESC'
    db.query(query, [userId], function (err, data) {
      if (err) {
        return console.error('error running query', err)
      }
      return done(data.rows)
    })
  },

    /**
     * Adds a financial item to the database
     *
     * @param task
     * @param done
     */
  addFinanceItem: function (item, done) {
    db.query('INSERT INTO finances (item_id, user_id, type_id, category_id, date, description, amount) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [item.item_id, item.user_id, item.type_id, item.category_id, item.date, item.description, item.amount], function (err, data) {
              if (err) {
                return console.error('error running query', err)
              }
              return done()
            })
  },

    /**
     * Deletes a financial item from the database
     *
     * @param itemId
     * @param done
     */
  deleteItem: function (itemId, done) {
    db.query('DELETE FROM finances WHERE item_id = $1',
            [itemId], function (err, data) {
              if (err) {
                return console.error('error running query', err)
              }
              return done()
            })
  }

}
