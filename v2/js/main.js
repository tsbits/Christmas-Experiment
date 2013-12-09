var scene, camera, renderer, sw, sh, $container, objects, controls, ground;

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

  //Creating a mesh
  ground = new THREE.Mesh( new THREE.CubeGeometry( 100, 3, 100, 3, 3, 3 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
  ground.castShadow = true;
  ground.receiveShadow = true;
  ground.position.y = 0;
  scene.add( ground );



  //Light
  var light = new THREE.SpotLight( 0xffffff );
  light.castShadow = true;
  light.position.x = 0;
  light.position.y = 1000;
  light.position.z = 300;
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
}