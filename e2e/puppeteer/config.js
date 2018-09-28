const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  url: isProduction ? '' : 'http://localhost:4200',
  user: {
    email: 'dmytro.panontko@keenethics.com',
    password: '12345678'
  }
}