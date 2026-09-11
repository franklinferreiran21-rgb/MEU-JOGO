let pular = false;


export function ativarPulo() {

  pular = true;

}


export function consumirPulo() {

  if (pular) {

    pular = false;

    return true;

  }


  return false;

}