import saleService from "./sale.service.js";

export const createSale = async (req, res) => {
  const { CustomerID, SaleDetails } = req.body;
  try {
    const result = await new saleService().createSale({ CustomerID, SaleDetails });
    res.status(201).send({
      status: "success",
      code: 1,
      message: "Sale created successfully",
      cause: "",
      result: result
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      code: 0,
      message: "Failed to create sale",
      cause: error.message,
      result: ""
    });
  }
}
