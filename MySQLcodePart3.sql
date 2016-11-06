
/*-----PART 3-----*/

use Bamazon;

-- Creating Table
CREATE TABLE Departments (
DepartmentID INTEGER(11) AUTO_INCREMENT NOT NULL,
DepartmentName VARCHAR (100) NOT NULL,
OverHeadCosts DECIMAL(8,2),
TotalSales INTEGER(100),
PRIMARY KEY (DepartmentID)
);


INSERT INTO Departments (DepartmentName, OverHeadCosts, TotalSales)
VALUES ("Technology", 1500.90, 3000), ("Clothing", 126000.08, 15000), ("Beauty", 22600.55, 1000), ("Stationary", 1600.10, 1000);


SELECT * FROM Bamazon.Departments;