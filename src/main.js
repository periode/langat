let init = () => {
  console.log("hola");
  let client = new rhizome.Client()

  client.start(function(err){
    if(err)
      alert(err)

    client.on('connected', function() {
      console.log('connected');
    })
  })
}

window.init = init
