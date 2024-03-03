const express = require("express");
const Contact = require("../models/contactModel");

const router = express.Router();

// Endpoint pentru actualizarea stării favorite
router.patch("/:contactId/favorite", async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    if (typeof favorite !== "boolean") {
      return res
        .status(400)
        .json({ message: "missing or invalid 'favorite' field" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error.message);
    res.status(500).json({ message: "Failed to update contact" });
  }
});

module.exports = router;
