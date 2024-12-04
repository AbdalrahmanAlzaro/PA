const { Services } = require("../models");

const createService = async (req, res) => {
  try {
    const { title, category, subcategory, address, description, contact } =
      req.body;
    const userId = req.userId;

    if (
      !req.files ||
      !req.files.mainImage ||
      req.files.mainImage.length === 0
    ) {
      return res.status(400).json({ message: "Main image is required." });
    }

    const mainImage = req.files.mainImage[0].path;
    const subImages = req.files.subImages
      ? req.files.subImages.map((file) => file.path)
      : [];

    const newService = await Services.create({
      userId,
      title,
      category,
      subcategory: subcategory || null,
      address,
      description,
      contact,
      mainImage,
      subImages,
    });

    res.status(201).json({
      message: "Service created successfully",
      service: newService,
    });
  } catch (error) {
    console.error("Service creation error:", error);
    res
      .status(500)
      .json({ message: "Error creating service", error: error.message });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Services.findAll();

    if (services.length === 0) {
      return res.status(404).json({ message: "No services found." });
    }

    res.status(200).json(services);
  } catch (error) {
    console.error("Error retrieving services:", error);
    res
      .status(500)
      .json({ message: "Error retrieving services", error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { title, category, subcategory, address, description, contact, id } =
      req.body;
    const serviceId = id;
    const userId = req.userId;

    const service = await Services.findOne({ _id: serviceId, userId });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (title) service.title = title;
    if (category) service.category = category;
    if (subcategory) service.subcategory = subcategory;
    if (address) service.address = address;
    if (description) service.description = description;
    if (contact) service.contact = contact;

    if (req.files && req.files.mainImage) {
      service.mainImage = req.files.mainImage[0].path;
    }

    if (req.files && req.files.subImages) {
      service.subImages = req.files.subImages.map((file) => file.path);
    }

    await service.save();

    res.status(200).json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Service update error:", error);
    res
      .status(500)
      .json({ message: "Error updating service", error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.body; // Get service ID from the body
    const userId = req.userId;

    if (!id) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    const service = await Services.findOne({ _id: id, userId });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.destroy();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Service deletion error:", error);
    res
      .status(500)
      .json({ message: "Error deleting service", error: error.message });
  }
};

module.exports = {
  createService,
  updateService,
  getAllServices,
  deleteService,
};
