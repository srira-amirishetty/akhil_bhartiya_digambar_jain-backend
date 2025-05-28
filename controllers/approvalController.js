const Approval = require('../models/Approval');

exports.submitApproval = async (req, res) => {
  try {
    const { branchName, applicantId, amount, comments } = req.body;

    const approval = new Approval({
      branchName,
      applicantId,
      amount,
      comments
    });

    const saved = await approval.save();
    res.status(201).json({ message: 'Approval submitted', approval: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit approval' });
  }
};

exports.getAllApprovals = async (req, res) => {
  const approvals = await Approval.find().sort({ submittedAt: -1 });
  res.json(approvals);
};

exports.updateApprovalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updated = await Approval.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};
