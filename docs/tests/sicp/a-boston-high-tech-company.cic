import Logic, { v, ty, and } from "../.."

// In order to illustrate what the query system does,
// we will show how it can be used to manage the database of personnel records
// for a thriving high-technology company in the Boston area.

// The language provides pattern-directed access to personnel information
// and can also take advantage of general rules in order to make logical deductions.

// # A sample database

// The personnel database contains assertions about company personnel.
// We first prepare the tables:

const job = new Logic.Table({
  name: "job",
  schema: ty.object({
    name: ty.string(),
    dept: ty.string(),
    role: ty.string(),
  }),
})

const salary = new Logic.Table({
  name: "salary",
  schema: ty.object({
    name: ty.string(),
    amount: ty.number(),
  }),
})

const address = new Logic.Table({
  name: "address",
  schema: ty.object({
    name: ty.string(),
    town: ty.string(),
    road: ty.string(),
    door: ty.number(),
  }),
})

const supervisor = new Logic.Table({
  name: "supervisor",
  schema: ty.object({
    slave: ty.string(),
    master: ty.string(),
  }),
})

// Here is the information about Ben Bitdiddle,
// the resident computer wizard:

job.i({
  name: "Bitdiddle Ben",
  dept: "computer",
  role: "wizard",
})

salary.i({
  name: "Bitdiddle Ben",
  amount: 60000,
})

address.i({
  name: "Bitdiddle Ben",
  town: "Slumerville",
  road: "Ridge Road",
  door: 10,
})

// As resident wizard,
// Ben is in charge of the company's computer division,
// and he supervises two programmers and one technician.

// Here is the information about them:

address.i({
  name: "Hacker Alyssa P",
  town: "Cambridge",
  road: "Mass Ave",
  door: 78,
})

job.i({
  name: "Hacker Alyssa P",
  dept: "computer",
  role: "programmer",
})

salary.i({
  name: "Hacker Alyssa P",
  amount: 40000,
})

supervisor.i({
  slave: "Hacker Alyssa P",
  master: "Bitdiddle Ben",
})

address.i({
  name: "Fect Cy D",
  town: "Cambridge",
  road: "Ames Street",
  door: 3,
})

job.i({
  name: "Fect Cy D",
  dept: "computer",
  role: "programmer",
})

salary.i({
  name: "Fect Cy D",
  amount: 35000,
})

supervisor.i({
  slave: "Fect Cy D",
  master: "Bitdiddle Ben",
})

address.i({
  name: "Tweakit Lem E",
  town: "Boston",
  road: "Bay State Road",
  door: 22,
})

job.i({
  name: "Tweakit Lem E",
  dept: "computer",
  role: "technician",
})

salary.i({
  name: "Tweakit Lem E",
  amount: 25000,
})

supervisor.i({
  slave: "Tweakit Lem E",
  master: "Bitdiddle Ben",
})

// There is also a programmer trainee,
// who is supervised by Alyssa:

address.i({
  name: "Reasoner Louis",
  town: "Slumerville",
  road: "Pine Tree Road",
  door: 80,
})

job.i({
  name: "Reasoner Louis",
  dept: "computer",
  role: "programmer trainee",
})

salary.i({
  name: "Reasoner Louis",
  amount: 30000,
})

supervisor.i({
  slave: "Reasoner Louis",
  master: "Hacker Alyssa P",
})

// Ben is a high-level employee.
// His supervisor is the company's big wheel himself:

supervisor.i({
  slave: "Bitdiddle Ben",
  master: "Warbucks Oliver",
})

address.i({
  name: "Warbucks Oliver",
  town: "Swellesley",
  road: "The Manor",
  door: 1,
})

job.i({
  name: "Warbucks Oliver",
  dept: "administration",
  role: "big wheel",
})

salary.i({
  name: "Warbucks Oliver",
  amount: 150000,
})

// Besides the computer division supervised by Ben,
// the company has an accounting division,
// consisting of a chief accountant and his assistant:

address.i({
  name: "Scrooge Eben",
  town: "Weston",
  road: "Shady Lane",
  door: 10,
})

job.i({
  name: "Scrooge Eben",
  dept: "accounting",
  role: "chief accountant",
})

salary.i({
  name: "Scrooge Eben",
  amount: 75000,
})

supervisor.i({
  slave: "Scrooge Eben",
  master: "Warbucks Oliver",
})

address.i({
  name: "Cratchet Robert",
  town: "Allston",
  road: "N Harvard Street",
  door: 16,
})

job.i({
  name: "Cratchet Robert",
  dept: "accounting",
  role: "scrivener",
})

salary.i({
  name: "Cratchet Robert",
  amount: 18000,
})

supervisor.i({
  slave: "Cratchet Robert",
  master: "Scrooge Eben",
})

// There is also a secretary for the big wheel:

address.i({
  name: "Aull DeWitt",
  town: "Slumerville",
  road: "Onion Square",
  door: 5,
})

job.i({
  name: "Aull DeWitt",
  dept: "administration",
  role: "secretary",
})

salary.i({
  name: "Aull DeWitt",
  amount: 25000,
})

supervisor.i({
  slave: "Aull DeWitt",
  master: "Warbucks Oliver",
})

// The database also contains assertions about
// which kinds of jobs can be done
// by people holding other kinds of jobs.

// For instance, a computer wizard can do
// the jobs of both a computer programmer
// and a computer technician:

const competence = new Logic.Table({
  name: "competence",
  schema: ty.object({
    can: ty.object({
      dept: ty.string(),
      role: ty.string(),
    }),
    job: ty.object({
      dept: ty.string(),
      role: ty.string(),
    }),
  }),
})

competence.i({
  can: {
    dept: "computer",
    role: "wizard",
  },
  job: {
    dept: "computer",
    role: "programmer",
  },
})

competence.i({
  can: {
    dept: "computer",
    role: "wizard",
  },
  job: {
    dept: "computer",
    role: "technician",
  },
})

// A computer programmer could fill in for a trainee:

competence.i({
  can: {
    dept: "computer",
    role: "programmer",
  },
  job: {
    dept: "computer",
    role: "programmer trainee",
  },
})

// Also, as is well known,

competence.i({
  can: {
    dept: "administration",
    role: "secretary",
  },
  job: {
    dept: "administration",
    role: "big wheel",
  },
})

// # Simple queries

// The query language allows users
// to retrieve information from the database.
// For example, to find all computer programmers one can say

console.log(
  job.query({
    name: v`coder`,
    dept: "computer",
    role: "programmer",
  })
)

// We can also use the `Table.find` method of a table,
// and use projections and schemas to specify we are interested in which variables,
// the returned results will be well typed -- due to the use of schemas.

console.log(
  job.find(
    {
      name: v`coder`,
      dept: "computer",
      role: "programmer",
    },
    { coder: ty.string() }
  )
)

// The system will respond with the following solutions:

//   [{ coder: 'Hacker Alyssa P' }, { coder: 'Fect Cy D' }]

// We also make assertion about the results.

job.assertFindResults({
  data: {
    name: v`coder`,
    dept: "computer",
    role: "programmer",
  },
  projections: { coder: ty.string() },
  results: [{ coder: "Hacker Alyssa P" }, { coder: "Fect Cy D" }],
})

// The input query specifies that
// we are looking for entries in the database
// that match a certain pattern.

// v`coder` is a pattern variable,

// The system responds to a simple query
// by showing all entries in the data base
// that match the specified pattern.

// A pattern can have more than one variable.

// An employee's addresses

console.log(
  address.query({
    name: "Bitdiddle Ben",
    town: v`town`,
    road: v`road`,
    door: v`door`,
  })
)

// All employees at computer dept

console.log(
  job.query({
    name: v`name`,
    dept: "computer",
    role: v`role`,
  })
)

// We can use `Table.assertSuccess` to assert
// there is at least one solution of the query,
// or use `Table.assertFailure` to assert there is no solution.

job.assertSuccess({
  name: "Hacker Alyssa P",
  role: "programmer",
  dept: v`dept`,
})

supervisor.assertFailure({
  slave: v`x`,
  master: v`x`,
})

// # Compound queries

// We create new `Table` to specify compound queries.

const computer_dept_slave = new Logic.Table({
  name: "computer_dept_slave",
  schema: ty.object({
    slave: ty.string(),
  }),
})

computer_dept_slave.i({ slave: v`slave` }, (v) => [
  job.o({ name: v`slave`, dept: "computer", role: v`role` }),
  supervisor.o({ slave: v`slave`, master: v`z` }),
])

computer_dept_slave.query({
  slave: v`slave`,
})

// TODO We do not have `not` yet.

const bigshot = new Logic.Table({
  name: "bigshot",
  schema: ty.object({
    name: ty.string(),
    dept: ty.string(),
  }),
})

// bigshot.i({ name: v`name`, dept: v`dept` }, (v) => [
//   job.o({ name: v`name`, dept: v`dept` }),
//   not(
//     and(
//       supervisor.o({ slave: v`name`, master: v`z` }),
//       job.o({ name: v`z`, dept: v`dept` })
//     )
//   ),
// ])

// bigshot.query({
//   name: v`name`,
//   dept: v`dept`,
// })

// TODO We do not have `assert` yet.

const not_so_poor = new Logic.Table({
  name: "not_so_poor",
  schema: ty.object({
    name: ty.string(),
    amount: ty.number(),
  }),
})

// not_so_poor.i({ name: v`name`, amount: v`amount` }, (v, ctx) => [
//   salary.o({ name: v`name`, amount: v`amount` }),
//   assert(ctx.get(v`amount`) >= 40000),
// ])

// not_so_poor.query({
//   name: v`name`,
//   amount: v`amount`,
// })
