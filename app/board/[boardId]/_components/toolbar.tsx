"use client";

import { useCallback, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./tool-button";
import {
    Circle,
    MousePointer2,
    Pencil,
    Redo2,
    Square,
    StickyNote,
    TypeIcon,
    Undo2,
    Grid,
    Grip,
    FileText,
} from "lucide-react";
    Grip,
    File,
} from "lucide-react";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import { useSelf } from "@liveblocks/react/suspense";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@clerk/nextjs";

interface ToolbarProps {
    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    toggleGrid: () => void;
    toggleGrid: () => void;
    toggleDots: () => void;
    setIsTextEditorOpen: (isOpen: boolean) => void; // Add this prop
}

const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canUndo,
    canRedo,
    toggleGrid,
    toggleDots,
    setIsTextEditorOpen, // Add this to props
    toggleDots,
}: ToolbarProps) => {
    const selection = useSelf((me) => me.presence.selection);
    const { organization } = useOrganization();

    const onFileButtonClick = useCallback(() => {
        if (!organization) {
            console.error("No organization context found.");
            return;
        }

        setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.File,
        });
    }, [organization, setCanvasState]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (selection?.length > 0) return;

        if (e.ctrlKey) {
            switch (e.key.toLowerCase()) {
                case 'a':
                    e.preventDefault();
                    setCanvasState({ mode: CanvasMode.None });
                    break;
                case 't':
                    e.preventDefault();
                    setCanvasState({
                        layerType: LayerType.Text,
                        mode: CanvasMode.Inserting,
                    });
                    break;
                case 'n':
                    e.preventDefault();
                    setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Note,
                    });
                    break;
                case 'r':
                    e.preventDefault();
                    setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Rectangle,
                    });
                    break;
                case 'e':
                    e.preventDefault();
                    setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Ellipse,
                    });
                    break;
            }
        }
    }, [selection, setCanvasState]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-1.5 flex gap-1 flex-col items-center shadow-md">
                <ToolButton
                    label="Select (Ctrl+A)"
                    icon={MousePointer2}
                    onClick={() => setCanvasState({ mode: CanvasMode.None })}
                    isActive={
                        canvasState.mode === CanvasMode.None ||
                        canvasState.mode === CanvasMode.Translating ||
                        canvasState.mode === CanvasMode.SelectionNet ||
                        canvasState.mode === CanvasMode.Pressing ||
                        canvasState.mode === CanvasMode.Resizing
                    }
                />
                <ToolButton
                    label="Text (Ctrl+T)"
                    icon={TypeIcon}
                    onClick={() =>
                        setCanvasState({
                            layerType: LayerType.Text,
                            mode: CanvasMode.Inserting,
                        })
                    }
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Text
                    }
                />
                <ToolButton
                    label="Sticky Note (Ctrl+N)"
                    icon={StickyNote}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Note,
                        })
                    }
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Note
                    }
                />
                <ToolButton
                    label="Rectangle (Ctrl+R)"
                    icon={Square}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Rectangle,
                        })
                    }
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Rectangle
                    }
                />
                <ToolButton
                    label="File"
                    icon={File}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.File,
                        })
                    }
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.File
                    }
                />
                <ToolButton
                    label="Ellipse (Ctrl+E)"
                    icon={Circle}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Ellipse,
                        })
                    }
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Ellipse
                    }
                />
                <ToolButton
                    label="Pen"
                    icon={Pencil}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Pencil,
                        })
                    }
                    isActive={canvasState.mode === CanvasMode.Pencil}
                />
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolButton
                    label="Undo (Ctrl+Z)"
                    icon={Undo2}
                    onClick={undo}
                    isDisabled={!canUndo}
                />
                <ToolButton
                    label="Redo (Ctrl+Shift+Z)"
                    icon={Redo2}
                    onClick={redo}
                    isDisabled={!canRedo}
                />
                <ToolButton
                    label="Toggle Grid"
                    icon={Grid}
                    onClick={toggleGrid}
                />
                <ToolButton
                    label="Toggle Dots"
                    icon={Grip}
                    onClick={toggleDots}
                    icon={Grid}
                    onClick={toggleGrid}
                />
                <ToolButton
                    label="Text Editor"
                    icon={FileText}
                    onClick={() => setIsTextEditorOpen(true)}
                    label="Toggle dots"
                    icon={Grip}
                    onClick={toggleDots}
                />
            </div>
        </div>
    );
};

export const ToolbarSkeleton = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 rounded-md animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] h-[360px] w-[52px]">
            <Skeleton />
        </div>
    );
};

export default Toolbar;