// id: 1,
// type: 'Respuesta simple', // [respuesta simple, seleccion unica, seleccion multiple, pregunta cuando cada opcion resive un valor]
// code: 'RS',
// input: 'input:number', // [radio, select, input:text.....]
// other: false, //TIENE LA OPCION DE:  OTRA(O)/ESPECIFICAR ...  
// grid: 'col-span-2 inline-flex ... ', // UI de la pregunta 

class Structure {
    constructor(id, type, code, input, other, grid) {
        this.id = id;
        this.type = type;
        this.code = code;
        this.input = input;
        this.other = other;
        this.grid = grid;
    }
};

const RS = new Structure(
    1,
    'Respuesta simple',
    'RS',
    'text', //input:text
    false,
    'col-span-2 inline-flex'
);

const RL = new Structure(
    2,
    'Respuesta larga',
    'RL',
    'textarea', //input:text
    false,
    'col-span-2 inline-flex'
);

const SU = new Structure(
    3,
    'Seleccion unica',
    'SU',
    'text', //input:text
    false,
    'col-span-2 inline-flex'
);

const SM = new Structure(
    4,
    'Respuesta simple',
    'SM',
    'text', //input:text
    false,
    'col-span-2 inline-flex'
);

const SD = new Structure(
    5,
    'Desplegable Respuesta simple',
    'SD',
    'text', //input:text
    false,
    'col-span-2 inline-flex'
);

const MR = new Structure(
    6,
    'Multiple respuesta',
    'MR',
    'text', //input:text
    false,
    'col-span-2 inline-flex'
);

export {
    RS,
    RL,
    SU,
    SM,
    SD,
    MR
};