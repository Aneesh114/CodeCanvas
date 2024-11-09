import React from 'react';
import { FileText } from "lucide-react";
import { colorToCss } from "@/lib/utils";
import { LayerType,TextAttachmentLayer } from "@/types/canvas";

interface TextAttachmentPreviewProps {
  id: string;
  layer: TextAttachmentLayer;
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
    <foreignObject
      id={id}
      x={layer.x}
      y={layer.y}
      width={layer.width}
      height={layer.height}
      onDoubleClick={() => onDoubleClick(id)}
      style={{ 
        outline: selectionColor ? `2px solid ${selectionColor}` : 'none'
      }}
      className="overflow-auto shadow-md rounded-lg bg-white"
    >
      <div className="p-4 h-full w-full">
        <div 
          className="prose prose-sm max-w-none h-full"
          dangerouslySetInnerHTML={{ __html: layer.content }}
        />
      </div>
    </foreignObject>
  );
};

export default TextAttachmentPreview;