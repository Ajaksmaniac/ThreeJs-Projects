function init(){
    var stats = initStats();


    //podesavamo scenu
    var scene = new THREE.Scene();
    //pravimo kameru - definisemo sta i kako vidimo
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1,1000);

    //render i setuje webgl
    var renderer = new THREE.WebGLRenderer();
    //renderujemo scenu
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    //aktiviramo senku na nivout renderera
    renderer.shadowMap.enabled = true;



    
    
    

    const conegeometry = new THREE.ConeGeometry( 5, 20, 32 );
    const conematerial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const cone = new THREE.Mesh( conegeometry, conematerial );
    scene.add( cone );

    cone.rotation.z =  Math.PI;


    camera.position.z = 4;
    camera.lookAt(scene.position); 
    //dodajemo npr ambient osvetljenje
    var ambientLight = new THREE.AmbientLight(0xDEE4D0);
    scene.add(ambientLight);

    //spotlight za senku 
    var spotlight = new THREE.SpotLight(0x323636);
    spotlight.position.set(-30,25,-8);
    spotlight.castShadow = true;
    scene.add(spotlight);

    //prikazujemo render na nivou html-a / na nivou webgl-a appendChild
    document.getElementById("webgl-output").appendChild(renderer.domElement);
    //render funkcije / scene
    

    var step = 0;



    function renderScene(){
        stats.update();
        //rotacija kocke oko svih svojih osa
       /* cube.rotation.x += 0.03;
        cube.rotation.y += 0.03;
        cube.rotation.z += 0.03;
        //skog krug / bounce kruga
        step += 0.05;
        sphere.position.x = 20 + (20 * (Math.cos(step)));
        sphere.position.y =2 + (4 * Math.abs(Math.sin(step)));*/
        //render scene - request animation 
        requestAnimationFrame(renderScene);
        renderer.render(scene,camera);
        

    }

    renderScene();


}