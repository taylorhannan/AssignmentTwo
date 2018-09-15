module.exports = function(app, formidable){
  app.post('/api/upload', (req, res) => {
    var form = new formidable.IncomingForm({ uploadDir: './images' });
    form.keepExtensions = true;

    form.on('error', function (err){
      throw err;
      res.send({
        result:"failed",
        data:{},
        numberOfImages:0,
        message:"Cannot upload images. Error is :" + err
      });
    });

    form.on('fileBegin', function(name, file){
      file.path = form.uploadDir + "/" + file.name;
    });

    form.on('file', function(field, file){
      res.send({
        result: "OK",
        data:{'filename':file.name, 'size':file.size},
        numberOfImages:1,
        message:"Upload successfull"
      });
    });

    form.parse(req);
  });
}
