var scene, camera, renderer, sw, sh, $container, objects, controls;

$(document).ready( function(){  

  //Scene size
  sw = window.innerWidth;
  sh = window.innerHeight;

  //Setup the renderer
  $container = $('#container');
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.shadowMapEnabled = true;
  renderer.setSize( sw, sh );
  
  //Setup the camera
  camera = new THREE.PerspectiveCamera( 45, sw / sh, 0.1, 10000 );
  camera.position.z = 300;

  //Setup the scene
  scene = new THREE.Scene();
  scene.autoClear = false;
  scene.add( camera );

  $container.append( renderer.domElement );

  //Init and creating objects
  objects = [];

  for( var i = 0; i < 50; i++ ){
    //Sphères
    var sphere = new THREE.Mesh( new THREE.SphereGeometry( Math.random() * 25, 15, 15 )/*, new THREE.MeshBasicMaterial( { color: 0xffffff } )*/ );
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.geometry.dynamic = true;
    sphere.position.x = ( Math.random() * 500 ) - 250;
    sphere.position.y = ( Math.random() * 500 ) - 250;
    sphere.position.z = ( Math.random() * 500 ) - 250;

    objects.push( sphere );
    scene.add( sphere );
  }  

  //Light
  var light = new THREE.SpotLight( 0xffffff );
  light.castShadow = true;
  light.position.x = 0;
  light.position.y = 1000;
  light.position.z = 0;
  scene.add( light );

  //Launch the drawing loop!
  setInterval( function(){
    renderloop();
  }, 1000/60);

  //Handling mouse control
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  //Handling window resize
  window.addEventListener('resize', function() {
    sw = window.innerWidth;
    sh = window.innerHeight;
    renderer.setSize(sw, sh);
    camera.aspect = sw / sh;
    camera.updateProjectionMatrix();
  });

});

function renderloop(){
  renderer.render(scene, camera);
  controls.update();
  //sphere.rotation.y -= .0025;
  for( var i = 0; i < objects.length; i++){
    var obj = objects[ i ];
    obj.rotation.y += 0.025;
  }
}