export type Json = JsonAtom | JsonArray | JsonObject

export type JsonAtom = string | number | boolean | null

export type JsonArray = Array<Json>

export type JsonObject = { [x: string]: Json }
