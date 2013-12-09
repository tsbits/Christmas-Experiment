var scene, camera, renderer, sw, sh, $container, objects, controls, ground, character, keys;

$(document).ready( function(){  

  //Scene size
  sw = window.innerWidth;
  sh = window.innerHeight;

  //Setup the renderer
  $container = $('#container');
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.setSize( sw, sh );
  
  //Setup the camera
  camera = new THREE.PerspectiveCamera( 45, sw / sh, 0.1, 10000 );
  camera.position.y = 50;
  camera.position.z = 100;

  //Setup the scene
  scene = new THREE.Scene();
  scene.autoClear = false;
  scene.fog = new THREE.FogExp2( 0xa4e2f2, 0.00025 );
  scene.add( camera );

  var skyBox = new THREE.Mesh( new THREE.CubeGeometry( 10000, 10000, 10000 ), new THREE.MeshBasicMaterial( { color: 0xa4e2f2, side: THREE.BackSide } ) );
  scene.add( skyBox );

  $container.append( renderer.domElement );

  //Init and creating objects
  objects = [];

  //Ground creation
  ground = new THREE.Mesh( new THREE.CubeGeometry( 1500, 10, 1500, 3, 3, 3 ), new THREE.MeshPhongMaterial( { ambient: 0x00abd5, color: 0xffffff, specular: 0xffffff, shininess: 20, shading: THREE.SmoothShading }  ) );
  /*ground.castShadow = true;
  ground.receiveShadow = true;*/
  scene.add( ground );

  //Character creation
  character = new THREE.Mesh( new THREE.CubeGeometry( 10, 10, 10, 3, 3, 3 ), new THREE.MeshBasicMaterial( { color: 0xff0000, shading: THREE.SmoothShading } ) );
  /*character.castShadow = true;
  character.receiveShadow = true;*/
  character.position.y = 10;
  character.add( camera )
  scene.add( character );

  camera.lookAt( character.position );

  //Light
  /*var light = new THREE.SpotLight( 0xffffff );
  light.castShadow = true;
  light.position.x = 0;
  light.position.y = 10000;
  light.position.z = 0;
  scene.add( light );*/

  var l = new THREE.PointLight( 0xffffff, 2, 500 );
  l.position.y = 300;
  character.add( l );

  //Launch the drawing loop!
  setInterval( function(){
    renderloop();
  }, 1000/60);


  //Handling window resize
  window.addEventListener('resize', function() {
    sw = window.innerWidth;
    sh = window.innerHeight;
    renderer.setSize(sw, sh);
    camera.aspect = sw / sh;
    camera.updateProjectionMatrix();
  });

  keys = { 'up': false, 'right': false, 'down': false, 'left': false }

  //Handling keypress
  $( document ).keydown( function(e){
    if( e.keyCode == 37 ){
      keys[ 'left' ] = true;
    }
    if( e.keyCode == 38 ){
      keys[ 'up' ] = true;
    }
    if( e.keyCode == 39 ){
      keys[ 'right' ] = true;
    }
    if( e.keyCode == 40 ){
      keys[ 'down' ] = true;
    }
  } );
  $( document ).keyup( function(e){
    if( e.keyCode == 37 ){
      keys[ 'left' ] = false;
      camera.rotation.y = 0 * ( Math.PI / 180);
    }
    if( e.keyCode == 38 ){
      keys[ 'up' ] = false;
    }
    if( e.keyCode == 39 ){
      keys[ 'right' ] = false;
    }
    if( e.keyCode == 40 ){
      keys[ 'down' ] = false;
    }
  } );

});

function renderloop(){
  if( keys[ 'left' ] ){
    character.rotation.y += 1 * ( Math.PI / 180);
  }
  if( keys[ 'up' ] ){
    character.translateZ( -2 );
  }
  if( keys[ 'right' ] ){
    character.rotation.y -= 1 * ( Math.PI / 180);
  }
  if( keys[ 'down' ] ){
    character.translateZ( 2 );
  }
  renderer.render(scene, camera);
}