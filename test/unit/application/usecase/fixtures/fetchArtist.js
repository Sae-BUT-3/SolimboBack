const {
    artistFixture,
    expectedFixture
} = require("../../../interfaces/serializers/fixtures/artistFixture")

artistFixture.popularity = 2
expectedFixture.popularity = 2

module.exports = {
    artistFixture,
    expectedFixture,
}