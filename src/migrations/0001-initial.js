/**
 * Initial migration file
 * This file ensures Payload has a migrations directory to work with
 */

module.exports = {
  name: '0001-initial',
  async up({ payload }) {
    // No changes needed for initial migration
    console.log('Initial migration completed')
  },
  async down({ payload }) {
    // No rollback needed for initial migration
    console.log('Initial migration rolled back')
  },
}
