import mongoose from 'mongoose';

const STATUSES = ['waiting', 'serving', 'completed'];

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: [50, 'Customer name cannot exceed 50 characters'],
    },
    status: {
      type: String,
      enum: {
        values: STATUSES,
        message: 'Status must be waiting, serving, or completed',
      },
      default: 'waiting',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Customer = mongoose.model('Customer', customerSchema);

export { STATUSES };
export default Customer;
