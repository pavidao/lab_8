function Employee(name, lastName, baseSalary, experience) {
  this.name = name;
  this.lastName = lastName;
  this.baseSalary = baseSalary;
  this.experience = experience;
  }
  
  Employee.prototype.giveSalary = function () {
  document.write(
  "<p>" +
  this.name  +
  " " +
  this.lastName +
  " отримує " +
  this.getSalary() +
  " USD " +
  "</p>"
  );
  };
  
  Employee.prototype.getSalary = function () {
  let countedSalary = this.baseSalary;
  if (this.experience >= 2 && this.experience < 5) {
  countedSalary = countedSalary + 200;
  } else if (this.experience >= 5) {
  countedSalary = countedSalary * 1.2 + 500;
  }
  return countedSalary;
  };
  
  function Designer(name, lastName, baseSalary, experience, coef) {
  Employee.call(this, name, lastName, baseSalary, experience);
  this.coef = coef;
  }
  
  Designer.prototype = Object.create(Employee.prototype);
  
  Designer.prototype.getSalary = function () {
  let countedSalary = Employee.prototype.getSalary.call(this);
  return countedSalary * this.coef;
  };
  
  function Developer(name, lastName, baseSalary, experience) {
  Employee.call(this, name, lastName, baseSalary, experience);
  }
  
  Developer.prototype = Object.create(Employee.prototype);
  
  function Manager(name, lastName, baseSalary, experience, team) {
  Employee.call(this, name, lastName, baseSalary, experience);
  this.team = team;
  }
  
  Manager.prototype = Object.create(Employee.prototype);
  
  Manager.prototype.getSalary = function () {
  let countedSalary = Employee.prototype.getSalary.call(this);
  
  if (this.team.length >= 5 && this.team.length < 10) {
  countedSalary = countedSalary + 200;
  } else if (this.team.length >= 10) {
  countedSalary = countedSalary + 300;
  }
  
  let facSlaves = 0;
  for (key in this.team) {
  if (this.team[key] instanceof Developer) {
  facSlaves++;
  }
  }
  if (facSlaves > this.team.length / 2) {
  countedSalary *= 1.1;
  }
  return countedSalary;
  };
  
  function Department() {
  this.managers = [];
  }
  
  Department.prototype.giveSalary = function () {
  this.managers.forEach(function (manager) {
  manager.giveSalary();
  manager.team.forEach(function (slaves) {
  slaves.giveSalary();
  });
  });
  };
  
  function main() {
  const dev = new Developer("Бенедикт", "Банановський", 1000, 5);
  const dev2 = new Developer("Гвендон", "Галасконіжка", 1000, 1);
  const dev3 = new Developer("Баррі", "Джмелик", 1200, 9);
  const dev4 = new Developer("Мілтон", "Фантастер", 1100, 9);
  const des = new Designer("Олівер", "Крикуньо", 1200, 6, 0.5);
  const des1 = new Designer("Бартоломій", "Мішкодзьоб", 1000, 6, 0.7);
  const manager = new Manager("Леонардо", "Моркивнський", 1400, 5, [
  dev,
  dev2,
  dev3,
  dev4,
  des,
  des1,
  ]);
  
  const department = new Department();
  department.managers.push(manager);
  department.giveSalary();
  }
  
  main();