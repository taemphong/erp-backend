import EmpService from "./emp.service.js";

export const addemployee = async (req, res) => {
  const employees = {
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    PhoneNumber: req.body.PhoneNumber,
    Position: req.body.Position,
    Department: req.body.Department,
    Salary: req.body.Salary,
  };

  try {
    const result = await new EmpService().addemployee(employees);

    if (result.affectedRows) {
      res.status(200).send({
        status: "สำเร็จ",
        code: 1,
        message: "",
        cause: "",
        result,
      });
    }
  } catch (err) {
    res.status(400).send({
      status: "err",
      code: 1,
      message: err.message,
      cause: ""
    });
  }
};

export const getalleployee = async (req, res) =>{
  try{
    const result = await new EmpService().getalleployee();
    if (result.length){
      res.status(200).send({
        status: "สำเร็จ",
        code: 1,
        message: "",
        cause: "",
        result
      })
    }

  }catch(error){
    res.status(400).send({
      status: "err",
      code: 1,
      message: err.message,
      cause: ""
    });

  }
}
