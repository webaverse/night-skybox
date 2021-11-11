import {BoxGeometry,Mesh,Vector3,Vector4,TextureLoader,MeshBasicMaterial,BackSide,Object3D} from 'three';
import metaversefile from 'metaversefile';

const {useApp, useCleanup, useLoaders} = metaversefile;

const baseUrl = import.meta.url.replace(/(\/)[^\/\/]*$/, '$1');	



function createPathStrings(filename) {

  const fileType = ".png";

  const sides = ["px", "nx", "py", "ny", "pz", "nz"];

  const pathStings = sides.map(side => {

    return baseUrl + "textures/" + side + fileType;

  });

  return pathStings;

}

function createMaterialArray() {

  const skyboxImagepaths = createPathStrings();

  const materialArray = skyboxImagepaths.map(image => {

    let texture = new TextureLoader().load(image);

    return new MeshBasicMaterial({ map: texture, side: BackSide });

  });

  return materialArray;

}


export default () => {

  const app = useApp();

  let materialArray = createMaterialArray();

  let skyboxGeo = new BoxGeometry(1000, 1000, 1000);

  let skybox = new Mesh(skyboxGeo, materialArray);

  app.add(skybox);  

  return app;
};
