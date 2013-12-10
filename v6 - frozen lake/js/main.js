var scene, camera, renderer, sw, sh, $container, snowflakes, controls, ground, character, keys, dae, skin, igloo, castShadow, heroVel;

$(document).ready( function(){  

  //Scene size
  sw = window.innerWidth;
  sh = window.innerHeight;

  $( '.vignette' ).css( { 'width': sw, 'height': sh } );

  heroVel = 0;


  castShadow = false;

  //Setup the renderer
  $container = $('#container');
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.setSize( sw, sh );
  
  //Setup the camera
  camera = new THREE.PerspectiveCamera( 45, sw / sh, 0.1, 100000 );
  camera.position.y = 1300;
  camera.position.z = 2000;

  //Setup the scene
  scene = new THREE.Scene();
  scene.autoClear = false;
  scene.fog = new THREE.FogExp2( 0x01192a, 0.0004 );
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
  snowflakes = [];
for( var i = 0; i < 500; i++ ){
    //Sphères
    var sphere = new THREE.Mesh( new THREE.SphereGeometry( Math.random() * 3, 5, 5 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
  //sphere.castShadow = true;
  //sphere.receiveShadow = true;
    sphere.geometry.dynamic = true;
    sphere.position.x = ( Math.random() * 10000 ) - 5000;
    sphere.position.y = ( Math.random() * 1500 );
    sphere.position.z = ( Math.random() * 10000 ) - 5000;

    snowflakes.push( sphere );
    scene.add( sphere );
  }

  
  //Collada perso
  var loaderCharacter = new THREE.ColladaLoader();
  loaderCharacter.options.convertUpAxis = true;
  loaderCharacter.load( 'model.dae', function ( collada ) {
    dae = collada.scene;
    skin = collada.skins[ 0 ];

      //Character creation
    character = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
    if( castShadow ){
      character.castShadow = true;
      character.receiveShadow = true;
    }
    character.position.y = 60;
    character.add( camera )
    scene.add( character );

    character.scale.x = character.scale.y = character.scale.z = 1;
    character.updateMatrix();

    scene.add( character );

    camera.lookAt( character.position );

  
    var pointLight =
      new THREE.PointLight(0xFFFFFF);
    pointLight.position.x = 0;
    pointLight.position.y = 1000;
    pointLight.position.z = 0;
    camera.add(pointLight);

  } );

var pointLight =
      new THREE.PointLight(0xFF0000, 10, 100);
    pointLight.position.x = 0;
    pointLight.position.y = 200;
    pointLight.position.z = 0;

  var ambientLight = new THREE.AmbientLight(0x003544);
  scene.add(ambientLight);

  //Collada igloo
    var loaderTree = new THREE.ColladaLoader();
    loaderTree.options.convertUpAxis = true;
    loaderTree.load( 'tree32.dae', function ( collada ) {
      dae = collada.scene;
      skin = collada.skins[ 0 ];

        for( var t = 0; t < 100; t++ ){  
          //Character creation
          tree = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
          console.log(tree);
          if( castShadow ){
            tree.castShadow = true;
            tree.receiveShadow = true;
          }
          tree.position.x = ( Math.random() * 9000 ) - 4500;
          tree.position.y = -10;
          tree.position.z = ( Math.random() * 9000 ) - 4500;

          tree.rotation.y = 360 * Math.random() * ( Math.PI / 180);

          tree.scale.x = tree.scale.y = tree.scale.z = 2 * Math.random() + 4;
          tree.updateMatrix();

          scene.add( tree )
        }

       ;
    } );

    /*var loaderTree = new THREE.ColladaLoader();
    loaderTree.options.convertUpAxis = true;
    loaderTree.load( 'tree2.dae', function ( collada ) {
      dae = collada.scene;
      skin = collada.skins[ 0 ];

        for( var t = 0; t < 25; t++ ){  
          //Character creation
          tree = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
          if( castShadow ){
            tree.castShadow = true;
            tree.receiveShadow = true;
          }
          tree.position.x = ( Math.random() * 9000 ) - 4500;
          tree.position.y = -10;
          tree.position.z = ( Math.random() * 9000 ) - 4500;

          tree.rotation.y = 360 * Math.random() * ( Math.PI / 180);

          tree.scale.x = tree.scale.y = tree.scale.z = 2 * Math.random() + 4;
          tree.updateMatrix();

          scene.add( tree )
        }

       ;
    } );*/






  //Mountains
  for( var m = 0; m < 9; m++ ){
    var mountainXSeg = 15;
    var mountainYSeg = 15;

    if( m == 8 ){
      mountainXSeg = 60
      mountainYSeg = 60;
    }

    //Creating a mesh with a texture
    var mountain = new THREE.Mesh( new THREE.PlaneGeometry( 10000, 10000, mountainXSeg, mountainYSeg ), new THREE.MeshBasicMaterial( { color: 0x88ddf5 } ) );
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

      if( castShadow ){
        mountain.castShadow = true;
        mountain.receiveShadow = true;
      }
    }

    if( m != 8 ){
      var subdiv = 3;
      /*var modifier = new THREE.SubdivisionModifier( subdiv );
      modifier.modify( mountain.geometry );*/
    }

    console.log( m )
    scene.add( mountain );
  }




  /*var ambientLight = new THREE.AmbientLight(0x000044);
  scene.add(ambientLight);*/

  /*var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  directionalLight.castShadow = true;
  directionalLight.onlyShadow = true;
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);*/


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

    if( heroVel < 20 ){
      heroVel += 0.5;
    }

    
  }
  else{
    if( heroVel > 0 ){
      heroVel -= 0.25;
    }
  }

  if( keys[ 'right' ] ){
    character.rotation.y -= 2 * ( Math.PI / 180);
  }

  if( keys[ 'down' ] ){
    if( heroVel > 0 ){
      heroVel -= 0.25;
    }
  }

  character.translateZ( -heroVel );


  renderer.render(scene, camera);controls.update();


  
}