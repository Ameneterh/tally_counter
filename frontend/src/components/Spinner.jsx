import React from "react";

export default function Spinner() {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center opacity-70">
      <div className="h-10 w-10 border-4 border-dashed border-gray-300 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
