import React from 'react';
import { FileText } from "lucide-react";
import { colorToCss } from "@/lib/utils";
import { LayerType } from "@/types/canvas";

interface TextAttachmentPreviewProps {
  id: string;
  layer: any;
  onDoubleClick: (id: string) => void;
  selectionColor?: string;
}

const TextAttachmentPreview = ({ 
  id, 
  layer, 
  onDoubleClick,
  selectionColor 
}: TextAttachmentPreviewProps) => {
  return (
    <div
      className="absolute shadow-md rounded-lg bg-white p-4 cursor-pointer"
      style={{
        transform: `translate(${layer.x}px, ${layer.y}px)`,
        width: layer.width,
        height: layer.height,
        border: selectionColor ? `2px solid ${selectionColor}` : undefined,
      }}
      onDoubleClick={() => onDoubleClick(id)}
    >
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6" />
        <span className="font-medium">Text Document</span>
      </div>
    </div>
  );
};

export default TextAttachmentPreview;