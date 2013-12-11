var scene, camera, renderer, sw, sh, $container, snowflakes, controls, ground, character, keys, dae, skin, igloo, castShadow, heroVel, snowTrailEmitter, snowTrailParticules, ambiantePariculeEmitter, ambiantePariculeParticules, floor, presents;

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
  camera = new THREE.PerspectiveCamera( 45, sw / sh, 0.1, 6500 );
  camera.position.y = 1000;
  camera.position.z = 1500;

  //Setup the scene
  scene = new THREE.Scene();
  scene.autoClear = false;
  scene.fog = new THREE.FogExp2( 0x01192a, 0.0006 );
  scene.add( camera );

  $container.append( renderer.domElement );

  //Init and creating objects
  /*var skyBox = new THREE.Mesh( new THREE.SphereGeometry( 20000, 15, 15 ), new THREE.MeshBasicMaterial( { color: 0x01192a, side: THREE.BackSide } ) );
  scene.add( skyBox );*/

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
  loaderCharacter.load( 'collada/traineau.dae', function ( collada ) {
    dae = collada.scene;
    skin = collada.skins[ 0 ];

      //Character creation
    character = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
    if( castShadow ){
      character.castShadow = true;
      character.receiveShadow = true;
    }
    character.position.y = 80;
    character.rotation.y = 90 * ( Math.PI / 180);
    character.add( camera )
    scene.add( character );

    character.scale.x = character.scale.y = character.scale.z = 1;
    character.updateMatrix();

    scene.add( character );

    camera.lookAt( character.position );

    //Particules trail
   /* snowTrailParticules = new THREE.Geometry;
    for (var i = 0; i < 300; i++) {
       var particle = new THREE.Vector3(Math.random() * 150 - 75, Math.random() * 350, Math.random() * 150 - 75);
       snowTrailParticules.vertices.push(particle);
       //console.log( particle );
    }
    var snowTrailEmitterTexture = THREE.ImageUtils.loadTexture('img/snowflake.png');
    var snowTrailEmitterMaterial = new THREE.ParticleBasicMaterial({ map: snowTrailEmitterTexture, transparent: true, blending: THREE.AdditiveBlending, size: 10, color: 0x111111 });

    snowTrailEmitter = new THREE.ParticleSystem(snowTrailParticules, snowTrailEmitterMaterial);
    snowTrailEmitter.sortParticles = true;
    snowTrailEmitter.position.z = 80;
    snowTrailEmitter.rotation.x = 90 * ( Math.PI / 180);
     
    character.add(snowTrailEmitter);*/


  
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
    loaderTree.load( 'collada/tree1.dae', function ( collada ) {
      dae = collada.scene;
      skin = collada.skins[ 0 ];

        for( var t = 0; t < 40; t++ ){  
          //Character creation
          tree = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
          //tree = new THREE.Mesh( collada.scene.children[ 0 ].geometry, new THREE.MeshBasicMaterial( { color: 0x034300 } ) );
          //console.log(tree);
          if( castShadow ){
            tree.castShadow = true;
            tree.receiveShadow = true;
          }
          tree.position.x = ( Math.random() * 8500 ) - 4250;
          tree.position.y = -10;
          tree.position.z = ( Math.random() * 8500 ) - 4250;

          tree.rotation.y = 360 * Math.random() * ( Math.PI / 180);

          tree.scale.x = tree.scale.y = tree.scale.z = 2 * Math.random() + 4;
          tree.updateMatrix();

          scene.add( tree )
        }

       ;
    } );

    var loaderTree2 = new THREE.ColladaLoader();
    loaderTree2.options.convertUpAxis = true;
    loaderTree2.load( 'collada/tree2.dae', function ( collada ) {
      dae = collada.scene;
      skin = collada.skins[ 0 ];

        for( var t = 0; t < 40; t++ ){  
          //Character creation
          tree = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
          console.log( collada.scene );
          //tree = new THREE.Mesh( collada.scene.children[ 0 ].geometry, new THREE.MeshBasicMaterial( { color: 0x034300 } ) );
          //console.log(tree);
          if( castShadow ){
            tree.castShadow = true;
            tree.receiveShadow = true;
          }
          tree.position.x = ( Math.random() * 8500 ) - 4250;
          tree.position.y = -10;
          tree.position.z = ( Math.random() * 8500 ) - 4250;

          tree.rotation.y = 360 * Math.random() * ( Math.PI / 180);

          tree.scale.x = tree.scale.y = tree.scale.z = 2 * Math.random() + 4;
          tree.updateMatrix();

          scene.add( tree )
        }

       ;
    } );

    var loaderTree3 = new THREE.ColladaLoader();
    loaderTree3.options.convertUpAxis = true;
    loaderTree3.load( 'collada/tree3.dae', function ( collada ) {
      dae = collada.scene;
      skin = collada.skins[ 0 ];

        for( var t = 0; t < 40; t++ ){  
          //Character creation
          tree = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
          //tree = new THREE.Mesh( collada.scene.children[ 0 ].geometry, new THREE.MeshBasicMaterial( { color: 0x034300 } ) );
          //console.log(tree);
          if( castShadow ){
            tree.castShadow = true;
            tree.receiveShadow = true;
          }
          tree.position.x = ( Math.random() * 8500 ) - 4250;
          tree.position.y = -10;
          tree.position.z = ( Math.random() * 8500 ) - 4250;

          tree.rotation.y = 360 * Math.random() * ( Math.PI / 180);

          tree.scale.x = tree.scale.y = tree.scale.z = 2 * Math.random() + 4;
          tree.updateMatrix();

          scene.add( tree )
        }

       ;
    } );



//Ambiante particules
    ambiantePariculeParticules = new THREE.Geometry;
    for (var i = 0; i < 300; i++) {
       var particle = new THREE.Vector3(( Math.random() * 9000 ) - 4500, Math.random() * 500, ( Math.random() * 9000 ) - 4500);
       ambiantePariculeParticules.vertices.push(particle);
       //console.log( particle );
    }
    var ambiantePariculeEmitterTexture = THREE.ImageUtils.loadTexture('img/snowflake.png');
    var ambiantePariculeEmitterMaterial = new THREE.ParticleBasicMaterial({ map: ambiantePariculeEmitterTexture, transparent: true, blending: THREE.AdditiveBlending, size: 100 * Math.random(), color: 0xFFFFFF });

    ambiantePariculeEmitter = new THREE.ParticleSystem(ambiantePariculeParticules, ambiantePariculeEmitterMaterial);
    ambiantePariculeEmitter.sortParticles = true;
    ambiantePariculeEmitter.position.z = 80;
    //ambiantePariculeEmitter.rotation.x = 90 * ( Math.PI / 180);
    scene.add(ambiantePariculeEmitter);


  //Mountains
  for( var m = 0; m < 5; m++ ){
    var mountainXSeg = 15;
    var mountainYSeg = 15;

    if( m == 4 ){
      mountainXSeg = 300;
      mountainYSeg = 300;
    }

    //Creating a mesh with a texture
    //var mountain = new THREE.Mesh( new THREE.PlaneGeometry( 10000, 10000, mountainXSeg, mountainYSeg ), new THREE.MeshBasicMaterial( { color: 0x88ddf5 } ) );
    var mountain = new THREE.Mesh( new THREE.PlaneGeometry( 10000, 10000, mountainXSeg, mountainYSeg ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
    //Affecting vertices
    for( var i = 0; i < mountain.geometry.vertices.length; i++ ){
      if( m != 4 ){
        mountain.geometry.vertices[ i ].z = Math.floor((Math.random()*1500)+1);
      }
      else{
        mountain.geometry.vertices[ i ].z = Math.floor((Math.random()*35)+1);
        floor = mountain;
        floor.geometry.dynamic = true;
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
      mountain.position.x = 9000;
      mountain.position.y = 5;
    }
    else if( m == 1 ){
      mountain.position.x = -9000;
      mountain.position.y = 5;
    }
    else if( m == 2 ){
      mountain.position.z = 9000;
      mountain.position.y = 5;
    }
    else if( m == 3 ){
      mountain.position.z = -9000;
      mountain.position.y = 5;
    }
    else if( m == 4 ){
      mountain.position.y = -10;

      if( castShadow ){
        mountain.castShadow = true;
        mountain.receiveShadow = true;
      }
    }

    if( m != 4 ){
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
  //controls = new THREE.OrbitControls(camera, renderer.domElement);

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

  popPresent()

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
    //heroVel -= 0.5;
  }
  else{
    if( heroVel < 0 ){
      heroVel += 0.25;
    }
  }

  character.translateZ( -heroVel );


/*snowTrailEmitter.position.y = -120 + heroVel * 6;

var delta = 0.5;
var particleCount = snowTrailParticules.vertices.length;
while (particleCount--) {
   var particle = snowTrailParticules.vertices[particleCount];
   particle.y += delta * heroVel;

   //particle.scale.x = particle.scale.y = particle.scale.z = 0;
    
   if (particle.y >= 250) {
      particle.y = 0;
      particle.x = Math.random() * 150 - 75;
      particle.z = Math.random() * 150 - 75;
   }
}
snowTrailParticules.__dirtyVertices = true;*/

  renderer.render(scene, camera);

  //console.log( floor.geometry.vertices[0] );

  /*var step = 10000 / 300;
  var verticeX = parseInt( ( character.position.x + 5000 ) / step );
  var verticeZ = parseInt( ( character.position.z + 5000 ) / step );
  floor.geometry.vertices[ verticeX  + verticeZ * 300 ].z = 5000; 
  floor.geometry.verticesNeedUpdate = true;
  console.log( verticeX + verticeZ + " | " + ( verticeX + verticeZ ) )*/

  var originPoint = character.position.clone();

  for (var vertexIndex = 0; vertexIndex < character.geometry.vertices.length; vertexIndex++){                
    var localVertex = character.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4( character.matrix );
    var directionVector = globalVertex.sub( character.position );
    
    var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
    var collisionResults = ray.intersectObjects( presents );
    if( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){ 
      scene.remove( collisionResults[0].object );
      presents.splice( presents.indexOf( collisionResults[0].object ), 1);
      console.log( presents.length );
    }
  }        
}

function popPresent(){

  presents = [];

  var loaderPresent = new THREE.ColladaLoader();
    loaderPresent.options.convertUpAxis = true;
    loaderPresent.load( 'collada/cadeau.dae', function ( collada ) {
      dae = collada.scene;
      skin = collada.skins[ 0 ];

        for( var t = 0; t < 12; t++ ){  
          //Character creation
          //tree = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
          var p = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
          //console.log(tree);
          if( castShadow ){
            p.castShadow = true;
            p.receiveShadow = true;
          }
          p.position.x = ( Math.random() * 8500 ) - 4250;
          p.position.y = 0;
          p.position.z = ( Math.random() * 8500 ) - 4250;

          p.rotation.x = Math.random() * 360 * ( Math.PI / 180);
          p.rotation.y = Math.random() * 360 * ( Math.PI / 180);
          p.rotation.z = Math.random() * 360 * ( Math.PI / 180);

          p.scale.x = p.scale.y = p.scale.z = 2 * Math.random() + 1.5;
          p.updateMatrix();

         presents.push( p )

          scene.add( p )
        }

       ;
    } );

    var loaderPresent2 = new THREE.ColladaLoader();
    loaderPresent.options.convertUpAxis = true;
    loaderPresent.load( 'collada/cadeau.dae', function ( collada ) {
      dae = collada.scene;
      skin = collada.skins[ 0 ];

        for( var t = 0; t < 12; t++ ){  
          //Character creation
          //tree = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
          var p = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
          //console.log(tree);
          if( castShadow ){
            p.castShadow = true;
            p.receiveShadow = true;
          }
          p.position.x = ( Math.random() * 8500 ) - 4250;
          p.position.y = 0;
          p.position.z = ( Math.random() * 8500 ) - 4250;

          p.rotation.x = Math.random() * 360 * ( Math.PI / 180);
          p.rotation.y = Math.random() * 360 * ( Math.PI / 180);
          p.rotation.z = Math.random() * 360 * ( Math.PI / 180);

          p.scale.x = p.scale.y = p.scale.z = 2 * Math.random() + 1.5;
          p.updateMatrix();

         presents.push( p )

          scene.add( p )
        }

       ;
    } );

    var loaderPresent3 = new THREE.ColladaLoader();
    loaderPresent.options.convertUpAxis = true;
    loaderPresent.load( 'collada/cadeau3.dae', function ( collada ) {
      dae = collada.scene;
      skin = collada.skins[ 0 ];

        for( var t = 0; t < 12; t++ ){  
          //Character creation
          //tree = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
          var p = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
          //console.log(tree);
          if( castShadow ){
            p.castShadow = true;
            p.receiveShadow = true;
          }
          p.position.x = ( Math.random() * 8500 ) - 4250;
          p.position.y = 0;
          p.position.z = ( Math.random() * 8500 ) - 4250;

          p.rotation.x = Math.random() * 360 * ( Math.PI / 180);
          p.rotation.y = Math.random() * 360 * ( Math.PI / 180);
          p.rotation.z = Math.random() * 360 * ( Math.PI / 180);

          p.scale.x = p.scale.y = p.scale.z = 2 * Math.random() + 1.5;
          p.updateMatrix();

         presents.push( p )

          scene.add( p )
        }

       ;
    } );

    var loaderPresent4 = new THREE.ColladaLoader();
    loaderPresent.options.convertUpAxis = true;
    loaderPresent.load( 'collada/cadeau4.dae', function ( collada ) {
      dae = collada.scene;
      skin = collada.skins[ 0 ];

        for( var t = 0; t < 12; t++ ){  
          //Character creation
          //tree = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
          var p = new THREE.Mesh( collada.scene.children[ 0 ].geometry, collada.scene.children[ 0 ].material );
          //console.log(tree);
          if( castShadow ){
            p.castShadow = true;
            p.receiveShadow = true;
          }
          p.position.x = ( Math.random() * 8500 ) - 4250;
          p.position.y = 0;
          p.position.z = ( Math.random() * 8500 ) - 4250;

          p.rotation.x = Math.random() * 360 * ( Math.PI / 180);
          p.rotation.y = Math.random() * 360 * ( Math.PI / 180);
          p.rotation.z = Math.random() * 360 * ( Math.PI / 180);

          p.scale.x = p.scale.y = p.scale.z = 2 * Math.random() + 1.5;
          p.updateMatrix();

         presents.push( p )

          scene.add( p )
        }

       ;
    } );
}