var mysql = require('mysql');
var TEST_DATABASE = 'nodejs_mysql_test';
var TEST_TABLE = 'test';
var client = mysql.createClient({
  user: 'root',
  password: 'root',
  database: 'test'
});


exports.index = function(req, res)
  {
  
  
  
  
  
  client.query('select * from der_geraet where lender != ""', function(err, dev_lended) {
    
    client.query('select * from der_geraet where lender like "" or lender is null', function(err, dev_available) {
      
      res.render('overview', { 
        title: 'Gadget Management Tool', 
        IDevice: req.params.id,
        dev_lended: dev_lended,
        dev_available: dev_available,
        info: req.flash('info')
      
      });  
      
    });
    
    console.log('req.params.id: '+req.params.id);
  })
};


exports.saveNewDevice = function(req, res){

  console.log(client.escape(req.body.model_name))
  //Insert Example: INSERT INTO phonebook(phone, firstname, lastname, address) VALUES('+1 123 456 7890', 'John', 'Doe', 'North America')
  
  client.query('INSERT INTO der_geraet(model_name, descr, serial_nr, mac_addr, imei_nr, os, date_pur, price, lender, category) values (' +
                [
                  req.body.model_name,
                  req.body.descr,
                  req.body.serial_nr,
                  req.body.mac_addr,
                  req.body.imei_nr,
                  req.body.os,
                  req.body.date_pur,
                  req.body.price,
                  req.body.lender,
                  req.body.category
                ].map(client.escape).join(' , ') + ')', function(err, devices) {

    console.log(err);
    
    req.flash('info', 'new device "' + req.body.model_name + '" saved!');
    res.redirect('/');  
    //res.redirect('/device/' + req.params.id + '/take');
    
    /*res.render('view01', { 
      title: 'You saved this device:', 
      IDevice: req.params.id});*/
    
  })
  
};

exports.saveDevice = function(req, res){

  
  client.query('update der_geraet set model_name = "' + 
                req.body.model_name + '", descr = "' + 
                req.body.descr + '", serial_nr = "' + 
                req.body.serial_nr + '", mac_addr = "' + 
                req.body.mac_addr + '", imei_nr = "' + 
                req.body.imei_nr + '", os = "' + 
                req.body.os + '", price = "' + 
                req.body.price + '", date_pur = "' + 
                req.body.date_pur + '" where id = ' + 
                parseInt(req.params.id, 10), function(err, devices) {
    console.log('req.params.id: '+req.params.id);
    console.log(err);
    
    req.flash('info', 'device "' + req.body.model_name + '" updated!');
    res.redirect('/');  
    //res.redirect('/device/' + req.params.id + '/take');
    
    /*res.render('view01', { 
      title: 'You saved this device:', 
      IDevice: req.params.id});*/
    
  })
  
};

exports.takeDevice = function(req, res)
{
  
  var curDate = (client.query('select curdate()'));
  console.log('curDate: '+ curDate);
 
  client.query('update der_geraet set lender = "' + 
                req.body.lender + '" where id = ' + 
                parseInt(req.params.id, 10), function(err, devices) {
    console.log('req.params.id: '+req.params.id);
    console.log(err);
    
    req.flash('info', 'device "' + req.body.model_name + '" updated!');
    res.redirect('/');  
    
  })
};


exports.addDevice = function(req, res){
  
  
  res.render('details', { 
    title: 'Add a new Device:', 
    IDevice: req.params.id,
    device: devices[0] 
    
    });
};


exports.deleteDevice = function(req, res){
  
}

exports.devBack = function(req, res)
{
  client.query('update der_geraet set lender = "" where id = ' + 
                parseInt(req.params.id, 10), function(err, devices) {
    console.log('req.params.id: '+req.params.id);
    console.log(err);
    
    req.flash('info', 'device "' + req.body.model_name + '" updated!');
    res.redirect('/');  
    
  })
};

exports.edithis = function(req, res){
  
  client.query('SELECT p.shname, v.vid from person p, verleihung v where v.pid = p.pid and devid = '+ parseInt(req.params.id, 10), function(err, devHis){
    
    client.query('select * from der_geraet where id = ' + parseInt(req.params.id, 10), function(err, devices) {
      
      res.render('details', { 
      title: 'Edit and History of Device:', 
      
      IDevice: req.params.id,
      device: devices[0],
      devHis: devHis
      
      
      });
      console.log('req.params.id: '+req.params.id);
      console.log('device ID :' +devHis[0].vid);
      console.log('lender name :' +devHis[0].shname);
    });
  })
};




/*DB Abfrage erstellen*/
