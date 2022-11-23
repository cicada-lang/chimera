export const exp = {
  $grammar: {
    "exp:operator": [{ operator: "operator" }],
    "exp:operand": [{ operand: "operand" }],
  },
}

export const operator = {
  $grammar: {
    "operator:var": [{ name: "name" }],
  },
}

export const operand = {
  $grammar: {
    "operand:null": ['"null"'],
    "operand:true": ['"true"'],
    "operand:false": ['"false"'],
    "operand:string": [{ data: { $pattern: ["string"] } }],
    "operand:number": [{ data: { $pattern: ["number"] } }],
    "operand:array": [
      '"["',
      { elements: { $ap: ["zero_or_more", "exp", '","'] } },
      { last_element: "exp" },
      { $ap: ["optional", '","'] },
      '"]"',
    ],
    "operand:array_cons": [
      '"["',
      { elements: { $ap: ["zero_or_more", "exp", '","'] } },
      { last_element: "exp" },
      { $ap: ["optional", '","'] },
      '"|"',
      { tail_element: "exp" },
      '"]"',
    ],
    "operand:array_empty": ['"["', '"]"'],
    "operand:objekt": [
      '"{"',
      { properties: { $ap: ["zero_or_more", "property", '","'] } },
      { last_property: "property" },
      { $ap: ["optional", '","'] },
      '"}"',
    ],
    "operand:objekt_empty": ['"{"', '"}"'],
    "operand:data": [
      { type: "name" },
      '":"',
      '":"',
      { kind: "name_no_preserved" },
      '"("',
      { args: { $ap: ["zero_or_more", "arg", '","'] } },
      { last_arg: "arg" },
      { $ap: ["optional", '","'] },
      '")"',
    ],
    "operand:data_empty": [
      { type: "name" },
      '":"',
      '":"',
      { kind: "name_no_preserved" },
    ],
  },
}
