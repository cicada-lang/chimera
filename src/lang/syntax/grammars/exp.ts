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
    "operand:list": [
      '"["',
      { elements: { $ap: ["zero_or_more", "exp", '","'] } },
      { last_element: "exp" },
      { $ap: ["optional", '","'] },
      '"]"',
    ],
    "operand:list_cons": [
      '"["',
      { elements: { $ap: ["zero_or_more", "exp", '","'] } },
      '"."',
      '"."',
      '"."',
      { last_element: "exp" },
      { $ap: ["optional", '","'] },
      '"]"',
    ],
    "operand:list_empty": ['"["', '"]"'],
    "operand:objekt": [
      '"{"',
      { properties: { $ap: ["zero_or_more", "property", '","'] } },
      { last_property: "property" },
      { $ap: ["optional", '","'] },
      '"}"',
    ],
    "operand:objekt_empty": ['"{"', '"}"'],
  },
}
