// In order to illustrate what the system does,
// we will show how it can be used to manage the database of personnel records
// for a thriving high-technology company in the Boston area.

// The language provides pattern-directed access to personnel information
// and can also take advantage of general rules in order to make logical deductions.

// # A sample database

// Here is the information about Ben Bitdiddle,
// the resident computer wizard:

relation Job({
  name: "Bitdiddle Ben",
  dept: "computer",
  role: "wizard",
})

relation Salary({
  name: "Bitdiddle Ben",
  amount: 60000,
})

relation Address({
  name: "Bitdiddle Ben",
  town: "Slumerville",
  road: "Ridge Road",
  door: 10,
})

// As resident wizard,
// Ben is in charge of the company's computer division,
// and he supervises two programmers and one technician.

// Here is the information about them:

relation Address({
  name: "Hacker Alyssa P",
  town: "Cambridge",
  road: "Mass Ave",
  door: 78,
})

relation Job({
  name: "Hacker Alyssa P",
  dept: "computer",
  role: "programmer",
})

relation Salary({
  name: "Hacker Alyssa P",
  amount: 40000,
})

relation Supervisor({
  slave: "Hacker Alyssa P",
  master: "Bitdiddle Ben",
})

relation Address({
  name: "Fect Cy D",
  town: "Cambridge",
  road: "Ames Street",
  door: 3,
})

relation Job({
  name: "Fect Cy D",
  dept: "computer",
  role: "programmer",
})

relation Salary({
  name: "Fect Cy D",
  amount: 35000,
})

relation Supervisor({
  slave: "Fect Cy D",
  master: "Bitdiddle Ben",
})

relation Address({
  name: "Tweakit Lem E",
  town: "Boston",
  road: "Bay State Road",
  door: 22,
})

relation Job({
  name: "Tweakit Lem E",
  dept: "computer",
  role: "technician",
})

relation Salary({
  name: "Tweakit Lem E",
  amount: 25000,
})

relation Supervisor({
  slave: "Tweakit Lem E",
  master: "Bitdiddle Ben",
})

// There is also a programmer trainee,
// who is supervised by Alyssa:

relation Address({
  name: "Reasoner Louis",
  town: "Slumerville",
  road: "Pine Tree Road",
  door: 80,
})

relation Job({
  name: "Reasoner Louis",
  dept: "computer",
  role: "programmer trainee",
})

relation Salary({
  name: "Reasoner Louis",
  amount: 30000,
})

relation Supervisor({
  slave: "Reasoner Louis",
  master: "Hacker Alyssa P",
})

// Ben is a high-level employee.
// His supervisor is the company's big wheel himself:

relation Supervisor({
  slave: "Bitdiddle Ben",
  master: "Warbucks Oliver",
})

relation Address({
  name: "Warbucks Oliver",
  town: "Swellesley",
  road: "The Manor",
  door: 1,
})

relation Job({
  name: "Warbucks Oliver",
  dept: "administration",
  role: "big wheel",
})

relation Salary({
  name: "Warbucks Oliver",
  amount: 150000,
})

// Besides the computer division supervised by Ben,
// the company has an accounting division,
// consisting of a chief accountant and his assistant:

relation Address({
  name: "Scrooge Eben",
  town: "Weston",
  road: "Shady Lane",
  door: 10,
})

relation Job({
  name: "Scrooge Eben",
  dept: "accounting",
  role: "chief accountant",
})

relation Salary({
  name: "Scrooge Eben",
  amount: 75000,
})

relation Supervisor({
  slave: "Scrooge Eben",
  master: "Warbucks Oliver",
})

relation Address({
  name: "Cratchet Robert",
  town: "Allston",
  road: "N Harvard Street",
  door: 16,
})

relation Job({
  name: "Cratchet Robert",
  dept: "accounting",
  role: "scrivener",
})

relation Salary({
  name: "Cratchet Robert",
  amount: 18000,
})

relation Supervisor({
  slave: "Cratchet Robert",
  master: "Scrooge Eben",
})

// There is also a secretary for the big wheel:

relation Address({
  name: "Aull DeWitt",
  town: "Slumerville",
  road: "Onion Square",
  door: 5,
})

relation Job({
  name: "Aull DeWitt",
  dept: "administration",
  role: "secretary",
})

relation Salary({
  name: "Aull DeWitt",
  amount: 25000,
})

relation Supervisor({
  slave: "Aull DeWitt",
  master: "Warbucks Oliver",
})

// The database also contains assertions about
// which kinds of jobs can be done
// by people holding other kinds of jobs.

// For instance, a computer wizard can do
// the jobs of both a computer programmer
// and a computer technician:

relation Competence({
  can: {
    dept: "computer",
    role: "wizard",
  },
  job: {
    dept: "computer",
    role: "programmer",
  },
})

relation Competence({
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

relation Competence({
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

relation Competence({
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

// To find all computer programmers one can say

print find coder {
  Job({
    name: coder,
    dept: "computer",
    role: "programmer",
  })
}

// The input print find specifies that
// we are looking for entries in the database
// that match a certain pattern.

// coder is a pattern variable,

// The system responds to a simple query
// by showing all entries in the data base
// that match the specified pattern.

// A pattern can have more than one variable.

// An employee's addresses

print find [town, road, door] {
  Address({
    name: "Bitdiddle Ben",
    town,
    road,
    door,
  })
}

// All employees at computer dept

print find [name, role] {
  Job({
    name,
    dept: "computer",
    role,
  })
}

print find dept {
  Job({
    name: "Hacker Alyssa P",
    role: "programmer",
    dept,
  })
}

print find x {
  Supervisor({
    slave: x,
    master: x,
  })
}

// # Rules

// We can use the following syntax to create rules.

relation ComputerDeptSlave({ slave })
---------------------------- {
  Job({ name: slave, dept: "computer" })
  Supervisor({ slave })
}

print find slave {
  ComputerDeptSlave({ slave })
}

// TODO We do not have `not` yet.

// relation Bigshot({ name, dept })
// ------------------------ {
//   Job({ name, dept })
//   not {
//     Supervisor({ slave: name, master: z })
//     Job({ name: z, dept })
//   }
// }

// print find [name, dept] {
//   Bigshot({
//     name,
//     dept,
//   })
// }

// TODO `>=`

// relation NotSoPoor({ name, amount })
// ---------------------------- {
//   Salary({ name, amount })
//   FD::GtEq(amount, 40000)
// })

// print find [name, amount] {
//   NotSoPoor({
//     name,
//     amount,
//   })
// }
