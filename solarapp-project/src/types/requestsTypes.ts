export interface IResponseAPI {
  structure_length: {
    height: number;
    width: number;
    square_size: number;
  };
  name: string;
  description: string;
  lat: number;
  lng: number;
}

export interface IStateLocations extends IResponseAPI {
  isSelected: boolean;
}
