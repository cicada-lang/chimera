export const exp = {
  $grammar: {
    "exp:operator": [{ operator: "operator" }],
    "exp:operand": [{ operand: "operand" }],
  },
}

export const operator = {
  $grammar: {
    "operator:var": [{ name: "variable_name" }],
    "operator:dot": [
      { target: "operator" },
      '"."',
      { name: "name_no_preserved" },
    ],
    "operator:ap": [{ target: "operator" }, { args: "args" }],
  },
}

export const operand = {
  $grammar: {
    "operand:null": ['"null"'],
    "operand:true": ['"true"'],
    "operand:false": ['"false"'],
    "operand:string": [{ data: { $pattern: ["string"] } }],
    "operand:number": [{ data: { $pattern: ["number"] } }],
    "operand:term": [
      { type: "relation_name" },
      '":"',
      '":"',
      { kind: "relation_name" },
      { args: "args" },
    ],
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
    "operand:fn": [
      { patterns: "args" },
      '"="',
      '">"',
      '"{"',
      { stmts: "stmts" },
      '"}"',
    ],
    "operand:fn_with_exp": [{ patterns: "args" }, '"="', '">"', { ret: "exp" }],
    "operand:eval": ['"eval"', { exp: "exp" }],
    "operand:find": [
      '"find"',
      { pattern: "exp" },
      { limit: { $ap: ["optional", '"limit"', { $pattern: ["number"] }] } },
      '"{"',
      { goals: "goals" },
      '"}"',
    ],
    "operand:if": [
      '"if"',
      { target: "exp" },
      '"then"',
      { thenExp: "exp" },
      '"else"',
      { elseExp: "exp" },
    ],
    "operand:if_without_else": [
      '"if"',
      { target: "exp" },
      '"then"',
      { thenExp: "exp" },
    ],
    "operand:match": [
      '"match"',
      { target: "exp" },
      '"{"',
      { cazes: "cazes" },
      '"}"',
    ],
  },
}
