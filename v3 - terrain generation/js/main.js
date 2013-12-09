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
  camera.position.y = 1000;
  camera.position.z = 0;

  //Setup the scene
  scene = new THREE.Scene();
  scene.autoClear = false;
  scene.add( camera );

  $container.append( renderer.domElement );

  //Init and creating objects
  objects = [];

  /* GROUND */
  var groundXSeg = 5;
  var groundYSeg = 5;

  //Creating a mesh with a texture
  ground = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000, groundXSeg, groundYSeg )/*, new THREE.MeshBasicMaterial( { color: 0xffffff } )*/ );
  //Affecting vertices
  for( var i = 0; i < ground.geometry.vertices.length; i++ ){
    ground.geometry.vertices[ i ].z = Math.floor((Math.random()*100)+1);
  }

  //Getting the border vertices
  var currentRow = 0;
  for( var i = 0; i < ground.geometry.vertices.length; i++ ){
    if( i != 0 && i%(groundXSeg+1) == 0 ){
      currentRow++;
    }
    //First row
    if( i <= groundXSeg ){
      ground.geometry.vertices[i].z = 0;
    }
    //left row
    if( i%(groundXSeg) == currentRow ){
      ground.geometry.vertices[i].z = 0;
    }
    //right row
    if( i%(groundXSeg+1) == 0 ){
      ground.geometry.vertices[i].z = 0;
    }
    //Last row
    if( i >= ground.geometry.vertices.length-1 - groundYSeg){
      ground.geometry.vertices[i].z = 0;
    }
    console.log(currentRow)
  }

  ground.geometry.dynamic = true;
  ground.rotation.x = -90;
  ground.castShadow = true;
  ground.receiveShadow = true;
  ground.position.y = 0;

  scene.add( ground );



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
}