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

    //POVRSINA >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //pravimo povrsinu(radna povrsina, geometrija povrsine itd.)
    var planeGeometry = new THREE.PlaneGeometry(50,40,15,2);
    //definisemo boju povrsine  / podlgoge
    var planeMeterial = new THREE.MeshLambertMaterial({color: 0x1F8DF0});
    var plane = new THREE.Mesh(planeGeometry,planeMeterial);
    
    //povrsina prihvata senku / ukljucujemo senku nad povrsinom
    plane.receiveShadow = true;
    //rotacija i pozicija povrsine 
    plane.rotation.x = -0.6 * Math.PI;
    plane.position.x = 10;
    plane.position.y = -10;
    plane.position.z - 0;
    //dodajemo pod na scenu 
    scene.add(plane);


    //KOCKA>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    
    //pravimo kocku
    var cubeGeometry = new THREE.BoxGeometry(3,3,3)
    
    //boja kocke
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xD9273F});
    var cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
    cube.castShadow = true;

    //pozicija kocke
    cube.position.x = -3;
    cube.position.y = 3;
    cube.position.x = 0;
    //dodavanje kocke na scenu
    scene.add(cube);        

    //KRUG>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //pravimo krug
    var spehereGeometry = new THREE.SphereGeometry(7,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color : 0xf7A82A});
    var sphere = new THREE.Mesh(spehereGeometry,sphereMaterial);
   
    
    //pozicioniramo krug
    sphere.position.x = 20;
    sphere.position.y = 0;
    sphere.position.z = 5
    sphere.castShadow = true;
    //postavljamo krug na scenu
    scene.add(sphere)

    

    //TEHNICKI DELOVI >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    camera.position.x = -50;
    camera.position.y = 20;
    camera.position.z = 40;
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
    renderScene();

    var step = 0;



    function renderScene(){
        stats.update();
        //rotacija kocke oko svih svojih osa
        cube.rotation.x += 0.03;
        cube.rotation.y += 0.03;
        cube.rotation.z += 0.03;
        //skog krug / bounce kruga
        step += 0.05;
        sphere.position.x = 20 + (20 * (Math.cos(step)));
        sphere.position.y =2 + (4 * Math.abs(Math.sin(step)));
        //render scene - request animation 
        requestAnimationFrame(renderScene);
        renderer.render(scene,camera);

    }

    


}