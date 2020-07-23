module.exports = app => {

    // Base URLS
    app.use('/', require('./base'))
    app.use('/auth', require('./auth'))
    app.use('/profile', require('./profile'))
    app.use('/question', require('./questions'))
    app.use('/chat', require('./chat'))
    
    // CLOUDINARYCONFIG 
    // app.use('/files', require('./files.routes'))
    // TODO
}