
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
    { name: 'Ritalina', id: 'A' },
    { name: 'Paracetamol', id: 'B' },
    { name: 'Analagesico', id: 'C' },
    { name: 'Medicamento D', id: 'D' },
    { name: 'Medicamento E', id: 'E' },
    { name: 'Medicamento F', id: 'F' },
    { name: 'Medicamento G', id: 'G' }
];

/** list of bank groups */
/*export const BANKGROUPS: MedicineGroup[] = [
    {
        name: 'Analgesicos',
        medicines: [
            { name: 'Bank A', id: 'A' },
            { name: 'Bank B', id: 'B' },
            { name: 'Bank B', id: 'B' },
        ]
    },
    {
        name: 'Antiácidos ',
        medicines: [
            { name: 'Bank C', id: 'C' },
            { name: 'Bank D', id: 'D' },
            { name: 'Bank E', id: 'E' },
        ]
    },
    {
        name: 'Antiinflamatorios',
        medicines: [
            { name: 'Bank F', id: 'F' },
            { name: 'Bank G', id: 'G' },
            { name: 'Bank H', id: 'H' },
            { name: 'Bank I', id: 'I' },
            { name: 'Bank J', id: 'J' },
        ]
    },
    {
        name: 'Antitusivos',
        medicines: [
            { name: 'Bank Kolombia', id: 'K' },
        ]
    },
    {
        name: 'Antidiarreicos ',
        medicines: [
            { name: 'Bank L', id: 'L' },
            { name: 'Bank M', id: 'M' },
            { name: 'Bank N', id: 'N' },
            { name: 'Bank O', id: 'O' },
            { name: 'Bank P', id: 'P' },
            { name: 'Bank Q', id: 'Q' },
            { name: 'Bank R', id: 'R' }
        ]
    }
];
*/