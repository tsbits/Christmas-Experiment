var scene, camera, renderer, sw, sh, $container, objects, controls, ground, character, keys, dae, skin;

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
  camera = new THREE.PerspectiveCamera( 45, sw / sh, 0.1, 100000 );
  camera.position.y = 250;
  camera.position.z = 1500;

  //Setup the scene
  scene = new THREE.Scene();
  scene.autoClear = false;
  scene.fog = new THREE.FogExp2( 0x01192a, 0.00025 );
  scene.add( camera );

  $container.append( renderer.domElement );

  //Init and creating objects
  var skyBox = new THREE.Mesh( new THREE.SphereGeometry( 20000, 15, 15 ), new THREE.MeshBasicMaterial( { color: 0x01192a, side: THREE.BackSide } ) );
  scene.add( skyBox );

  //Ground creation
  /*ground = new THREE.Mesh( new THREE.PlaneGeometry( 10000, 10000, 3, 3 ), new THREE.MeshBasicMaterial( { color: 0xa4e2f2, side: THREE.BackSide } ) );
  //ground.castShadow = true;
  //ground.receiveShadow = true;
  ground.rotation.x = 90 * ( Math.PI / 180);
  scene.add( ground );*/

  //Balls
  objects = [];
for( var i = 0; i < 100; i++ ){
    //Sphères
    var sphere = new THREE.Mesh( new THREE.SphereGeometry( Math.random() * 150, 15, 15 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
  //sphere.castShadow = true;
  //sphere.receiveShadow = true;
    sphere.geometry.dynamic = true;
    sphere.position.x = ( Math.random() * 10000 ) - 5000;
    sphere.position.y = ( Math.random() * 500 );
    sphere.position.z = ( Math.random() * 10000 ) - 5000;

    objects.push( sphere );
    scene.add( sphere );
  }

  
  //Collada
  var loader = new THREE.ColladaLoader();
  loader.options.convertUpAxis = true;
  loader.load( 'model.dae', function ( collada ) {
    dae = collada.scene;
    skin = collada.skins[ 0 ];

      //Character creation
    character = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
    //character.castShadow = true;
    //character.receiveShadow = true;
    character.position.y = 100;
    character.add( camera )
    scene.add( character );

    character.scale.x = character.scale.y = character.scale.z = 1;
    character.updateMatrix();

    scene.add( character );

    camera.lookAt( character.position );

  
var pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
camera.add(pointLight);

  } );


  //Mountains
  for( var m = 0; m < 9; m++ ){
    var mountainXSeg = 15;
    var mountainYSeg = 15;

    if( m == 8 ){
      mountainXSeg = 60
      mountainYSeg = 60;
    }

    //Creating a mesh with a texture
    var mountain = new THREE.Mesh( new THREE.PlaneGeometry( 10000, 10000, mountainXSeg, mountainYSeg ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
    //Affecting vertices
    for( var i = 0; i < mountain.geometry.vertices.length; i++ ){
      if( m != 8 ){
        mountain.geometry.vertices[ i ].z = Math.floor((Math.random()*1500)+1);
      }
      else{
        mountain.geometry.vertices[ i ].z = Math.floor((Math.random()*25)+1);
      }
    }

    //Getting the border vertices
    var currentRow = 0;
    for( var i = 0; i < mountain.geometry.vertices.length; i++ ){
      if( i != 0 && i%(mountainXSeg+1) == 0 ){
        currentRow++;
      }
      //First row
      if( i <= mountainXSeg ){
        mountain.geometry.vertices[i].z = 0;
      }
      //left row
      if( i%(mountainXSeg) == currentRow ){
        mountain.geometry.vertices[i].z = 0;
      }
      //right row
      if( i%(mountainXSeg+1) == 0 ){
        mountain.geometry.vertices[i].z = 0;
      }
      //Last row
      if( i >= mountain.geometry.vertices.length-1 - mountainYSeg){
        mountain.geometry.vertices[i].z = 0;
      }
    }

    mountain.geometry.dynamic = true;
    mountain.rotation.x = -90 * ( Math.PI / 180);
    

    if( m == 0 ){
      mountain.position.x = 9500;
      mountain.position.y = 5;
    }
    else if( m == 1 ){
      mountain.position.x = -9500;
      mountain.position.y = 5;
    }
    else if( m == 2 ){
      mountain.position.z = 9500;
      mountain.position.y = 5;
    }
    else if( m == 3 ){
      mountain.position.z = -9500;
      mountain.position.y = 5;
    }
    else if( m == 4 ){
      mountain.position.x = -9500;
      mountain.position.z = -9500;
      mountain.position.y = 5;
    }
    else if( m == 5 ){
      mountain.position.x = 9500;
      mountain.position.z = 9500;
      mountain.position.y = 5;
    }
    else if( m == 6 ){
      mountain.position.x = 9500;
      mountain.position.z = -9500;
      mountain.position.y = 5;
    }
    else if( m == 7 ){
      mountain.position.x = -9500;
      mountain.position.z = 9500;
      mountain.position.y = 5;
    }
    else if( m == 8 ){
      mountain.position.y = -10;
    }

    if( m != 8 ){
      var subdiv = 3;
      /*var modifier = new THREE.SubdivisionModifier( subdiv );
      modifier.modify( mountain.geometry );*/
    }

    console.log( m )
    scene.add( mountain );
  }






  //Handling mouse control
  controls = new THREE.OrbitControls(camera, renderer.domElement);

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
    character.rotation.y += 2 * ( Math.PI / 180);
  }
  if( keys[ 'up' ] ){
    character.translateZ( -20 );
  }
  if( keys[ 'right' ] ){
    character.rotation.y -= 2 * ( Math.PI / 180);
  }
  if( keys[ 'down' ] ){
    character.translateZ( 20 );
  }

  //particleSystem.rotation.y += 0.0025;

  renderer.render(scene, camera);controls.update();


  
}