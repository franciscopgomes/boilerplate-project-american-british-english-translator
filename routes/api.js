'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      //console.log(req.body.text);
      //console.log(req.body.locale);
      if(req.body.text == undefined || req.body.locale == undefined) {
        return res.status(200).json({error: 'Required field(s) missing'});
      }
      if(req.body.text == '') {
        return res.status(200).json({error: 'No text to translate'});
      }
      if(req.body.locale != 'american-to-british' && req.body.locale != 'british-to-american') {
        return res.status(200).json({error: 'Invalid value for locale field'});
      }
      let strTranslated = translator.translateAndHighlight(req.body.text, req.body.locale);
      if(strTranslated === req.body.text) {
        return res.status(200).json({
          text: req.body.text,
          translation: 'Everything looks good to me!'
        });
      }
      return res.status(200).json({
        text: req.body.text,
        translation: strTranslated
      });
    });
};
