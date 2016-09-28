/*********************************************************************
 *                        Module dependencies
 *********************************************************************/
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'))


exports.apiGet = apiGet
exports.moviesId = moviesId


/* Get home page. */
function apiGet(req, res, next) {
    fs.readFile('./views/layout.hbs', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.end(data)
        }
    })
}

function moviesId(req, res, next) {

    /* Get the id parameter */
    let id = req.params.id
    const movieFile = `./movies/${id}`

    fs.stat(movieFile, (err, stats) => {
        if (err) {
            console.log(err)
            return res.status(404).end('Movie Not found')
        }
        let range = req.headers.range
        if (!range) {
            return res.sendStatus(416)
        }
        let positions = range.replace(/bytes=/, "").split("-")
        let start = parseInt(positions[0], 10)
        let total = stats.size
        let end = positions[1] ? parseInt(positions[1], 10) : total - 1
        let chunkSize = (end - start) + 1

        /* Defining headers */
        res.set({
            'Content-Range': `bytes ${start}-${end}/${total}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'
        });
        res.status(206)

        /* read the stream and send it in installments through the pipe () */
        const stream = fs.createReadStream(movieFile, {start, end})
        stream.on('open', () => stream.pipe(res))
        stream.on('error', (streamErr) => res.end(streamErr))
    })
}