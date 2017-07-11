export interface PlanetSchema {
	name: string;
	rotation_period: number;
	orbital_period: number;
	diameter: number;
	climate: string;
	gravity: string;
	terrain: string;
	surface_water: number;
	population: number;
	residents: string[],
	films: string[];
	created: string;
	edited: string;
	url: string;
}