"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { type ColorResult, CirclePicker, SketchPicker } from "react-color";
import { Level } from "@tiptap/extension-heading";
import {
  AlignCenter,
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Camera,
  ChevronDownIcon,
  ChevronRight,
  Edit,
  HardDrive,
  HighlighterIcon,
  Icon,
  Image,
  ImageIcon,
  ItalicIcon,
  Link,
  Link2Icon,
  ListChecksIcon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PenBox,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  Search,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  Upload,
  UploadIcon,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    {
      label: "Default",
      value: "normal",
    },
    {
      label: "Single",
      value: "1.0",
    },
    {
      label: "1.15",
      value: "1.15",
    },
    {
      label: "1.5",
      value: "1.5",
    },
    {
      label: "Double",
      value: "2.0",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <ListCollapseIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex flex-col gap-y-1">
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("paragraph").lineHeight === value &&
                "bg-neutral-200/80"
            )}
          >
            <span className="textsm ">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// const ListButton = () => {

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm hover:bg-neutral-200/80"
        >
          {currentFontSize}
        </button>
      )}
      <button
        onClick={increment}
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

// const FONT_SIZES = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];

// const FontSizeButton = () => {
//   const { editor } = useEditorStore();

//   const currentFontSize = editor?.getAttributes("textStyle").fontSize
//     ? editor.getAttributes("textStyle").fontSize.replace("px", "")
//     : "16";

//   const [isEditing, setIsEditing] = useState(false);
//   const [value, setValue] = useState(currentFontSize);

//   // Update font size in editor
//   const updateFont = (size: string) => {
//     const num = parseInt(size);
//     if (isNaN(num) || num <= 0) return;

//     editor?.chain().focus().setFontSize(`${num}px`).run();
//     setValue(size);
//     setIsEditing(false);
//   };

//   // "Dropdown" logic (INVISIBLE)
//   const getClosestFontSize = (size: number) => {
//     let closest = FONT_SIZES[0];
//     let minDiff = Math.abs(size - closest);

//     FONT_SIZES.forEach((s) => {
//       const diff = Math.abs(size - s);
//       if (diff < minDiff) {
//         closest = s;
//         minDiff = diff;
//       }
//     });

//     return closest;
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       updateFont(value);
//     }

//     // Invisible dropdown behavior
//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       const closest = getClosestFontSize(parseInt(value));
//       updateFont(closest.toString());
//     }
//   };

//   return (
//     <button
//       className="h-7 w-12 text-sm border border-neutral-400 rounded-sm bg-white hover:bg-neutral-200/80 flex items-center justify-center"
//       onClick={() => setIsEditing(true)}
//     >
//       {isEditing ? (
//         <input
//           autoFocus
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           onBlur={() => updateFont(value)}
//           onKeyDown={handleKeyDown}
//           className="w-full h-full text-center bg-transparent focus:outline-none"
//         />
//       ) : (
//         <span>{value}</span>
//       )}
//     </button>
//   );
// };

// --- TYPE DEFINITIONS ---
type ListStyleKey =
  | "bullet-dot"
  | "bullet-open"
  | "bullet-square"
  | "ordered-decimal"
  | "ordered-alpha"
  | "ordered-roman"
  | "task";
type ListType = "bulletList" | "orderedList" | "taskList" | "blockquote";

interface ListOption {
  styleKey: ListStyleKey;
  label: string;
  iconComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string; // For CSS grid layout
  // A placeholder string representing the intended HTML/CSS style applied
  markerStyle: string;
  type: ListType;
}

// --- DATA: List Styles (Based on your images) ---
const LIST_STYLES: ListOption[] = [
  // 1. NUMBERED STYLES (image_622846.png)
  {
    styleKey: "ordered-decimal",
    label: "1. a. i.",
    type: "orderedList",
    markerStyle: "decimal, lower-alpha, lower-roman",
    iconComponent: ListOrderedIcon,
    className: "col-span-1",
  },
  {
    styleKey: "ordered-paren",
    label: "1) a) i)",
    type: "orderedList",
    markerStyle: "decimal, lower-alpha, lower-roman",
    iconComponent: ListOrderedIcon,
    className: "col-span-1",
  },
  {
    styleKey: "ordered-nested",
    label: "1. 1.1. 1.2.1.",
    type: "orderedList",
    markerStyle: "decimal, decimal-dot",
    iconComponent: ListOrderedIcon,
    className: "col-span-1",
  },

  {
    styleKey: "ordered-upper-alpha",
    label: "A. B. I.",
    type: "orderedList",
    markerStyle: "upper-alpha, lower-alpha, upper-roman",
    iconComponent: ListOrderedIcon,
    className: "col-span-1",
  },
  {
    styleKey: "ordered-roman",
    label: "I. A. 1.",
    type: "orderedList",
    markerStyle: "upper-roman, upper-alpha, decimal",
    iconComponent: ListOrderedIcon,
    className: "col-span-1",
  },
  {
    styleKey: "ordered-zero",
    label: "01. a. i.",
    type: "orderedList",
    markerStyle: "decimal-leading-zero, lower-alpha, lower-roman",
    iconComponent: ListOrderedIcon,
    className: "col-span-1",
  },

  // 2. BULLET STYLES (image_622842.png - First Row)
  // NOTE: In a real implementation, these would need specific Tiptap commands/attributes
  {
    styleKey: "bullet-dot",
    label: "Standard Dot",
    type: "bulletList",
    markerStyle: "disc",
    iconComponent: ListIcon,
    className: "col-span-1",
  },
  {
    styleKey: "bullet-square",
    label: "Square",
    type: "bulletList",
    markerStyle: "square",
    iconComponent: ListIcon,
    className: "col-span-1",
  },
  {
    styleKey: "bullet-open",
    label: "Open Circle",
    type: "bulletList",
    markerStyle: "circle",
    iconComponent: ListIcon,
    className: "col-span-1",
  },
];

const ListButton = () => {
  const { editor } = useEditorStore();
  // State to track the currently selected visual style for visual feedback
  const [currentStyleKey, setCurrentStyleKey] =
    useState<ListStyleKey>("ordered-decimal");

  // Find the currently active Tiptap node type (e.g., 'bulletList' or 'orderedList')
  const isActiveListType = editor?.isActive("orderedList")
    ? "orderedList"
    : editor?.isActive("bulletList")
    ? "bulletList"
    : null;

  // --- Core Action: Apply Tiptap Command and Style ---
  const applyListStyle = (style: ListOption) => {
    // 1. Run the base Tiptap command to ensure the correct node type is active
    if (style.type === "orderedList") {
      editor?.chain().focus().toggleOrderedList().run();
    } else if (style.type === "bulletList") {
      editor?.chain().focus().toggleBulletList().run();
    } else {
      return;
    }

    // 2. APPLY STYLE ATTRIBUTE: set a data attribute on the list node so
    // our CSS can target different visual styles. Keep the placeholder
    // inline `style` attribute as a fallback.
    editor
      ?.chain()
      .focus()
      .updateAttributes(style.type, {
        style: style.markerStyle,
        // add a stable data attribute so CSS can detect the chosen style
        "data-style": style.styleKey,
      })
      .run();

    setCurrentStyleKey(style.styleKey);
  };

  // --- Placeholder Action for Checklist Submenu ---
  const openChecklistMenu = () => {
    // Here you would navigate to a nested menu or open a dialog
    alert("Opening Checklist Menu for advanced Task List styles.");
    // For standard task list toggle:
    // editor?.chain().focus().toggleTaskList().run();
  };

  // --- Placeholder Render Function (Simulates the visual grid) ---
  // NOTE: This must be adapted to use the actual rendering logic for the list samples.
  // We are simulating the 3x2 grid shown in your image_622846.png
  const ListSampleGrid = ({ styles }: { styles: ListOption[] }) => (
    <div className="grid grid-cols-3 gap-1 px-1 pt-1">
      {styles.map((style) => (
        <div
          key={style.styleKey}
          onClick={() => applyListStyle(style)}
          className={cn(
            "p-2 border rounded cursor-pointer hover:bg-neutral-100",
            currentStyleKey === style.styleKey && "border-blue-500 bg-blue-50"
          )}
          // Simulate the visual style selection (You would replace this with actual SVG/Image components)
          dangerouslySetInnerHTML={{
            __html: `
                        <div class="text-xs text-neutral-500 mb-1">${style.label}</div>
                        <div class="h-8 flex flex-col justify-around">
                           <div class="h-1 bg-gray-400 w-10"></div>
                           <div class="h-1 bg-gray-400 w-10 ml-3"></div>
                           <div class="h-1 bg-gray-400 w-10 ml-6"></div>
                        </div>
                    `,
          }}
        />
      ))}
    </div>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          {/* Display a generic list icon in the trigger */}
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 w-[280px]">
        {/* --- 1. NUMBERED LIST STYLES (Top 6 options) --- */}
        <div className="text-xs font-semibold px-2 py-1 text-neutral-600">
          Numbered Lists
        </div>
        <ListSampleGrid
          styles={LIST_STYLES.filter((s) => s.type === "orderedList")}
        />

        <DropdownMenuSeparator />

        {/* --- 2. BULLET LIST STYLES (Top Row of Dots/Squares) --- */}
        <div className="text-xs font-semibold px-2 py-1 text-neutral-600">
          Bullet Lists
        </div>
        <ListSampleGrid
          styles={LIST_STYLES.filter((s) => s.type === "bulletList")}
        />

        <DropdownMenuSeparator />

        {/* --- 3. CHECKLIST SUBMENU OPTION --- */}
        <button
          onClick={openChecklistMenu}
          className="w-full flex items-center justify-between px-2 py-1.5 rounded-sm hover:bg-neutral-200/80 text-sm"
        >
          <div className="flex items-center gap-2">
            <ListChecksIcon className="size-4 shrink-0" />
            Checklist menu
          </div>
          <ChevronRight className="size-4 text-neutral-500" />
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex flex-col gap-y-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="textsm ">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Original ImageButton code
// const ImageButton = () => {
//   const { editor } = useEditorStore();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");

//   const onChange = (src: string) => {
//     editor?.chain().focus().setImage({ src }).run();
//   };

//   const onUpload = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.onchange = (e) => {
//       const file = (e.target as HTMLInputElement).files?.[0];
//       if (file) {
//         const imageUrl = URL.createObjectURL(file);
//         onChange(imageUrl);
//       }
//     };
//     input.click();
//   };

//   const handleImageUrlSubmit = () => {
//     if (imageUrl) {
//       onChange(imageUrl);
//       setImageUrl("");
//       setIsDialogOpen(false);
//     }
//   };

//   return (
//     <>
//       {" "}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
//             <ImageIcon className="size-4" />
//           </button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent>
//           <DropdownMenuItem onClick={onUpload}>
//             <UploadIcon className="size-4 mr-2" />
//             Upload
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
//             <SearchIcon className="size-4 mr-2" />
//             Paste image URL
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Insert image URL</DialogTitle>
//           </DialogHeader>
//           <Input placeholder="Insert image url"
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}
//           onKeyDown={(e)=> {if(e.key === "Enter"){
//             handleImageUrlSubmit();
//           }}}
//           />
//         <DialogFooter>
//           <Button onClick={handleImageUrlSubmit}>
//             Insert
//           </Button>
//         </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// State identifier for the active modal

// New Image Related code started here:
type ActiveDialog = "url" | "camera" | "drivePermission" | null;

// --- 1. Camera Capture Dialog Component ---

interface CameraDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertImage: (src: string) => void;
  // onInsertVideo: (src: string) => void; // Removed for photo focus
}

const stopMediaStream = (stream: MediaStream | null) => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
};

const CameraCaptureDialog: React.FC<CameraDialogProps> = ({
  isOpen,
  onClose,
  onInsertImage,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStream = useRef<MediaStream | null>(null);

  const [isStreamActive, setIsStreamActive] = useState(false);
  const [capturedImageSrc, setCapturedImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Stream Control
  const startCamera = useCallback(async () => {
    if (!isOpen) return;
    setCapturedImageSrc(null);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      mediaStream.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsStreamActive(true);
      }
    } catch (err) {
      setError("Cannot access camera. Please grant permissions.");
      setIsStreamActive(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopMediaStream(mediaStream.current);
      mediaStream.current = null;
      setIsStreamActive(false);
      setCapturedImageSrc(null);
    }
  }, [isOpen, startCamera]);

  // Photo Workflow
  const captureImage = () => {
    if (!videoRef.current || !isStreamActive) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/png");

      setCapturedImageSrc(imageUrl);
      stopMediaStream(mediaStream.current);
      setIsStreamActive(false);
    }
  };

  const retryCapture = () => {
    setCapturedImageSrc(null);
    startCamera();
  };

  const insertCapturedImage = () => {
    if (capturedImageSrc) {
      onInsertImage(capturedImageSrc);
      onClose();
    }
  };

  const isReviewing = !!capturedImageSrc;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="size-5" /> Take a Picture
          </DialogTitle>
        </DialogHeader>

        <div className="relative w-full aspect-video bg-black rounded overflow-hidden">
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900/80 text-white p-4">
              {error}
            </div>
          )}

          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            className={`w-full h-full object-cover ${
              isReviewing ? "hidden" : ""
            }`}
          />

          {isReviewing && (
            <img
              src={capturedImageSrc || ""}
              alt="Captured preview"
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <div className="flex justify-center p-2 border-t">
          {!isReviewing ? (
            <Button
              onClick={captureImage}
              disabled={!isStreamActive}
              className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
            >
              <PenBox className="size-4" /> Take Picture
            </Button>
          ) : (
            <Button
              onClick={retryCapture}
              variant="outline"
              className="flex items-center gap-2"
            >
              <X className="size-4" /> Retry
            </Button>
          )}
        </div>

        <DialogFooter>
          {isReviewing && (
            <Button
              onClick={insertCapturedImage}
              className="bg-green-500 hover:bg-green-600"
            >
              OK / Insert
            </Button>
          )}
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// --- 2. Drive Permission Dialog Component ---

interface DrivePermissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGrant: () => void;
}

const DrivePermissionDialog: React.FC<DrivePermissionDialogProps> = ({
  isOpen,
  onClose,
  onGrant,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HardDrive className="size-5" /> Connect to Google Drive
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 text-sm text-neutral-600">
          <p>
            To insert images from your Google Drive, we need your permission to
            access your files. Clicking 'Connect' will open the Google
            authorization window.
          </p>
          <p className="mt-2 text-xs text-red-500">
            (Note: This requires a registered OAuth client ID and back-end
            integration.)
          </p>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={onGrant} className="bg-blue-500 hover:bg-blue-600">
            Connect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// --- 3. ImageButton Function ---

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setActiveDialog(null);
    }
  };

  const onDriveClick = () => {
    setActiveDialog("drivePermission");
  };

  const onServiceClick = (service: string) => {
    // Placeholder for Photos integration
    alert(`Feature: Connect to ${service} API is TBD`);
  };

  const onCameraClick = () => {
    setActiveDialog("camera");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="size-4 mr-2" />
            Upload from computer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert("Search web TBD")}>
            <SearchIcon className="size-4 mr-2" />
            Search the web
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onDriveClick}>
            <HardDrive className="size-4 mr-2" />
            Drive
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onServiceClick("Photos")}>
            <Image className="size-4 mr-2" />
            Photos
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onCameraClick}>
            <Camera className="size-4 mr-2" />
            Camera (Image/Video)
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setActiveDialog("url")}>
            <Link className="size-4 mr-2" />
            By URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* A. URL Input Dialog */}
      <Dialog
        open={activeDialog === "url"}
        onOpenChange={(open) => setActiveDialog(open ? "url" : null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* B. Camera Capture Dialog */}
      <CameraCaptureDialog
        isOpen={activeDialog === "camera"}
        onClose={() => setActiveDialog(null)}
        onInsertImage={onChange}
        onInsertVideo={() => {
          alert("Video feature TBD.");
          setActiveDialog(null);
        }}
      />

      {/* C. Drive Permission Dialog */}
      <DrivePermissionDialog
        isOpen={activeDialog === "drivePermission"}
        onClose={() => setActiveDialog(null)}
        onGrant={() => {
          console.log("Initiating Google OAuth flow...");
          // TODO: Implement actual Google OAuth / Picker API integration here
          setActiveDialog(null);
        }}
      />
    </>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  // State to hold the color being manipulated by the Custom Color input
  const [customColor, setCustomColor] = useState("#000000");

  // Get the current highlight color
  const currentColor = editor?.getAttributes("textStyle").highlight || "";

  // **NOTE:** We are intentionally *NOT* passing a 'colors' prop to CirclePicker
  // to use its default palette, as requested.

  // 1. Handler to apply a color selected from the CirclePicker
  const onPaletteColorChange = (color: ColorResult) => {
    // Get the hex value from the ColorResult object
    const hexColor = color.hex;

    // Apply the color to the editor
    editor?.chain().focus().setHighlight({ color: hexColor }).run();

    // You can also access other formats like:
    // const rgbValue = color.rgb;
    // console.log("Applied color hex:", hexColor, "RGB:", rgbValue);
  };

  // 2. Handler for the "None" button to remove the highlight
  const onRemoveHighlight = () => {
    editor?.chain().focus().unsetHighlight().run();
  };

  // 3. Handler for applying the custom color selected via the input
  const onApplyCustomColor = () => {
    editor?.chain().focus().setHighlight({ color: customColor }).run();
  };

  // 4. Handler for the HTML color input change
  const onCustomColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        {/* --- Header and NONE Button --- */}
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-semibold">Highlight Color</div>
          <button
            onClick={onRemoveHighlight}
            className="flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded hover:bg-neutral-100 border border-neutral-300 transition-colors"
          >
            <X className="size-3" />
            None
          </button>
        </div>

        <CirclePicker
          color={currentColor}
          onChangeComplete={onPaletteColorChange}
          circleSize={24}
          circleSpacing={8}
        />

        {/* --- CUSTOM Color Input --- */}
        <div className="pt-2.5 mt-2.5 border-t border-neutral-200">
          <div className="flex items-center gap-2 p-1.5 text-sm">
            <label
              htmlFor="custom-color-input"
              className="font-medium text-neutral-600"
            >
              Custom:
            </label>

            {/* Standard HTML Color Input */}
            <input
              id="custom-color-input"
              type="color"
              value={customColor}
              onChange={onCustomColorInputChange}
              className="w-8 h-8 rounded-full border-none cursor-pointer p-0"
            />

            {/* Hex Display Input */}
            <input
              type="text"
              value={customColor}
              onChange={onCustomColorInputChange}
              className="flex-grow border rounded px-2 py-1 text-xs"
              style={{ width: "80px" }}
            />

            <button
              onClick={onApplyCustomColor}
              className="p-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              title="Apply Custom Color"
            >
              <Edit className="size-4" />
            </button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  // local state to sync with SketchPicker
  const [color, setColor] = useState(value);

  const onChange = (colorResult: ColorResult) => {
    setColor(colorResult.hex);
    editor?.chain().focus().setColor(colorResult.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="text-xs">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="space-y-3 p-2 flex flex-col items-center">
        {/* Circle Picker: colors={[]} */}
        <CirclePicker color={color} onChangeComplete={onChange} />

        <Separator />

        {/* Sketch Picker */}
        <SketchPicker className="w-full" color={color} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal Text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontSize }) => (
          <button
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            key={value}
            style={{ fontSize }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              ((value === 0 && !editor?.isActive("heading")) ||
                editor?.isActive("heading", { level: value })) &&
                "bg-neutral-400/80"
            )}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Impact", value: "Impact" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
    { label: "Lucida Console", value: "Lucida Console" },
    { label: "Palatino Linotype", value: "Palatino Linotype" },
    { label: "Garamond", value: "Garamond" },
    { label: "Bookman", value: "Bookman" },
    { label: "Candara", value: "Candara" },
    { label: "Calibri", value: "Calibri" },
    { label: "Optima", value: "Optima" },
    { label: "Futura", value: "Futura" },
    { label: "American Typewriter", value: "American Typewriter" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => {
              editor
                ?.chain()
                .focus()
                .setMark("textStyle", { fontFamily: value })
                .run();
            }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-400/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-400/80"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-400/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

const Toolbar = () => {
  const { editor } = useEditorStore();

  console.log("Toolbar editor:", { editor });

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => {
          if (!editor) return;
          editor.chain().focus().toggleUnderline().run();
        },
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => {
          alert("Add Comment clicked");
        },
        isActive: false,
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] PX-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto ">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-7 bg-neutral-300 " />
      {/* TODO: Font Family */}
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-7  bg-neutral-300 " />
      {/* TODO: Heading */}
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-7 bg-neutral-300 " />
      {/* TODO: Font Size */}
      <FontSizeButton />
      <Separator orientation="vertical" className="h-7 bg-neutral-300 " />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* TODO: Text Colour */}
      <TextColorButton />
      {/* TODO: Highlight Colour */}
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-7 bg-neutral-300 " />
      {/* TODO: Link */}
      <LinkButton />
      {/* TODO: Image */}
      <ImageButton />
      {/* TODO: Align */}
      <AlignButton />
      {/* TODO: Line Height */}
      <LineHeightButton />
      {/* TODO: List */}
      <ListButton />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* 2:29:20 hr */}
    </div>
  );
};

export default Toolbar;
