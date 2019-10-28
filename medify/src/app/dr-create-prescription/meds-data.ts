
export interface Medicine {
    id: string;
    name: string;
}

export interface MedicineGroup {
    name: string;
    medicines: Medicine[];
}


/** list of medicines */
export const MEDICINES: Medicine[] = [
    { name: 'Sedalmerk 100mg', id: 'A' },
    { name: 'Tetravarona 10mg', id: 'B' },
    { name: 'Paracetamol 50mg', id: 'C' },
    { name: 'Ibuprofeno 100mg', id: 'D' },
    { name: 'Terfamex 30mg', id: 'E' },
    { name: 'Zypred 6ml F', id: 'F' },
    { name: 'Tamiflu 75mg', id: 'G' }
];

