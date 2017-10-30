var db = require('../../lib/db')

module.exports = {

    /**
     * Finds a shopping item given an their item_id
     *
     * @param id
     * @param done
     */
  findShoppingItemById: function (id, done) {
    db.query('SELECT * FROM shopping WHERE shopping.item_id = $1', [id], function (err, data) {
      if (err) {
        return console.error('error running query', err)
      }
      return done(data.rows[0])
    })
  },

    /**
     * Find shopping items by userId
     *
     * @param userId
     * @param done
     */
  findShoppingItemsByUserId: function (userId, done) {
    db.query('SELECT * FROM shopping WHERE shopping.user_id = $1', [userId], function (err, data) {
      if (err) {
        return console.error('error running query', err)
      }
      return done(data.rows)
    })
  },

    /**
     * Adds a shopping item to the database
     *
     * @param item
     * @param done
     */
  addShoppingItem: function (item, done) {
    db.query('INSERT INTO shopping (item_id, user_id, description) VALUES ($1, $2, $3)',
            [item.item_id, item.user_id, item.description], function (err, data) {
              if (err) {
                return console.error('error running query', err)
              }
              return done()
            })
  },

    /**
     * Deletes a shopping item from the database
     *
     * @param itemId
     * @param done
     */
  deleteShoppingItem: function (itemId, done) {
    db.query('DELETE FROM shopping WHERE item_id = $1',
            [itemId], function (err, data) {
              if (err) {
                return console.error('error running query', err)
              }
              return done()
            })
  },

    /**
     * Updates a shopping item with given parameters
     *
     * @param item
     * @param done
     */
  updateShoppingItem: function (item, done) {
    db.query('UPDATE shopping SET description = $1 WHERE item_id = $2',
            [item.description, item.item_id], function (err, data) {
              if (err) {
                return console.error('error running query', err)
              }
              return done()
            })
  }

}
