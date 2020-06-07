import 'js/sub';
import '@scss/app';
// import 'regenerator-runtime';
// import 'core-js';

const init = async () => {
  console.log('main js');
  await asyncFn();
};

async function asyncFn(){
    console.log([0,1,2].includes(0));
}

init();