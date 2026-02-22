"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  MdDeleteForever,
  MdEdit,
  MdClose,
  MdAddPhotoAlternate,
  MdCloudUpload,
  MdRefresh,
  MdCheck,
  MdClose as MdCloseIcon,
} from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { useTheme } from "@/providers/ThemeProvider";

// import {
//   useCreateSpotMutation,
//   useDeleteSpotMutation,
//   useGetAllSpotQuery,
//   useUpdateSpotMutation,
// } from "@/redux/features/spot/spotApi";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import {
  useCreateSpotMutation,
  useDeleteSpotMutation,
  useGetAllSpotQuery,
  useUpdateSpotMutation,
} from "@/redux/features/club/spotApi";

/* ---------- Types ---------- */
interface IncludedItem {
  title: string;
  isIncluded: boolean;
}

interface TourPlanItem {
  title: string;
  description: string;
}

interface ImageItem {
  url: string;
  publicId: string;
}

interface Spot {
  _id: string;
  name: string;
  image: ImageItem[];
  location: string;
  price: string;
  duration: string;
  tourType: string;
  details: {
    title: string;
    description: string;
  };
  experiences: string[];
  included: IncludedItem[];
  tourPlan: TourPlanItem[];
}

interface FormData {
  name: string;
  image: ImageItem[];
  location: string;
  price: string;
  duration: string;
  tourType: string;
  detailsTitle: string;
  detailsDescription: string;
  experiences: { value: string }[];
  included: IncludedItem[];
  tourPlan: TourPlanItem[];
}

/* ---------- Helper Functions ---------- */
const getThemeClasses = (theme: "light" | "dark") => ({
  // Backgrounds
  bgPrimary: `${theme === "light" ? "bg-white" : "bg-gray-900"}`,
  bgSecondary: `${theme === "light" ? "bg-gray-50" : "bg-gray-800"}`,
  bgTertiary: `${theme === "light" ? "bg-gray-100" : "bg-gray-700"}`,
  bgCard: `${theme === "light" ? "bg-white" : "bg-gray-800"}`,
  bgModal: `${theme === "light" ? "bg-white" : "bg-gray-800"}`,
  bgGlass: `${
    theme === "light"
      ? "bg-white/70 backdrop-blur-md"
      : "bg-gray-800/70 backdrop-blur-md"
  }`,

  // Text
  textPrimary: `${theme === "light" ? "text-gray-800" : "text-gray-200"}`,
  textSecondary: `${theme === "light" ? "text-gray-600" : "text-gray-300"}`,
  textMuted: `${theme === "light" ? "text-gray-500" : "text-gray-400"}`,
  textSuccess: `${theme === "light" ? "text-green-600" : "text-green-400"}`,
  textDanger: `${theme === "light" ? "text-red-600" : "text-red-400"}`,

  // Borders
  border: `${theme === "light" ? "border-gray-200" : "border-gray-700"}`,
  borderLight: `${theme === "light" ? "border-gray-300" : "border-gray-600"}`,
  borderInput: `${theme === "light" ? "border-gray-300" : "border-gray-600"}`,

  // Buttons
  btnPrimary: `${
    theme === "light"
      ? "bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
      : "bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
  }`,

  btnSecondary: `${
    theme === "light"
      ? "bg-linear-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 border border-gray-200"
      : "bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-gray-300 border border-gray-700"
  }`,

  btnDanger: `${
    theme === "light"
      ? "bg-red-500 hover:bg-red-600 text-white"
      : "bg-red-600 hover:bg-red-700 text-white"
  }`,

  btnOutline: `${
    theme === "light"
      ? "border border-gray-300 hover:bg-gray-50 text-gray-700"
      : "border border-gray-600 hover:bg-gray-800 text-gray-300"
  }`,

  // Shadows
  shadow: `${
    theme === "light" ? "shadow-lg" : "shadow-2xl shadow-gray-900/50"
  }`,
  shadowHover: `${
    theme === "light"
      ? "hover:shadow-xl"
      : "hover:shadow-2xl hover:shadow-gray-900/70"
  }`,

  // Gradients
  gradientPrimary: `${
    theme === "light"
      ? "from-blue-600 to-purple-600"
      : "from-blue-400 to-purple-400"
  }`,

  gradientBg: `${
    theme === "light"
      ? "from-gray-50 via-white to-gray-100"
      : "from-gray-900 via-gray-800 to-gray-900"
  }`,

  // Icons
  iconPrimary: `${theme === "light" ? "text-blue-600" : "text-blue-400"}`,
  iconSecondary: `${theme === "light" ? "text-gray-600" : "text-gray-400"}`,

  // Form Elements
  inputBg: `${theme === "light" ? "bg-white" : "bg-gray-700"}`,
  inputText: `${theme === "light" ? "text-gray-900" : "text-gray-100"}`,

  // Modal
  modalBg: `${
    theme === "light"
      ? "bg-linear-to-br from-white to-gray-50 border-gray-100"
      : "bg-linear-to-br from-gray-800 to-gray-900 border-gray-700"
  }`,

  // Glass Effect
  glass: `${
    theme === "light"
      ? "bg-white/70 backdrop-blur-md border border-white/20"
      : "bg-gray-800/70 backdrop-blur-md border border-gray-700/50"
  }`,
});

/* ---------- Component ---------- */
const SpotAdmin: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetAllSpotQuery(undefined);
  const [deleteSpot] = useDeleteSpotMutation();
  const [createSpot] = useCreateSpotMutation();
  const { uploadToCloudinary, loading: imageUploading } = useCloudinaryUpload();
  const [updateSpot, { isLoading: updating }] = useUpdateSpotMutation();
  const { theme } = useTheme();

  const spots: Spot[] = data?.data?.data || [];
  const themeClasses = getThemeClasses(theme);

  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentSpot, setCurrentSpot] = useState<Spot | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);

  // Refs
  const modalRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit, control, reset, setValue, watch, getValues } =
    useForm<FormData>({
      defaultValues: {
        image: [],
        experiences: [{ value: "" }],
        included: [{ title: "", isIncluded: false }],
        tourPlan: [{ title: "", description: "" }],
        name: "",
        location: "",
        price: "",
        duration: "",
        tourType: "",
        detailsTitle: "",
        detailsDescription: "",
      },
    });

  const expField = useFieldArray({ control, name: "experiences" });
  const incField = useFieldArray({ control, name: "included" });
  const planField = useFieldArray({ control, name: "tourPlan" });

  // Click-outside handlers
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      if (showModal && modalRef.current && !modalRef.current.contains(target)) {
        handleCloseModal();
      }
      if (
        showDetailsModal &&
        detailsRef.current &&
        !detailsRef.current.contains(target)
      ) {
        setShowDetailsModal(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [showModal, showDetailsModal]);

  // Delete spot
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this spot?")) return;

    try {
      const t = toast.loading("Deleting spot...");
      await deleteSpot(id).unwrap();
      toast.dismiss(t);
      toast.success("Spot deleted successfully!");
      refetch();
      setShowDetailsModal(false);
    } catch (err) {
      toast.error("Failed to delete spot");
      console.error(err);
    }
  };

  // Open add modal
  const handleAddSpot = () => {
    setCurrentSpot(null);
    reset({
      image: [],
      experiences: [{ value: "" }],
      included: [{ title: "", isIncluded: false }],
      tourPlan: [{ title: "", description: "" }],
      name: "",
      location: "",
      price: "",
      duration: "",
      tourType: "",
      detailsTitle: "",
      detailsDescription: "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  const handleViewDetails = (spot: Spot) => {
    setCurrentSpot(spot);
    setShowDetailsModal(true);
  };

  // Upload files
  const uploadFiles = async (files: File[]) => {
    if (!files || files.length === 0) return;
    setUploadingCount((c) => c + files.length);
    const tid = toast.loading(`Uploading ${files.length} image(s)...`);

    const uploadPromises = files.map(async (file) => {
      try {
        return await uploadToCloudinary(file);
      } catch (err) {
        console.error("Upload failed for a file", err);
        throw err;
      }
    });

    try {
      const results = await Promise.allSettled(uploadPromises);
      const successfulUploads = results
        .filter(
          (result): result is PromiseFulfilledResult<ImageItem> =>
            result.status === "fulfilled"
        )
        .map((result) => result.value);

      const current = getValues("image") || [];
      setValue("image", [...current, ...successfulUploads], {
        shouldDirty: true,
      });

      toast.dismiss(tid);
      if (successfulUploads.length === files.length) {
        toast.success(
          `${successfulUploads.length} image(s) uploaded successfully!`
        );
      } else {
        toast.success(
          `${successfulUploads.length}/${files.length} images uploaded. Some failed.`
        );
      }
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploadingCount(0);
    }
  };

  // Handle file input selection
  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (arr.length === 0) {
      toast.error("Please select valid image files only");
      return;
    }
    await uploadFiles(arr);
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const dt = e.dataTransfer;
    const files = Array.from(dt.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length === 0) {
      toast.error("Please drop valid image files only");
      return;
    }
    await uploadFiles(files);
  };

  // Remove an image at index
  const handleRemoveImage = (index: number) => {
    const images = getValues("image") || [];
    const newImgs = images.filter((_, i) => i !== index);
    setValue("image", newImgs, { shouldDirty: true });
  };

  // Submit handler
  const onSubmit = async (formData: FormData) => {
    if (!formData.image || formData.image.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    const formattedData = {
      name: formData.name,
      image: formData.image,
      location: formData.location,
      price: formData.price,
      duration: formData.duration,
      tourType: formData.tourType,
      details: {
        title: formData.detailsTitle,
        description: formData.detailsDescription,
      },
      experiences: formData.experiences.map((e) => e.value).filter(Boolean),
      included: formData.included.filter((item) => item.title.trim() !== ""),
      tourPlan: formData.tourPlan.filter(
        (item) => item.title.trim() !== "" || item.description.trim() !== ""
      ),
    };

    try {
      const t = toast.loading(
        currentSpot ? "Updating spot..." : "Creating spot..."
      );

      if (currentSpot) {
        await updateSpot({
          id: currentSpot._id,
          payload: formattedData,
        }).unwrap();
        toast.success("Spot updated successfully!");
      } else {
        await createSpot(formattedData).unwrap();
        toast.success("Spot created successfully!");
      }

      toast.dismiss(t);
      handleCloseModal();
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save spot");
      console.error(err);
    }
  };

  // Populate form when editing
  const handleEditClick = (spot: Spot) => {
    setCurrentSpot(spot);
    reset({
      name: spot.name,
      image: spot.image || [],
      location: spot.location,
      price: spot.price,
      duration: spot.duration,
      tourType: spot.tourType,
      detailsTitle: spot.details?.title || "",
      detailsDescription: spot.details?.description || "",
      experiences: (spot.experiences || []).map((exp) => ({ value: exp })),
      included: spot.included?.length
        ? spot.included
        : [{ title: "", isIncluded: false }],
      tourPlan: spot.tourPlan?.length
        ? spot.tourPlan
        : [{ title: "", description: "" }],
    });
    setShowModal(true);
  };

  const uploadedImages = watch("image") || [];

  if (isLoading)
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${themeClasses.gradientBg}`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-screen ${themeClasses.gradientBg}`}
      >
        <div
          className={`p-4 rounded-lg ${
            theme === "light"
              ? "bg-red-50 border-l-4 border-red-500"
              : "bg-red-900/30 border-l-4 border-red-600"
          }`}
        >
          <p
            className={`font-semibold ${
              theme === "light" ? "text-red-700" : "text-red-400"
            }`}
          >
            Error loading spots!
          </p>
          <button
            onClick={() => refetch()}
            className={`mt-2 px-4 py-2 rounded ${
              theme === "light"
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-red-800/50 text-red-300 hover:bg-red-800"
            }`}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className={`min-h-screen ${themeClasses.gradientBg} p-4 md:p-6`}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#f3f4f6" : "#111827",
            borderRadius: "10px",
            border:
              theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
          },
        }}
      />

      {/* HEADER */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1
              className={`text-3xl md:text-4xl font-bold bg-linear-to-r ${themeClasses.gradientPrimary} bg-clip-text text-transparent`}
            >
              Spots Management
            </h1>
            <p className={`${themeClasses.textMuted} mt-2`}>
              Manage travel spots, upload images, and organize tour details
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                refetch();
                toast.success("Data refreshed!");
              }}
              className={`${themeClasses.glass} px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${themeClasses.textSecondary} flex items-center gap-2`}
            >
              <MdRefresh className="w-5 h-5" />
              Refresh
            </button>
            <button
              onClick={handleAddSpot}
              className={`${themeClasses.btnPrimary} px-5 py-2.5 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2`}
            >
              <MdAddPhotoAlternate className="w-5 h-5" />
              Add New Spot
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className={`${themeClasses.glass} rounded-2xl p-5 shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeClasses.textMuted}`}>
                  Total Spots
                </p>
                <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>
                  {spots.length}
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${
                  theme === "light" ? "bg-blue-100" : "bg-blue-900/30"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-blue-500" : "text-blue-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className={`${themeClasses.glass} rounded-2xl p-5 shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeClasses.textMuted}`}>Locations</p>
                <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>
                  {new Set(spots.map((s) => s.location)).size}
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${
                  theme === "light" ? "bg-green-100" : "bg-green-900/30"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-green-500" : "text-green-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SPOT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {spots.map((spot) => (
          <div
            key={spot._id}
            className={`group ${themeClasses.bgCard} rounded-2xl overflow-hidden shadow-lg ${themeClasses.shadowHover} transition-all duration-300 hover:-translate-y-1 border ${themeClasses.border}`}
          >
            {/* Image with overlay */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={spot.image?.[0]?.url}
                alt={spot.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(spot);
                  }}
                  className={`p-2 ${
                    theme === "light" ? "bg-white/90" : "bg-gray-800/90"
                  } backdrop-blur-sm rounded-full shadow ${
                    theme === "light" ? "hover:bg-white" : "hover:bg-gray-700"
                  } transition`}
                  title="Edit"
                >
                  <MdEdit
                    className={`w-4 h-4 ${
                      theme === "light" ? "text-blue-600" : "text-blue-400"
                    }`}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(spot._id);
                  }}
                  className={`p-2 ${
                    theme === "light" ? "bg-white/90" : "bg-gray-800/90"
                  } backdrop-blur-sm rounded-full shadow ${
                    theme === "light" ? "hover:bg-white" : "hover:bg-gray-700"
                  } transition`}
                  title="Delete"
                >
                  <MdDeleteForever
                    className={`w-4 h-4 ${
                      theme === "light" ? "text-red-600" : "text-red-400"
                    }`}
                  />
                </button>
              </div>
              <span
                className={`absolute top-3 left-3 px-3 py-1 ${
                  theme === "light"
                    ? "bg-white/90 text-gray-800"
                    : "bg-gray-800/90 text-gray-200"
                } backdrop-blur-sm text-xs font-semibold rounded-full`}
              >
                {spot.location}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3
                  className={`font-bold text-lg ${themeClasses.textPrimary} line-clamp-1`}
                >
                  {spot.name}
                </h3>
                <span
                  className={`px-3 py-1 ${
                    theme === "light"
                      ? "bg-linear-to-r from-blue-50 to-blue-100 text-blue-600"
                      : "bg-linear-to-r from-blue-900/30 to-blue-800/30 text-blue-400"
                  } font-semibold rounded-full text-sm`}
                >
                  ৳ {spot.price}
                </span>
              </div>

              <p
                className={`text-sm ${themeClasses.textMuted} mb-4 flex items-center gap-1`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {spot.duration}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleViewDetails(spot)}
                  className={`${themeClasses.btnSecondary} flex-1 py-2.5 text-sm transition-all duration-200 flex items-center justify-center gap-2`}
                >
                  <FiEye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(spot);
                  }}
                  className={`${themeClasses.btnPrimary} px-4 py-2.5 text-sm transition-all duration-200`}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className={`${themeClasses.modalBg} p-6 w-full max-w-4xl rounded-2xl overflow-y-auto max-h-[95vh] shadow-2xl border`}
          >
            <div
              className={`flex justify-between items-center mb-6 pb-4 border-b ${
                theme === "light" ? "border-gray-200" : "border-gray-700"
              }`}
            >
              <div>
                <h2
                  className={`text-2xl font-bold bg-linear-to-r ${themeClasses.gradientPrimary} bg-clip-text text-transparent`}
                >
                  {currentSpot ? "Edit Spot" : "Create New Spot"}
                </h2>
                <p className={`text-sm ${themeClasses.textMuted}`}>
                  {currentSpot
                    ? "Update spot details"
                    : "Add a new travel spot"}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className={`p-2 hover:${
                  theme === "light" ? "bg-gray-100" : "bg-gray-700"
                } rounded-full transition`}
              >
                <MdClose className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`font-semibold block mb-2 ${themeClasses.textPrimary}`}
                  >
                    Spot Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.borderInput} ${themeClasses.inputText}`}
                    placeholder="Enter spot name"
                  />
                </div>

                <div>
                  <label
                    className={`font-semibold block mb-2 ${themeClasses.textPrimary}`}
                  >
                    Location
                  </label>
                  <select
                    {...register("location", { required: true })}
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.borderInput} ${themeClasses.inputText}`}
                  >
                    <option value="">Select Location</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Cox's Bazar">Cox's Bazar</option>
                    <option value="Bandarban">Bandarban</option>
                    <option value="Khulna">Khulna</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`font-semibold block mb-2 ${themeClasses.textPrimary}`}
                  >
                    Price (৳)
                  </label>
                  <input
                    {...register("price", { required: true })}
                    type="number"
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.borderInput} ${themeClasses.inputText}`}
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <label
                    className={`font-semibold block mb-2 ${themeClasses.textPrimary}`}
                  >
                    Duration
                  </label>
                  <input
                    {...register("duration", { required: true })}
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.borderInput} ${themeClasses.inputText}`}
                    placeholder="e.g., 3 days 2 nights"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    className={`font-semibold block mb-2 ${themeClasses.textPrimary}`}
                  >
                    Tour Type
                  </label>
                  <input
                    {...register("tourType", { required: true })}
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.borderInput} ${themeClasses.inputText}`}
                    placeholder="e.g., Adventure, Relaxation, Cultural"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label
                  className={`font-semibold block mb-2 ${themeClasses.textPrimary}`}
                >
                  Spot Images
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full p-8 border-2 rounded-2xl border-dashed flex flex-col items-center justify-center gap-4 transition-all duration-300 cursor-pointer ${
                    dragOver
                      ? `border-blue-500 ${
                          theme === "light" ? "bg-blue-50" : "bg-blue-900/20"
                        }`
                      : `${
                          theme === "light"
                            ? "border-gray-300 hover:border-blue-400 hover:bg-blue-50/50"
                            : "border-gray-600 hover:border-blue-500 hover:bg-blue-900/10"
                        }`
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div
                    className={`p-4 rounded-full ${
                      theme === "light"
                        ? "bg-linear-to-r from-blue-100 to-purple-100"
                        : "bg-linear-to-r from-blue-900/30 to-purple-900/30"
                    }`}
                  >
                    <MdCloudUpload
                      className={`w-12 h-12 ${
                        theme === "light" ? "text-blue-500" : "text-blue-400"
                      }`}
                    />
                  </div>
                  <div className="text-center">
                    <p className={`font-medium ${themeClasses.textPrimary}`}>
                      Drag & drop images here or click to upload
                    </p>
                    <p className={`text-sm ${themeClasses.textMuted} mt-1`}>
                      Supports JPG, PNG, WebP. Max 10MB per image
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className={`${themeClasses.btnPrimary} px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200`}
                  >
                    Browse Files
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFilesSelected(e.target.files)}
                    className="hidden"
                  />

                  {(imageUploading || uploadingCount > 0) && (
                    <div className="flex items-center gap-3 mt-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                      <p
                        className={`text-sm ${
                          theme === "light" ? "text-blue-600" : "text-blue-400"
                        }`}
                      >
                        Uploading images...
                      </p>
                    </div>
                  )}
                </div>

                {/* Image Preview Grid */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4">
                    <p
                      className={`font-medium ${themeClasses.textPrimary} mb-3`}
                    >
                      Uploaded Images ({uploadedImages.length})
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {uploadedImages.map((img, idx) => (
                        <div
                          key={(img.publicId ?? idx) + idx}
                          className={`relative rounded-xl overflow-hidden border ${
                            theme === "light"
                              ? "border-gray-200"
                              : "border-gray-700"
                          } group`}
                        >
                          <img
                            src={img.url}
                            alt={`preview-${idx}`}
                            className="w-full h-24 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage(idx);
                              }}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                              title="Remove image"
                            >
                              <MdCloseIcon className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div
                className={`${
                  theme === "light" ? "bg-gray-50/50" : "bg-gray-800/30"
                } p-5 rounded-2xl border ${themeClasses.border}`}
              >
                <h3
                  className={`font-semibold text-lg ${themeClasses.textPrimary} mb-3`}
                >
                  Spot Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      className={`font-medium ${themeClasses.textPrimary} block mb-2`}
                    >
                      Details Title
                    </label>
                    <input
                      {...register("detailsTitle", { required: true })}
                      className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.borderInput} ${themeClasses.inputText}`}
                      placeholder="Enter details title"
                    />
                  </div>
                  <div>
                    <label
                      className={`font-medium ${themeClasses.textPrimary} block mb-2`}
                    >
                      Details Description
                    </label>
                    <textarea
                      {...register("detailsDescription", { required: true })}
                      rows={4}
                      className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.borderInput} ${themeClasses.inputText}`}
                      placeholder="Enter detailed description"
                    />
                  </div>
                </div>
              </div>

              {/* Experiences Section */}
              <div
                className={`${
                  theme === "light" ? "bg-gray-50/50" : "bg-gray-800/30"
                } p-5 rounded-2xl border ${themeClasses.border}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3
                    className={`font-semibold text-lg ${themeClasses.textPrimary}`}
                  >
                    Experiences
                  </h3>
                  <button
                    type="button"
                    onClick={() => expField.append({ value: "" })}
                    className={`${themeClasses.btnPrimary} px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2`}
                  >
                    <MdAddPhotoAlternate className="w-4 h-4" />
                    Add Experience
                  </button>
                </div>
                <div className="space-y-3">
                  {expField.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 items-center">
                      <div className="flex-1">
                        <input
                          {...register(`experiences.${index}.value` as const)}
                          className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.borderInput} ${themeClasses.inputText}`}
                          placeholder="Enter experience description"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => expField.remove(index)}
                        className={`p-3 ${
                          theme === "light"
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-red-900/30 text-red-400 hover:bg-red-800/30"
                        } rounded-xl transition`}
                        title="Remove"
                      >
                        <MdClose className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included Section */}
              <div
                className={`${
                  theme === "light" ? "bg-gray-50/50" : "bg-gray-800/30"
                } p-5 rounded-2xl border ${themeClasses.border}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3
                    className={`font-semibold text-lg ${themeClasses.textPrimary}`}
                  >
                    Inclusions
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      incField.append({ title: "", isIncluded: false })
                    }
                    className={`${themeClasses.btnPrimary} px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2`}
                  >
                    <MdAddPhotoAlternate className="w-4 h-4" />
                    Add Inclusion
                  </button>
                </div>
                <div className="space-y-3">
                  {incField.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 items-center">
                      <div className="flex-1">
                        <input
                          {...register(`included.${index}.title` as const)}
                          className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.borderInput} ${themeClasses.inputText}`}
                          placeholder="Enter inclusion title"
                        />
                      </div>
                      <div className="flex items-center gap-2 px-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            {...register(
                              `included.${index}.isIncluded` as const
                            )}
                            className={`w-4 h-4 ${
                              theme === "light"
                                ? "text-blue-600"
                                : "text-blue-400"
                            } rounded focus:ring-blue-500`}
                          />
                          <span
                            className={`text-sm ${themeClasses.textPrimary}`}
                          >
                            Included
                          </span>
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => incField.remove(index)}
                        className={`p-3 ${
                          theme === "light"
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-red-900/30 text-red-400 hover:bg-red-800/30"
                        } rounded-xl transition`}
                        title="Remove"
                      >
                        <MdClose className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tour Plan Section */}
              <div
                className={`${
                  theme === "light" ? "bg-gray-50/50" : "bg-gray-800/30"
                } p-5 rounded-2xl border ${themeClasses.border}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3
                    className={`font-semibold text-lg ${themeClasses.textPrimary}`}
                  >
                    Tour Plan
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      planField.append({ title: "", description: "" })
                    }
                    className={`${themeClasses.btnPrimary} px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2`}
                  >
                    <MdAddPhotoAlternate className="w-4 h-4" />
                    Add Day
                  </button>
                </div>
                <div className="space-y-4">
                  {planField.fields.map((field, index) => (
                    <div
                      key={field.id}
                      className={`p-4 border ${themeClasses.border} rounded-xl ${themeClasses.bgCard} shadow-sm`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4
                          className={`font-medium ${themeClasses.textPrimary}`}
                        >
                          Day {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => planField.remove(index)}
                          className={`p-2 ${
                            theme === "light"
                              ? "text-red-600 hover:bg-red-50"
                              : "text-red-400 hover:bg-red-900/30"
                          } rounded-lg transition`}
                        >
                          <MdClose className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          {...register(`tourPlan.${index}.title` as const)}
                          className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.borderInput} ${themeClasses.inputText}`}
                          placeholder="Enter day title"
                        />
                        <textarea
                          {...register(
                            `tourPlan.${index}.description` as const
                          )}
                          rows={3}
                          className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.borderInput} ${themeClasses.inputText}`}
                          placeholder="Enter day description"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div
                className={`flex justify-end gap-3 pt-4 border-t ${
                  theme === "light" ? "border-gray-200" : "border-gray-700"
                }`}
              >
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={`${themeClasses.btnOutline} px-6 py-3 rounded-xl font-medium transition-all duration-200`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating || imageUploading || uploadingCount > 0}
                  className={`${
                    themeClasses.btnPrimary
                  } px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 ${
                    updating || imageUploading || uploadingCount > 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {updating || imageUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      {currentSpot ? "Updating..." : "Creating..."}
                    </>
                  ) : currentSpot ? (
                    "Update Spot"
                  ) : (
                    "Create Spot"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {showDetailsModal && currentSpot && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div
            ref={detailsRef}
            className={`${themeClasses.modalBg} rounded-2xl p-6 w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl border`}
          >
            <div
              className={`flex justify-between items-start gap-4 mb-6 pb-4 border-b ${
                theme === "light" ? "border-gray-200" : "border-gray-700"
              }`}
            >
              <div>
                <h2
                  className={`text-2xl font-bold ${themeClasses.textPrimary}`}
                >
                  {currentSpot.name}
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <span
                    className={`px-3 py-1 ${
                      theme === "light"
                        ? "bg-linear-to-r from-blue-50 to-blue-100 text-blue-600"
                        : "bg-linear-to-r from-blue-900/30 to-blue-800/30 text-blue-400"
                    } font-medium rounded-full text-sm`}
                  >
                    📍 {currentSpot.location}
                  </span>
                  <span
                    className={`px-3 py-1 ${
                      theme === "light"
                        ? "bg-linear-to-r from-green-50 to-green-100 text-green-600"
                        : "bg-linear-to-r from-green-900/30 to-green-800/30 text-green-400"
                    } font-medium rounded-full text-sm`}
                  >
                    ৳ {currentSpot.price}
                  </span>
                  <span
                    className={`px-3 py-1 ${
                      theme === "light"
                        ? "bg-linear-to-r from-purple-50 to-purple-100 text-purple-600"
                        : "bg-linear-to-r from-purple-900/30 to-purple-800/30 text-purple-400"
                    } font-medium rounded-full text-sm`}
                  >
                    {currentSpot.duration}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className={`p-2 hover:${
                    theme === "light" ? "bg-gray-100" : "bg-gray-700"
                  } rounded-full transition`}
                  title="Close"
                >
                  <MdClose className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Images Gallery */}
            <div className="mb-6">
              <h3
                className={`font-semibold text-lg ${themeClasses.textPrimary} mb-3`}
              >
                Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {currentSpot.image.map((img, i) => (
                  <div
                    key={img.publicId + i}
                    className={`w-full h-56 overflow-hidden rounded-xl border ${themeClasses.border}`}
                  >
                    <img
                      src={img.url}
                      alt={`${currentSpot.name}-img-${i}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Details */}
              <div
                className={`${
                  theme === "light" ? "bg-gray-50/50" : "bg-gray-800/30"
                } p-5 rounded-2xl border ${themeClasses.border}`}
              >
                <h3
                  className={`font-semibold text-lg ${themeClasses.textPrimary} mb-3`}
                >
                  Spot Details
                </h3>
                <div>
                  <h4
                    className={`font-medium ${themeClasses.textPrimary} mb-2`}
                  >
                    {currentSpot.details.title}
                  </h4>
                  <p
                    className={`${themeClasses.textSecondary} leading-relaxed`}
                  >
                    {currentSpot.details.description}
                  </p>
                </div>
              </div>

              {/* Tour Info */}
              <div
                className={`${
                  theme === "light" ? "bg-gray-50/50" : "bg-gray-800/30"
                } p-5 rounded-2xl border ${themeClasses.border}`}
              >
                <h3
                  className={`font-semibold text-lg ${themeClasses.textPrimary} mb-3`}
                >
                  Tour Information
                </h3>
                <div className="space-y-3">
                  <div
                    className={`flex justify-between items-center py-2 border-b ${themeClasses.border}`}
                  >
                    <span className={`${themeClasses.textSecondary}`}>
                      Tour Type
                    </span>
                    <span className={`font-medium ${themeClasses.textPrimary}`}>
                      {currentSpot.tourType}
                    </span>
                  </div>
                  <div
                    className={`flex justify-between items-center py-2 border-b ${themeClasses.border}`}
                  >
                    <span className={`${themeClasses.textSecondary}`}>
                      Duration
                    </span>
                    <span className={`font-medium ${themeClasses.textPrimary}`}>
                      {currentSpot.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className={`${themeClasses.textSecondary}`}>
                      Price
                    </span>
                    <span
                      className={`font-bold ${
                        theme === "light" ? "text-blue-600" : "text-blue-400"
                      }`}
                    >
                      ৳ {currentSpot.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experiences */}
            <div
              className={`mt-6 ${
                theme === "light" ? "bg-gray-50/50" : "bg-gray-800/30"
              } p-5 rounded-2xl border ${themeClasses.border}`}
            >
              <h3
                className={`font-semibold text-lg ${themeClasses.textPrimary} mb-3`}
              >
                Experiences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentSpot.experiences.map((exp, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 p-3 ${themeClasses.bgCard} rounded-xl border ${themeClasses.border}`}
                  >
                    <div
                      className={`w-2 h-2 ${
                        theme === "light" ? "bg-blue-500" : "bg-blue-400"
                      } rounded-full`}
                    ></div>
                    <span className={`${themeClasses.textPrimary}`}>{exp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included */}
            <div
              className={`mt-6 ${
                theme === "light" ? "bg-gray-50/50" : "bg-gray-800/30"
              } p-5 rounded-2xl border ${themeClasses.border}`}
            >
              <h3
                className={`font-semibold text-lg ${themeClasses.textPrimary} mb-3`}
              >
                Inclusions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentSpot.included.map((inc, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 ${themeClasses.bgCard} rounded-xl border ${themeClasses.border}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        inc.isIncluded
                          ? `${
                              theme === "light"
                                ? "bg-green-100 text-green-600"
                                : "bg-green-900/30 text-green-400"
                            }`
                          : `${
                              theme === "light"
                                ? "bg-red-100 text-red-600"
                                : "bg-red-900/30 text-red-400"
                            }`
                      }`}
                    >
                      {inc.isIncluded ? <MdCheck /> : <MdCloseIcon />}
                    </div>
                    <span className={`${themeClasses.textPrimary}`}>
                      {inc.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tour Plan */}
            <div
              className={`mt-6 ${
                theme === "light" ? "bg-gray-50/50" : "bg-gray-800/30"
              } p-5 rounded-2xl border ${themeClasses.border}`}
            >
              <h3
                className={`font-semibold text-lg ${themeClasses.textPrimary} mb-3`}
              >
                Tour Plan
              </h3>
              <div className="space-y-4">
                {currentSpot.tourPlan.map((plan, i) => (
                  <div
                    key={i}
                    className={`p-4 ${themeClasses.bgCard} rounded-xl border ${themeClasses.border}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-8 h-8 rounded-full bg-linear-to-r ${
                          theme === "light"
                            ? "from-blue-500 to-blue-600"
                            : "from-blue-600 to-blue-700"
                        } text-white flex items-center justify-center font-bold`}
                      >
                        {i + 1}
                      </div>
                      <h4
                        className={`font-semibold ${themeClasses.textPrimary}`}
                      >
                        {plan.title}
                      </h4>
                    </div>
                    <p className={`${themeClasses.textSecondary} ml-11`}>
                      {plan.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`flex justify-end gap-3 mt-6 pt-4 border-t ${
                theme === "light" ? "border-gray-200" : "border-gray-700"
              }`}
            >
              <button
                onClick={() => setShowDetailsModal(false)}
                className={`${themeClasses.btnOutline} px-6 py-3 rounded-xl font-medium transition-all duration-200`}
              >
                Close
              </button>
              <button
                onClick={() => handleEditClick(currentSpot)}
                className={`${themeClasses.btnPrimary} px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200`}
              >
                Edit Spot
              </button>
              <button
                onClick={() => handleDelete(currentSpot._id)}
                className={`${themeClasses.btnDanger} px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200`}
              >
                Delete Spot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotAdmin;
