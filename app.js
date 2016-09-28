/****************************************************
 *                   Module
 ***************************************************/
const express = require('express')
const join = require('path').join
const favicon = require('serve-favicon')
const logger = require('morgan')

/****************************************************
 *                  additional
 ****************************************************/
const app = express()

/****************************************************
 *                  routes
 ****************************************************/
const routes = require('./routes/route')

/****************************************************
 *                view engine setup
 ****************************************************/
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'hbs')

/* uncomment after placing your favicon in /public*/
app.use(favicon(join(__dirname, 'public', 'favicon.ico')))

app.use(logger('dev'))
app.use(express.static(join(__dirname, 'public')))

app.use('/', routes)

/* catch 404 and forward to error handler */
app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})


/****************************************************
 *                 error handlers
 ****************************************************/

/**
 * development error handler
 * will print stacktrace
 */
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}

/**
 * production error handler
 * no stacktraces leaked to user
 */
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
})

module.exports = app