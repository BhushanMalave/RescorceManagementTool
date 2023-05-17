export interface userdetails {
  email: string;
  password: string;
}

export interface employee {
  id: string;
  name: string;
  joiningDate: string;
  designation: string;
  technologies: string;
}

export interface designation {
  id: string;
  name: string;
}

export interface project {
  id: string;
  name: string;
  startDate: string;
  technologies: string;
  status: string;
  employees: {
    id: string;
    name: string;
    joiningDate: string;
    designation: string;
    technologies: string;
  }[];
}
