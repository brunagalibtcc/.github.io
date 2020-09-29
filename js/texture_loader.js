const loader = new THREE.TextureLoader();

function loadTexture(filepath){
    return new Promise((resolve,reject)=>{
        const errorHandler = (err) => { 
            reject(err);
            console.error(err)
        };
        loader.load(
            filepath,
            (texture)=>resolve(texture),
            null,
            errorHandler,
        )
    })
}