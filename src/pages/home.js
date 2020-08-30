import React from "react";
import Layout from "../containers/Layout";
import * as THREE from 'three';

class Home extends React.Component {
  state = {
    cameraPosition: null,
    groupRotation: null,
    obj: null,
    loaded: false,
  };

  componentDidMount() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial();

    const cube = new THREE.Mesh( geometry, material );
    scene.add(cube);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    this.scene = scene;
    this.camera = camera;
    this.geometry = geometry;
    this.material = material;
    this.renderer = renderer;
    this.cube = cube;

    this.mount.appendChild( renderer.domElement );

    const animate = () => {
      requestAnimationFrame( animate );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render( scene, camera );
    };

    animate();

    window.addEventListener('resize', this.onWindowResize, false);
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    return (
    <Layout>
      <div ref={mount => {this.mount = mount}}/>
    </Layout>
  );
  }
};

export default Home;
