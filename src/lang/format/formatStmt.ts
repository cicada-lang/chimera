import { indent } from "../../utils/indent.ts"
import { formatArgs, formatExp, formatGoalExp } from "../format/index.ts"
import type { ImportBinding, Stmt } from "../stmt/index.ts"

export function formatStmt(stmt: Stmt): string {
  switch (stmt["@kind"]) {
    case "Clause": {
      if (stmt.goals.length === 0 && stmt.name === undefined) {
        return `${stmt.relationName}${formatArgs(stmt.exps)}`
      }

      if (stmt.goals.length === 0 && stmt.name !== undefined) {
        return `${stmt.relationName}${formatArgs(stmt.exps)} -- ${stmt.name}`
      }

      const goals = stmt.goals.map(formatGoalExp)

      return `${stmt.relationName}${formatArgs(stmt.exps)} -- ${
        stmt.name
      } {\n${indent(goals.join("\n"))}\n}`
    }

    case "Let": {
      return `let ${formatExp(stmt.pattern)} = ${formatExp(stmt.exp)}`
    }

    case "Fn": {
      const stmts = stmt.stmts.map((stmt) => formatStmt(stmt))
      return `function ${stmt.name}${formatArgs(stmt.patterns)} {\n${indent(
        stmts.join("\n"),
      )}\n}`
    }

    case "Import": {
      const bindings = stmt.bindings.map(formatImportBinding)
      return `import { ${bindings.join(", ")} } from "${stmt.path}"`

      function formatImportBinding(binding: ImportBinding): string {
        return binding.alias === undefined
          ? binding.name
          : `${binding.name} as ${binding.alias}`
      }
    }

    case "ImportAll": {
      return `import * from "${stmt.path}"`
    }

    case "ImportAllAs": {
      return `import * as ${stmt.name} from "${stmt.path}"`
    }

    case "Export": {
      return `export ${formatStmt(stmt.stmt)}`
    }

    case "ExportNames": {
      return `export { ${stmt.names.join("\n")} }`
    }

    case "Compute": {
      return `compute ${formatExp(stmt.exp)}`
    }

    case "Print": {
      return `print ${formatExp(stmt.exp)}`
    }

    case "Assert": {
      return `assert ${formatExp(stmt.exp)}`
    }

    case "Return": {
      return `return ${formatExp(stmt.exp)}`
    }

    case "If": {
      const stmts = stmt.stmts.map((stmt) => formatStmt(stmt))

      if (stmt.elseIfs.length === 0 && stmt.elseStmts.length === 0) {
        return `if ${formatExp(stmt.target)} {\n${indent(stmts.join("\n"))}\n}`
      }

      const elseStmts = stmt.elseStmts.map((stmt) => formatStmt(stmt))

      if (stmt.elseIfs.length === 0) {
        return `if ${formatExp(stmt.target)} {\n${indent(
          stmts.join("\n"),
        )}\n} else {\n${indent(elseStmts.join("\n"))}\n}`
      }

      const elseIfs = stmt.elseIfs.map(
        ({ target, stmts }) =>
          `else if ${formatExp(stmt.target)} {\n${indent(
            stmts.map((stmt) => formatStmt(stmt)).join("\n"),
          )}\n}`,
      )

      return `if ${formatExp(stmt.target)} {\n${indent(
        stmts.join("\n"),
      )}\n} ${elseIfs.join(" ")} else {\n${indent(elseStmts.join("\n"))}\n}`
    }
  }
}
