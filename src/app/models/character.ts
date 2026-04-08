export interface Wand {
  wood: string;
  core: string;
  length: number | null;
}

export interface Character {
  id: string;
  name: string;
  species: string;
  house: string;
  wizard: boolean;
  ancestry: string;
  actor: string;
  image: string;
  dateOfBirth?: string;
  patronus?: string;
  wand: Wand;
}
