export interface Pollution {
    titre: string;
    type: 'Plastique' | 'Chimique' | 'Dépôt sauvage' | 'Eau' | 'Air' | 'Autre';
    description: string;
    dateObservation: string; // ISO date
    lieu: string;
    latitude: number;
    longitude: number;
    photoUrl?: string;
}