// components/common/DeathCertificateStatusModal.tsx
import React, { useState } from "react";
import Modal1 from "./Modal1";
import Button from "./Button";
import TextField from "./TextField";
import AutoCompleteSelect from "./AutoCompleteSelect";
import { useTranslation } from "react-i18next";

interface DeathCertificateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { status: string; certificate_no?: string; issue_date?: string; remarks?: string }) => void;
  title: string;
  currentStatus?: string;
}

const DeathCertificateStatusModal: React.FC<DeathCertificateStatusModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  currentStatus
}) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(currentStatus || "");
  const [certificateNo, setCertificateNo] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const statusOptions = [
    { value: "Pending", label: t("text.pending") },
    { value: "Under Verification", label: t("text.underVerification") },
    { value: "Approved", label: t("text.approved") },
    { value: "Rejected", label: t("text.rejected") }
  ];

  const handleSubmit = () => {
    const data: any = { status };
    if (status === "Approved") {
      data.certificate_no = certificateNo;
      data.issue_date = issueDate;
    }
    if (remarks) {
      data.remarks = remarks;
    }
    onConfirm(data);
    onClose();
  };

  return (
    <Modal1 isOpen={isOpen} onClose={onClose} title={title} size="md">
      <div className="space-y-4">
        <AutoCompleteSelect
          label={t("text.status")}
          //@ts-ignore
          options={statusOptions}
          //@ts-ignore
          selected={statusOptions.find(opt => opt.value === status) || null}
          onChange={(opt: any) => setStatus(opt?.value || "")}
          required
        />

        {status === "Approved" && (
          <>
            <TextField
              label={t("text.certificateNumber")}
              value={certificateNo}
              onChange={(e) => setCertificateNo(e.target.value)}
              required
            />
            <TextField
              label={t("text.issueDate")}
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              required
            />
          </>
        )}

        <TextField
          label={t("text.remarks")}
          type="textarea"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder={t("text.enterRemarks")}
         // rows={3}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            text={t("text.cancel")}
            onClick={onClose}
            bgColor="bg-gray-300"
            textColor="text-gray-800"
          />
          <Button
            text={t("text.update")}
            onClick={handleSubmit}
            bgColor="bg-blue-600"
            textColor="text-white"
          />
        </div>
      </div>
    </Modal1>
  );
};

export default DeathCertificateStatusModal;