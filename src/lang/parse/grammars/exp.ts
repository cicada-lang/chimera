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
    "operand:quote": [{ literal: { $pattern: ["string"] } }],
    "operand:null": ['"null"'],
    "operand:true": ['"true"'],
	    "operand:false": ['"false"'],        
    "operand:objekt": [
      '"{"',
      { properties: { $ap: ["zero_or_more", "property", '","'] } },
      { last_property: "property" },
      { $ap: ["optional", '","'] },
      '"}"',
    ],
  },
}
