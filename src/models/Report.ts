import mongoose, { Schema, Document, models } from "mongoose";

export interface IReport extends Document {
  title: string;
  companyName: string;
  date: string;
  pdfName: string;
  content: string;
  design: string;
  production: string;
  qc: string;
}

const ReportSchema = new Schema<IReport>({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  date: { type: String, required: true },
  pdfName: { type: String },
  content: { type: String, required: true },
  design: { type: String, required: true },
  production: { type: String, required: true },
  qc: { type: String, required: true },
});

export default models.Report || mongoose.model<IReport>("Report", ReportSchema);
