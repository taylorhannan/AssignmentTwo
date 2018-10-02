module.exports = function(app, formidable) {
    // Route to manage image upload
    app.post('/api/upload', (req, res) => {
        var form = new formidable.IncomingForm({
            uploadDir: './images'
        });
        form.keepExtensions = true;

        // Error checking
        form.on('error', function(err) {
            throw err;
            res.send({
                result: "failed",
                data: {},
                numberOfImages: 0,
                message: "Cannot upload images. Error is :" + err
            });
        });

        // Use formidable to upload directory & filename
        form.on('fileBegin', function(name, file) {
            file.path = form.uploadDir + "/" + file.name;
        });

        // Return success response
        form.on('file', function(field, file) {
            res.send({
                result: "OK",
                data: {
                    'filename': file.name,
                    'size': file.size
                },
                numberOfImages: 1,
                message: "Upload successful"
            });
        });

        form.parse(req);
    });
}
