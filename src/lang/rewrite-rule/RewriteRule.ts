export type RewriteRule = Case | List

export type Case = {
  "@type": "RewriteRule"
  "@kind": "Case"
}

export function Case(): Case {
  return {
    "@type": "RewriteRule",
    "@kind": "Case",
  }
}

export type List = {
  "@type": "RewriteRule"
  "@kind": "List"
}

export function List(): List {
  return {
    "@type": "RewriteRule",
    "@kind": "List",
  }
}
