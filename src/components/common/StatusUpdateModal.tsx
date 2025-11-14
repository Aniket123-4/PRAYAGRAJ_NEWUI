// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import Button from "./Button";
// import TextField from "../../components/common/TextField";
// import Modal1 from "./Modal1";

// interface StatusUpdateModalProps {
//   title: string;
//   onConfirm: (statusData: { status: string; certificate_no?: string; issue_date?: string }) => void;
//   onCancel: () => void;
//   statusOptions: { value: string; label: string }[];
// }

// const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
//   title,
//   onConfirm,
//   onCancel,
//   statusOptions
// }) => {
//   const { t } = useTranslation();
//   const [status, setStatus] = useState("");
//   const [certificateNo, setCertificateNo] = useState("");
//   const [issueDate, setIssueDate] = useState("");
//   const [errors, setErrors] = useState<{ status?: string; certificate_no?: string; issue_date?: string }>({});

//   const validate = () => {
//     const newErrors: { status?: string; certificate_no?: string; issue_date?: string } = {};
    
//     if (!status) {
//       newErrors.status = t("text.requiredField");
//     }
    
//     if (status === "Approved") {
//       if (!certificateNo) {
//         newErrors.certificate_no = t("text.requiredField");
//       }
//       if (!issueDate) {
//         newErrors.issue_date = t("text.requiredField");
//       }
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleConfirm = () => {
//     if (!validate()) return;

//     const statusData: { status: string; certificate_no?: string; issue_date?: string } = {
//       status
//     };

//     if (status === "Approved") {
//       statusData.certificate_no = certificateNo;
//       statusData.issue_date = issueDate;
//     }

//     onConfirm(statusData);
//     resetForm();
//   };

//   const resetForm = () => {
//     setStatus("");
//     setCertificateNo("");
//     setIssueDate("");
//     setErrors({});
//   };

//   const handleClose = () => {
//     resetForm();
//     onCancel();
//   };

//   const handleStatusChange = (newStatus: string) => {
//     setStatus(newStatus);
//     setErrors(prev => ({ ...prev, status: undefined }));
    
//     // Clear certificate fields if status is not Approved
//     if (newStatus !== "Approved") {
//       setCertificateNo("");
//       setIssueDate("");
//       setErrors(prev => ({ ...prev, certificate_no: undefined, issue_date: undefined }));
//     }
//   };

//   return (
//     <Modal1 isOpen={true} onClose={handleClose} title={title}>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             {t("text.status")} <span className="text-red-500">*</span>
//           </label>
//           <select
//             className={`w-full border rounded-md p-2 ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
//             value={status}
//             onChange={(e) => handleStatusChange(e.target.value)}
//           >
//             <option value="">{t("text.selectStatus")}</option>
//             {statusOptions.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//           {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
//         </div>

//         {status === "Approved" && (
//           <>
//             <TextField
//               label={t("text.certificateNumber")}
//               value={certificateNo}
//               onChange={(e) => {
//                 setCertificateNo(e.target.value);
//                 setErrors(prev => ({ ...prev, certificate_no: undefined }));
//               }}
//               error={errors.certificate_no}
//               required
//               placeholder={t("text.enterCertificateNumber")}
//             />
//             <TextField
//               label={t("text.issueDate")}
//               type="date"
//               value={issueDate}
//               onChange={(e) => {
//                 setIssueDate(e.target.value);
//                 setErrors(prev => ({ ...prev, issue_date: undefined }));
//               }}
//               error={errors.issue_date}
//               required
//             />
//           </>
//         )}

//         <div className="flex justify-end space-x-3 pt-4">
//          <Button text={t("text.cancel")} onClick={handleClose} />
// <Button text={t("text.update")} onClick={handleConfirm} />

//         </div>
//       </div>
//     </Modal1>
//   );
// };

// export default StatusUpdateModal;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../ThemeClasses";
import Button from "./Button";
import AutoCompleteSelect from "./AutoCompleteSelect";
import TextField from "./TextField";

interface StatusUpdateModalProps {
  title: string;
  onConfirm: (data: { status: string; certificate_no?: string; issue_date?: string; remarks?: string }) => void;
  onCancel: () => void;
  statusOptions: { value: string; label: string }[];
  showRemarks?: boolean;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  title,
  onConfirm,
  onCancel,
  statusOptions,
  showRemarks = false,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const th = tc(theme);
  const [status, setStatus] = useState<string>("");
  const [certificateNo, setCertificateNo] = useState<string>("");
  const [issueDate, setIssueDate] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [errors, setErrors] = useState<{ status?: string; remarks?: string }>({});

  const selectedStatus = statusOptions.find((opt) => opt.value === status) || null;

  const handleConfirm = () => {
    const newErrors: { status?: string; remarks?: string } = {};
    if (!status) newErrors.status = t("text.requiredField");
    if (status === "Rejected" && showRemarks && !remarks) newErrors.remarks = t("text.requiredField");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data: { status: string; certificate_no?: string; issue_date?: string; remarks?: string } = { status };
    if (status === "Approved") {
      if (certificateNo) data.certificate_no = certificateNo;
      if (issueDate) data.issue_date = issueDate;
    }
    if (showRemarks && remarks) data.remarks = remarks;

    onConfirm(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg p-6 w-full max-w-md ${th.card}`}>
        <h2 className={`text-xl font-semibold mb-4 ${th.text}`}>{title}</h2>
        <div className="space-y-4">
          <AutoCompleteSelect
            label={t("text.status")}
            //@ts-ignore
            options={statusOptions}
            //@ts-ignore
            selected={selectedStatus}
            onChange={(opt:any) => {
              setStatus(opt.value);
              setErrors((prev) => ({ ...prev, status: undefined }));
            }}
            error={errors.status}
            placeholder={t("text.selectStatus")}
            required
          />
          {status === "Approved" && (
            <>
              <TextField
                label={t("text.certificateNo")}
                value={certificateNo}
                onChange={(e) => setCertificateNo(e.target.value)}
              />
              <TextField
                label={t("text.issueDate")}
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </>
          )}
          {showRemarks && (
            <TextField
              label={t("text.remarks")}
              value={remarks}
              onChange={(e) => {
                setRemarks(e.target.value);
                setErrors((prev) => ({ ...prev, remarks: undefined }));
              }}
              error={errors.remarks}
              required={status === "Rejected"}
            />
          )}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            text={t("text.cancel")}
            onClick={onCancel}
            bgColor={theme === "dark" ? "bg-gray-600" : "bg-gray-500"}
          />
          <Button
            text={t("text.confirm")}
            onClick={handleConfirm}
            bgColor={theme === "dark" ? "bg-blue-700" : "bg-blue-600"}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateModal;