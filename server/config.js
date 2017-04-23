const DATABASE_URL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds115671.mlab.com:15671/movie-tracks` 
|| 'mongodb://localhost/movie-tracks';

module.exports = { DATABASE_URL };