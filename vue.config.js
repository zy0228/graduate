// var goods = require('./resource/mock.json')

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/',
  devServer: {
    // before(app) {
    //   app.get('/goods', (req, res) => {
    //     res.json(goods)
    //   })
    // }
    proxy: {
      '/goods': {
        target: 'http://localhost:3000'
      },
      '/goods/*': {
        target: 'http://localhost:3000'
      },
      '/users/*': {
        target: 'http://localhost:3000'
      }
    }
  }    
}