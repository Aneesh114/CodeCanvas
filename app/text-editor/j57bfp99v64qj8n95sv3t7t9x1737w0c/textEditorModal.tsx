import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Editor from './_components/editor';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useMutation } from "@/liveblocks.config";
import { nanoid } from "nanoid";
import { LayerType } from "@/types/canvas";

interface TextEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
}

const TextEditorModal = ({ isOpen, onClose, onSave }: TextEditorModalProps) => {
  const editorRef = React.useRef(null);

  const handleSave = () => {
    // Get content from editor - you'll need to implement this based on your Lexical setup
    const content = ""; // TODO: Get content from editor
    onSave(content);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] w-[90vw] h-[80vh]">
        <DialogHeader>
          <DialogTitle>Text Editor</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <Editor  />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TextEditorModal;