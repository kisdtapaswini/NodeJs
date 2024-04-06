const createFactory = function (ElementModel) {
  console.log("createFactory recieved the request");

  console.log("called factory function");
  return async (req, res) => {
    try {
      // id
      const resourceDetails = req.body;
      const resource = await ElementModel.create(resourceDetails);
      console.log(req.body);
      res.status(201).json({
        message: "user created",
        resource: resource,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal server error",
        message: err.message,
      });
    }
  };
};

const getAllFactory = function (ElementModel) {
  console.log("called getAllFactory function");
  return async (res) => {
    try {
      const resource = await ElementModel.find();
      if (resource.length !== 0) {
        res.status(201).json({
          message: "Created successfully",
          resource: resource,
        });
      } else {
        res.status(404).json({
          message: "did not get any",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Internal server error",
        message: err.message,
      });
    }
  };
};

const updateFactory = function (ElementModel) {
  return async (req, res) => {
    try {
      const id = req.params.id;
      const toUpdateObject = req.body;

      const resource = await ElementModel.findByIdAndUpdate(
        id,
        toUpdateObject,
        {
          new: true,
        }
      );

      console.log("Received patch request");
      res.json({
        status: "success",
        message: user,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal server error",
        message: err.message,
      });
    }
  };
};
const deleteFactory = function (ElementModel) {
  return async (req, res) => {
    try {
      let { id } = req.params;
      const resource = await ElementModel.findByIdAndDelete(id);
      if (resource === null) {
        res.status(404).json({
          status: "sucess",
          message: "resource does not exist",
        });
      } else {
        res.status(200).json({
          status: "sucess",
          message: "user is deleted",
          user: resource,
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Internal server error",
        message: err.message,
      });
    }
  };
};

const getFactory = function (ElementModel) {
  return async (req, res) => {
    try {
      // template -> get the data from req.params
      const id = req.params.id;
      const resource = await ElementModel.findById(id);
      // if user is present -> send the resp
      if (resource) {
        res.status(200).json({
          message: resource,
        });
        // if it's not there then send user not found
      } else {
        res.status(404).json({
          message: "did not get the user",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Internal server error",
        message: err.message,
      });
    }
  };
};

module.exports = {
  createFactory,
  getAllFactory,
  updateFactory,
  deleteFactory,
  getFactory,
};
