import React from "react";
import { FileText, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Tender = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-orange-800 mb-6">
          Tender / Quotation
        </h1>
        <p className="text-gray-700 mb-10 max-w-2xl mx-auto text-lg">
          Related information will be uploaded as per requirements.
        </p>

        {/* Tender Card */}
        <Card className="shadow-xl rounded-2xl border border-orange-200 bg-white">
          <CardContent className="p-8 flex flex-col items-center justify-center space-y-4">
            <FileText className="w-12 h-12 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              No Active Tenders
            </h2>
            <p className="text-gray-600 flex items-center text-sm">
              <Info className="w-4 h-4 mr-2 text-orange-500" />
              New Tender/Quotation details will be available here when published.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tender;
