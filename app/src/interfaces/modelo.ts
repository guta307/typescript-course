import { Comparavel } from "./comparavel.js";
import { Imprimivel } from "./imprimivels.js";

export interface Modelo<T> extends Imprimivel, Comparavel<T> {}
