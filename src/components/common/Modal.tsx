import React, { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses } from "../ThemeClasses";

interface ModalProps {
  onClose: () => void;
  data: any;
}

const Modal: React.FC<ModalProps> = ({ onClose, data }) => {
  const { theme } = useTheme();
  const t = themeClasses(theme);
  const modalRef = useRef<HTMLDivElement>(null);

  const [cardHeights, setCardHeights] = useState<{ [key: string]: number }>({});
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const heights: { [key: string]: number } = {};
    Object.keys(refs.current).forEach((key) => {
      const el = refs.current[key];
      if (el) heights[key] = el.clientHeight;
    });
    setCardHeights(heights);
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const renderLine = (height: number, color: string) => (
    <div
      className="w-0.5"
      style={{
        height: `${height}px`,
        backgroundColor: color,
        margin: "0 auto",
      }}
    ></div>
  );

  // const getStatusBadge = (
  //   status: string,
  //   bg: string = "bg-green-100",
  //   text: string = "text-green-800"
  // ): React.ReactNode => {
  //   return (
  //     <span
  //       className={`px-2 py-1 rounded-full text-xs cursor-pointer ${bg} ${text}`}
  //     >
  //       {status}
  //     </span>
  //   );
  // };

  const getStatusBadge = (status: string): React.ReactNode => {
    const badgeClass = getStatusBadgeClass(status);
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs cursor-pointer ${badgeClass}`}
      >
        {status}
      </span>
    );
  };

  const getStatusBadgeClass = (status: any) => {
    switch (status.toLowerCase()) {
      case "complete":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "assigned":
        return "bg-blue-100 text-blue-800";
      case "not assigned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStatusWithStrike = (
    currentStatus: string,
    defaultStatus = "Not Assigned"
  ) => {
    if (currentStatus === defaultStatus) {
      return <>Status: {getStatusBadge(currentStatus)}</>;
    } else {
      return (
        <div className="space-y-1">
          <div>
            Status:{" "}
            <span
              className="line-through px-2 py-1 rounded-full text-xs cursor-pointer bg-red-100 text-gray-800"
              style={{ textDecorationColor: "#ff0000" }}
            >
              {defaultStatus}
            </span>
          </div>

          <div>New Status: {getStatusBadge(currentStatus)}</div>
        </div>
      );
    }
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-50 overflow-y-auto">
      <div
        ref={modalRef}
        className={`rounded-lg shadow-lg max-w-2xl w-full mt-10 mb-10 max-h-[calc(100vh-80px)] overflow-y-auto p-6 relative ${t.modal}`}
      >
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl ${t.hoverText}`}
        >
          ✕
        </button>

        <h2 className={`text-lg font-semibold  mb-6 ${t.text}`}>
          Complaint No:{" "}
          <span className="text-xl text-green-400 font-bold">
            {data.complaintDetails.complaintNo}
          </span>{" "}
          / Token No:
          <span className="text-xl text-green-400 font-bold">
            {" "}
            {data.complaintDetails.tokenNo}
          </span>
        </h2>

        {/* Timeline container */}
        <div className="space-y-8">
          {/* Complaint Created */}
          <div className="flex items-center space-x-4">
            <div className={`w-24 text-sm text-right shrink-0 ${t.subText}`}>
              {formatDate(new Date(data.complaintDetails.date))}
            </div>
            <div className="flex flex-col items-center">
              {renderLine(
                (cardHeights["complaint"] ?? 80) / 2,
                "rgb(59 130 246)"
              )}
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center z-10">
                <User size={16} className="text-white" />
              </div>
              {renderLine(
                (cardHeights["complaint"] ?? 80) / 2,
                "rgb(59 130 246)"
              )}
            </div>
            <div
              className={`p-4 rounded shadow flex-1 border ${t.card}`}
              ref={(el: any) => (refs.current["complaint"] = el)}
            >
              <p className="text-sm font-semibold mb-1">Complainant</p>
              <div className="text-sm space-y-1">
                <p>Name: {data.complaintDetails.complainantName}</p>
                {/* <p>{renderStatusWithStrike(data.complaintDetails.status)}</p> */}
                <p>{renderStatusWithStrike(data.complaintDetails.status)}</p>
                <p>
                  Complaint Date:{" "}
                  {formatDate(new Date(data.complaintDetails.date))}
                </p>
              </div>
            </div>
          </div>

          {/* Assignments */}
          {data.assignments.map((a: any) => (
            <div className="flex items-center space-x-4" key={a.id}>
              <div className={`w-24 text-sm text-right shrink-0 ${t.subText}`}>
                {formatDate(new Date(a.date))}
              </div>
              <div className="flex flex-col items-center">
                {renderLine(
                  (cardHeights[`assignment-${a.id}`] ?? 80) / 2,
                  "rgb(34 197 94)"
                )}
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center z-10">
                  <User size={16} className="text-white" />
                </div>
                {renderLine(
                  (cardHeights[`assignment-${a.id}`] ?? 80) / 2,
                  "rgb(34 197 94)"
                )}
              </div>
              <div
                className={`p-4 rounded shadow flex-1 border ${t.card}`}
                ref={(el: any) => (refs.current[`assignment-${a.id}`] = el)}
              >
                <p className="text-sm font-semibold mb-1">Assignment</p>
                <div className="text-sm space-y-1">
                  <p>Assigned to: {a.assignedTo}</p>
                  <p>{renderStatusWithStrike(a.status, "Assigned")}</p>
                  <p>Assigned Date: {formatDate(new Date(a.date))}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Submissions */}
          {data.submissions.map((s: any) => (
            <div className="flex items-center space-x-4" key={s.id}>
              <div className={`w-24 text-sm text-right shrink-0 ${t.subText}`}>
                {formatDate(new Date(s.date))}
              </div>
              <div className="flex flex-col items-center">
                {renderLine(
                  (cardHeights[`submission-${s.id}`] ?? 80) / 2,
                  "rgb(168 85 247)"
                )}
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center z-10">
                  <User size={16} className="text-white" />
                </div>
                {renderLine(
                  (cardHeights[`submission-${s.id}`] ?? 80) / 2,
                  "rgb(168 85 247)"
                )}
              </div>
              <div
                className={`p-4 rounded shadow flex-1 border ${t.card}`}
                ref={(el: any) => (refs.current[`submission-${s.id}`] = el)}
              >
                <p className="text-sm font-semibold mb-1">Submission</p>
                <p className="text-sm">
                  Submitted by: {s.submittedBy}
                  <br />
                  Status: {getStatusBadge(s.status)}
                  <br />
                  Submission Date: {formatDate(new Date(s.date))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
