// In order to illustrate what the query system does,
// we will show how it can be used to manage the database of personnel records
// for a thriving high-technology company in the Boston area.

// The language provides pattern-directed access to personnel information
// and can also take advantage of general rules in order to make logical deductions.

// # A sample database

// The personnel database contains assertions about company personnel.
// We first prepare the tables:

interface Job {
  name: String
  dept: String
  role: String
}

interface Salary {
  name: String
  amount: Number
}

interface Address {
  name: String
  town: String
  road: String
  door: Number
}

interface Supervisor {
  slave: String
  master: String
}

// Here is the information about Ben Bitdiddle,
// the resident computer wizard:

Job {
  name: "Bitdiddle Ben",
  dept: "computer",
  role: "wizard",
}

Salary {
  name: "Bitdiddle Ben",
  amount: 60000,
}

Address {
  name: "Bitdiddle Ben",
  town: "Slumerville",
  road: "Ridge Road",
  door: 10,
}

// As resident wizard,
// Ben is in charge of the company's computer division,
// and he supervises two programmers and one technician.

// Here is the information about them:

Address {
  name: "Hacker Alyssa P",
  town: "Cambridge",
  road: "Mass Ave",
  door: 78,
}

Job {
  name: "Hacker Alyssa P",
  dept: "computer",
  role: "programmer",
}

Salary {
  name: "Hacker Alyssa P",
  amount: 40000,
}

Supervisor {
  slave: "Hacker Alyssa P",
  master: "Bitdiddle Ben",
}

Address {
  name: "Fect Cy D",
  town: "Cambridge",
  road: "Ames Street",
  door: 3,
}

Job {
  name: "Fect Cy D",
  dept: "computer",
  role: "programmer",
}

Salary {
  name: "Fect Cy D",
  amount: 35000,
}

Supervisor {
  slave: "Fect Cy D",
  master: "Bitdiddle Ben",
}

Address {
  name: "Tweakit Lem E",
  town: "Boston",
  road: "Bay State Road",
  door: 22,
}

Job {
  name: "Tweakit Lem E",
  dept: "computer",
  role: "technician",
}

Salary {
  name: "Tweakit Lem E",
  amount: 25000,
}

Supervisor {
  slave: "Tweakit Lem E",
  master: "Bitdiddle Ben",
}

// There is also a programmer trainee,
// who is supervised by Alyssa:

Address {
  name: "Reasoner Louis",
  town: "Slumerville",
  road: "Pine Tree Road",
  door: 80,
}

Job {
  name: "Reasoner Louis",
  dept: "computer",
  role: "programmer trainee",
}

Salary {
  name: "Reasoner Louis",
  amount: 30000,
}

Supervisor {
  slave: "Reasoner Louis",
  master: "Hacker Alyssa P",
}

// Ben is a high-level employee.
// His supervisor is the company's big wheel himself:

Supervisor {
  slave: "Bitdiddle Ben",
  master: "Warbucks Oliver",
}

Address {
  name: "Warbucks Oliver",
  town: "Swellesley",
  road: "The Manor",
  door: 1,
}

Job {
  name: "Warbucks Oliver",
  dept: "administration",
  role: "big wheel",
}

Salary {
  name: "Warbucks Oliver",
  amount: 150000,
}

// Besides the computer division supervised by Ben,
// the company has an accounting division,
// consisting of a chief accountant and his assistant:

Address {
  name: "Scrooge Eben",
  town: "Weston",
  road: "Shady Lane",
  door: 10,
}

Job {
  name: "Scrooge Eben",
  dept: "accounting",
  role: "chief accountant",
}

Salary {
  name: "Scrooge Eben",
  amount: 75000,
}

Supervisor {
  slave: "Scrooge Eben",
  master: "Warbucks Oliver",
}

Address {
  name: "Cratchet Robert",
  town: "Allston",
  road: "N Harvard Street",
  door: 16,
}

Job {
  name: "Cratchet Robert",
  dept: "accounting",
  role: "scrivener",
}

Salary {
  name: "Cratchet Robert",
  amount: 18000,
}

Supervisor {
  slave: "Cratchet Robert",
  master: "Scrooge Eben",
}

// There is also a secretary for the big wheel:

Address {
  name: "Aull DeWitt",
  town: "Slumerville",
  road: "Onion Square",
  door: 5,
}

Job {
  name: "Aull DeWitt",
  dept: "administration",
  role: "secretary",
}

Salary {
  name: "Aull DeWitt",
  amount: 25000,
}

Supervisor {
  slave: "Aull DeWitt",
  master: "Warbucks Oliver",
}

// The database also contains assertions about
// which kinds of jobs can be done
// by people holding other kinds of jobs.

// For instance, a computer wizard can do
// the jobs of both a computer programmer
// and a computer technician:

interface Competence {
  can: {
    dept: String
    role: String
  }
  job: {
    dept: String
    role: String
  }
}

Competence {
  can: {
    dept: "computer",
    role: "wizard",
  },
  job: {
    dept: "computer",
    role: "programmer",
  },
}

Competence {
  can: {
    dept: "computer",
    role: "wizard",
  },
  job: {
    dept: "computer",
    role: "technician",
  },
}

// A computer programmer could fill in for a trainee:

Competence {
  can: {
    dept: "computer",
    role: "programmer",
  },
  job: {
    dept: "computer",
    role: "programmer trainee",
  },
}

// Also, as is well known,

Competence {
  can: {
    dept: "administration",
    role: "secretary",
  },
  job: {
    dept: "administration",
    role: "big wheel",
  },
}

// # Simple queries

// The query language allows users
// to retrieve information from the database.
// For example, to find all computer programmers one can say

query (coder) {
  Job {
    name: coder,
    dept: "computer",
    role: "programmer",
  }
}

// We also make assertion about the results.

query (coder) {
  Job {
    name: coder,
    dept: "computer",
    role: "programmer",
  }
} assert [{ coder: "Hacker Alyssa P" }, { coder: "Fect Cy D" }],

// The input query specifies that
// we are looking for entries in the database
// that match a certain pattern.

// coder is a pattern variable,

// The system responds to a simple query
// by showing all entries in the data base
// that match the specified pattern.

// A pattern can have more than one variable.

// An employee's addresses

query (town, road, door) {
  Address {
    name: "Bitdiddle Ben",
    town,
    road,
    door,
  }
}

// All employees at computer dept

query (name, role) {
  Job {
    name,
    dept: "computer",
    role,
  }
}

// We can use `success` to assert
// there is at least one solution of the query,
// or use `failure` to assert there is no solution.

success (dept) {
  Job {
    name: "Hacker Alyssa P",
    role: "programmer",
    dept,
  }
}

failure (x) {
  Supervisor {
    slave: x,
    master: x,
  }
}

// # Rules

// We can use the following syntax to create rules.

interface ComputerDeptSlave {
  slave: String
}

ComputerDeptSlave { slave }
---------------------------- {
  fresh (role, z) {
    Job { name: slave, dept: "computer", role }
    Supervisor { slave, master: z }
  }
})

query (slave) {
  ComputerDeptSlave { slave }
}

// TODO We do not have not yet.

interface Bigshot {
  name: String
  dept: String
}

Bigshot { name, dept }
------------------------ {
  Job { name, dept }
  fresh (z) {
    not {
      Supervisor { slave: name, master: z }
      Job { name: z, dept }
    }
  }
})

query (name, dept) {
  Bigshot {
    name,
    dept,
  }
}

interface NotSoPoor {
  name: String
  amount: Number
}

NotSoPoor { name, amount }
---------------------------- {
  Salary { name, amount }
  equation amount >= 40000
})

query (name, amount) {
  NotSoPoor {
    name,
    amount,
  }
}
