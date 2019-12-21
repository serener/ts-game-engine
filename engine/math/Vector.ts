export default interface Vector {
    plus(vector : Vector) : Vector;
    minus(vector : Vector) : Vector;
    scale(scalar : number) : Vector;
    get(coordinateLabel : string) : number;
    set(coordinateLabel : string, value : number);
    getCoordinates() : Map<string, number>;
}