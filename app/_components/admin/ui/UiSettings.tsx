"use client";

import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { useTheme } from "@/providers/ThemeProvider";
import {
  Upload,
  Edit,
  X,
  Save,
  Image as ImageIcon,
  Mail,
  MessageSquare,
  Globe,
  Camera,
  Plus,
  AlertCircle,
  Check,
} from "lucide-react";
import ThemeToggle from "../../shared/ThemeToggle";
import {
  useCreateUIDataMutation,
  useGetUIDataQuery,
  useUpdateUIDataMutation,
} from "@/redux/features/ui/uiApi";

interface ImageData {
  url: string;
  publicId: string;
}

export interface UIData {
  _id?: string;
  logo: ImageData;
  bannerImage: ImageData;
  whatsapp: string;
  email: string;
  address: string;
  travelPhoto: ImageData;
  explorePhoto: ImageData;
}

interface FormData {
  whatsapp: string;
  email: string;
  address: string;
}

const UiSettings: React.FC = () => {
  const { theme } = useTheme();
  const { data, isLoading: isFetching, refetch } = useGetUIDataQuery(undefined);
  const { uploadToCloudinary, loading: imageUploading } = useCloudinaryUpload();
  const [updateUIData, { isLoading: isUpdating }] = useUpdateUIDataMutation();
  const [createUIData, { isLoading: isCreating }] = useCreateUIDataMutation();

  const [latestUI, setLatestUI] = useState<UIData | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // File states
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [travelFile, setTravelFile] = useState<File | null>(null);
  const [exploreFile, setExploreFile] = useState<File | null>(null);

  // Image previews
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [travelPreview, setTravelPreview] = useState<string>("");
  const [explorePreview, setExplorePreview] = useState<string>("");

  // Theme-based styling functions
  const getThemeClasses = () => ({
    // Backgrounds
    bgPrimary: theme === "light" ? "bg-white" : "bg-gray-900",
    bgSecondary: theme === "light" ? "bg-gray-50" : "bg-gray-800",
    bgCard: theme === "light" ? "bg-white" : "bg-gray-800",
    bgModal: theme === "light" ? "bg-white" : "bg-gray-800",
    bgGlass:
      theme === "light"
        ? "bg-white/80 backdrop-blur-md"
        : "bg-gray-800/80 backdrop-blur-md",

    // Text
    textPrimary: theme === "light" ? "text-gray-800" : "text-gray-200",
    textSecondary: theme === "light" ? "text-gray-600" : "text-gray-300",
    textMuted: theme === "light" ? "text-gray-500" : "text-gray-400",
    textSuccess: theme === "light" ? "text-green-600" : "text-green-400",
    textDanger: theme === "light" ? "text-red-600" : "text-red-400",

    // Borders
    border: theme === "light" ? "border-gray-200" : "border-gray-700",
    borderLight: theme === "light" ? "border-gray-300" : "border-gray-600",
    borderInput: theme === "light" ? "border-gray-300" : "border-gray-600",

    // Buttons
    btnPrimary:
      theme === "light"
        ? "bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
        : "bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white",

    btnSecondary:
      theme === "light"
        ? "bg-linear-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 border border-gray-200"
        : "bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-gray-300 border border-gray-700",

    btnDanger:
      theme === "light"
        ? "bg-red-500 hover:bg-red-600 text-white"
        : "bg-red-600 hover:bg-red-700 text-white",

    btnOutline:
      theme === "light"
        ? "border border-gray-300 hover:bg-gray-50 text-gray-700"
        : "border border-gray-600 hover:bg-gray-800 text-gray-300",

    // Gradients
    gradientPrimary:
      theme === "light"
        ? "from-blue-600 to-purple-600"
        : "from-blue-400 to-purple-400",

    gradientBg:
      theme === "light"
        ? "from-gray-50 via-white to-gray-100"
        : "from-gray-900 via-gray-800 to-gray-900",

    // Inputs
    inputBg: theme === "light" ? "bg-white" : "bg-gray-700",
    inputText: theme === "light" ? "text-gray-900" : "text-gray-100",

    // Modal
    modalBg:
      theme === "light"
        ? "bg-linear-to-br from-white to-gray-50 border-gray-100"
        : "bg-linear-to-br from-gray-800 to-gray-900 border-gray-700",
  });

  const themeClasses = getThemeClasses();

  useEffect(() => {
    if (data?.data?.length) {
      setLatestUI(data.data.slice(-1)[0]);
    }
  }, [data]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match("image.*")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      setFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const clearFile = (
    preview: string,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview("");
  };

  const openEditModal = () => {
    if (latestUI) {
      reset({
        whatsapp: latestUI.whatsapp || "",
        email: latestUI.email || "",
        address: latestUI.address || "",
      });
      setLogoPreview(latestUI.logo?.url || "");
      setBannerPreview(latestUI.bannerImage?.url || "");
      setTravelPreview(latestUI.travelPhoto?.url || "");
      setExplorePreview(latestUI.explorePhoto?.url || "");
      setLogoFile(null);
      setBannerFile(null);
      setTravelFile(null);
      setExploreFile(null);
      setModalType("edit");
      setIsModalOpen(true);
    }
  };

  const openAddModal = () => {
    reset({
      whatsapp: "",
      email: "",
      address: "",
    });
    clearFile(logoPreview, setLogoFile, setLogoPreview);
    clearFile(bannerPreview, setBannerFile, setBannerPreview);
    clearFile(travelPreview, setTravelFile, setTravelPreview);
    clearFile(explorePreview, setExploreFile, setExplorePreview);
    setModalType("add");
    setIsModalOpen(true);
  };

  const onSubmit = async (formData: FormData) => {
    try {
      let logoData: ImageData = { url: "", publicId: "" };
      let bannerData: ImageData = { url: "", publicId: "" };
      let travelData: ImageData = { url: "", publicId: "" };
      let exploreData: ImageData = { url: "", publicId: "" };

      if (logoFile) {
        logoData = await uploadToCloudinary(logoFile);
      } else if (modalType === "edit" && latestUI?.logo?.url) {
        logoData = latestUI.logo;
      }

      if (bannerFile) {
        bannerData = await uploadToCloudinary(bannerFile);
      } else if (modalType === "edit" && latestUI?.bannerImage?.url) {
        bannerData = latestUI.bannerImage;
      }

      if (travelFile) {
        travelData = await uploadToCloudinary(travelFile);
      } else if (modalType === "edit" && latestUI?.travelPhoto?.url) {
        travelData = latestUI.travelPhoto;
      }

      if (exploreFile) {
        exploreData = await uploadToCloudinary(exploreFile);
      } else if (modalType === "edit" && latestUI?.explorePhoto?.url) {
        exploreData = latestUI.explorePhoto;
      }

      const uiData: UIData = {
        logo: logoData,
        bannerImage: bannerData,
        whatsapp: formData.whatsapp,
        email: formData.email,
        address: formData.address,
        travelPhoto: travelData,
        explorePhoto: exploreData,
      };

      if (modalType === "edit" && latestUI?._id) {
        await updateUIData({
          ...uiData,
          _id: latestUI._id,
        }).unwrap();
      } else {
        await createUIData(uiData).unwrap();
      }

      setIsModalOpen(false);
      refetch();

      alert(
        modalType === "edit"
          ? "UI Data updated successfully!"
          : "UI Data created successfully!"
      );
    } catch (err) {
      console.error("Form submit error:", err);
      alert("Failed to save UI data. Please try again.");
    }
  };

  useEffect(() => {
    return () => {
      [logoPreview, bannerPreview, travelPreview, explorePreview].forEach(
        (preview) => {
          if (preview?.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
          }
        }
      );
    };
  }, []);

  if (isFetching) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          theme === "light" ? "bg-gray-50" : "bg-gray-900"
        }`}
      >
        <div className="text-center">
          <div
            className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
              theme === "light" ? "border-blue-600" : "border-blue-400"
            } mx-auto`}
          ></div>
          <p
            className={`mt-4 text-lg font-semibold ${themeClasses.textPrimary}`}
          >
            Loading UI Data...
          </p>
        </div>
      </div>
    );
  }

  const isLoading = isCreating || isUpdating || imageUploading;

  return (
    <div
      className={`p-4 md:p-8 max-w-7xl mx-auto min-h-screen ${themeClasses.gradientBg}`}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1
            className={`text-2xl md:text-3xl font-bold ${themeClasses.textPrimary}`}
          >
            UI Settings
          </h1>
          <p className={`${themeClasses.textMuted} mt-1`}>
            Manage your website's UI configuration
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="flex flex-wrap gap-3">
            <button
              onClick={openAddModal}
              className={`${themeClasses.btnPrimary} px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2`}
            >
              <Plus className="w-5 h-5" />
              Add New UI Data
            </button>
            {latestUI && (
              <button
                onClick={openEditModal}
                className={`${
                  theme === "light"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-700 hover:bg-green-800"
                } text-white px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2`}
              >
                <Edit className="w-5 h-5" />
                Edit Latest UI
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CURRENT UI DATA CARD */}
      {latestUI ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${themeClasses.bgCard} rounded-2xl shadow-xl border ${themeClasses.border} p-6 mb-8`}
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className={`text-xl font-bold ${themeClasses.textPrimary}`}>
                Current UI Configuration
              </h2>
              <p className={`${themeClasses.textMuted} text-sm`}>
                Last updated configuration
              </p>
            </div>
            <div className={`text-sm ${themeClasses.textMuted}`}>
              ID: {latestUI._id?.substring(0, 8)}...
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h3
                className={`font-semibold text-lg ${themeClasses.textPrimary} mb-6 pb-3 border-b ${themeClasses.border}`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Contact Information
                </div>
              </h3>
              <div className="space-y-6">
                <div>
                  <label
                    className={`block text-sm font-medium ${themeClasses.textMuted} mb-2`}
                  >
                    WhatsApp Number
                  </label>
                  <div
                    className={`${
                      theme === "light" ? "bg-gray-50" : "bg-gray-800/50"
                    } p-4 rounded-xl`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          theme === "light" ? "bg-green-100" : "bg-green-900/30"
                        }`}
                      >
                        <MessageSquare
                          className={`w-5 h-5 ${
                            theme === "light"
                              ? "text-green-600"
                              : "text-green-400"
                          }`}
                        />
                      </div>
                      <p className={`font-medium ${themeClasses.textPrimary}`}>
                        {latestUI.whatsapp}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${themeClasses.textMuted} mb-2`}
                  >
                    Email Address
                  </label>
                  <div
                    className={`${
                      theme === "light" ? "bg-gray-50" : "bg-gray-800/50"
                    } p-4 rounded-xl`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          theme === "light" ? "bg-blue-100" : "bg-blue-900/30"
                        }`}
                      >
                        <Mail
                          className={`w-5 h-5 ${
                            theme === "light"
                              ? "text-blue-600"
                              : "text-blue-400"
                          }`}
                        />
                      </div>
                        <p className={`font-medium ${themeClasses.textPrimary}`}>
                          {latestUI.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium ${themeClasses.textMuted} mb-2`}
                    >
                      Physical Address
                    </label>
                    <div
                      className={`${
                        theme === "light" ? "bg-gray-50" : "bg-gray-800/50"
                      } p-4 rounded-xl`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            theme === "light" ? "bg-purple-100" : "bg-purple-900/30"
                          }`}
                        >
                          <Globe
                            className={`w-5 h-5 ${
                              theme === "light"
                                ? "text-purple-600"
                                : "text-purple-400"
                            }`}
                          />
                        </div>
                        <p className={`font-medium ${themeClasses.textPrimary}`}>
                          {latestUI.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            {/* Image Previews */}
            <div>
              <h3
                className={`font-semibold text-lg ${themeClasses.textPrimary} mb-6 pb-3 border-b ${themeClasses.border}`}
              >
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Brand Images
                </div>
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {latestUI.logo?.url && (
                  <div>
                    <label
                      className={`block text-sm font-medium ${themeClasses.textMuted} mb-3`}
                    >
                      Logo
                    </label>
                    <div
                      className={`h-40 ${
                        theme === "light" ? "bg-gray-100" : "bg-gray-800/50"
                      } rounded-xl border ${
                        themeClasses.border
                      } flex items-center justify-center overflow-hidden p-4`}
                    >
                      <img
                        src={latestUI.logo.url}
                        alt="Logo Preview"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/150x150?text=Logo";
                        }}
                      />
                    </div>
                  </div>
                )}

                {latestUI.bannerImage?.url && (
                  <div>
                    <label
                      className={`block text-sm font-medium ${themeClasses.textMuted} mb-3`}
                    >
                      Banner
                    </label>
                    <div
                      className={`h-40 ${
                        theme === "light" ? "bg-gray-100" : "bg-gray-800/50"
                      } rounded-xl border ${
                        themeClasses.border
                      } overflow-hidden`}
                    >
                      <img
                        src={latestUI.bannerImage.url}
                        alt="Banner Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/300x150?text=Banner";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Travel & Explore Photos */}
          <div className="mt-10">
            <h3
              className={`font-semibold text-lg ${themeClasses.textPrimary} mb-6 pb-3 border-b ${themeClasses.border}`}
            >
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Section Images
              </div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestUI.travelPhoto?.url && (
                <div>
                  <label
                    className={`block text-sm font-medium ${themeClasses.textMuted} mb-3`}
                  >
                    Travel Section Photo
                  </label>
                  <div
                    className={`h-56 ${
                      theme === "light" ? "bg-gray-100" : "bg-gray-800/50"
                    } rounded-xl border ${
                      themeClasses.border
                    } overflow-hidden relative group`}
                  >
                    <img
                      src={latestUI.travelPhoto.url}
                      alt="Travel Photo Preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/400x200?text=Travel+Photo";
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              )}

              {latestUI.explorePhoto?.url && (
                <div>
                  <label
                    className={`block text-sm font-medium ${themeClasses.textMuted} mb-3`}
                  >
                    Explore Section Photo
                  </label>
                  <div
                    className={`h-56 ${
                      theme === "light" ? "bg-gray-100" : "bg-gray-800/50"
                    } rounded-xl border ${
                      themeClasses.border
                    } overflow-hidden relative group`}
                  >
                    <img
                      src={latestUI.explorePhoto.url}
                      alt="Explore Photo Preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/400x200?text=Explore+Photo";
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <div
          className={`text-center py-16 ${
            theme === "light" ? "bg-gray-50" : "bg-gray-800/30"
          } rounded-2xl border-2 border-dashed ${themeClasses.border}`}
        >
          <div
            className={`w-20 h-20 ${
              theme === "light" ? "bg-blue-100" : "bg-blue-900/20"
            } rounded-full flex items-center justify-center mx-auto mb-6`}
          >
            <ImageIcon
              className={`w-10 h-10 ${
                theme === "light" ? "text-blue-600" : "text-blue-400"
              }`}
            />
          </div>
          <p className={`${themeClasses.textPrimary} text-lg font-medium`}>
            No UI data found
          </p>
          <p className={`${themeClasses.textMuted} mt-2`}>
            Click "Add New UI Data" to create your first configuration
          </p>
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isLoading && setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`${themeClasses.modalBg} rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                className={`${
                  theme === "light"
                    ? "bg-linear-to-r from-blue-50 to-gray-50"
                    : "bg-linear-to-r from-blue-900/20 to-gray-900/20"
                } px-6 py-5 border-b ${themeClasses.border}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2
                      className={`text-2xl font-bold ${themeClasses.textPrimary}`}
                    >
                      {modalType === "edit"
                        ? "Edit UI Data"
                        : "Add New UI Data"}
                    </h2>
                    <p className={`${themeClasses.textMuted}`}>
                      {modalType === "edit"
                        ? "Update your UI configuration"
                        : "Create new UI configuration"}
                    </p>
                  </div>
                  <button
                    onClick={() => !isLoading && setIsModalOpen(false)}
                    className={`p-2 ${
                      theme === "light"
                        ? "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                    } rounded-full transition`}
                    disabled={isLoading}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Contact Info */}
                    <div className="space-y-6">
                      <h3
                        className={`font-semibold text-lg ${themeClasses.textPrimary} pb-3 border-b ${themeClasses.border}`}
                      >
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-5 h-5" />
                          Contact Information
                        </div>
                      </h3>

                      <div>
                        <label
                          className={`block text-sm font-medium ${themeClasses.textPrimary} mb-2`}
                        >
                          WhatsApp Number{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register("whatsapp", {
                            required: "WhatsApp number is required",
                            pattern: {
                              value: /^\+?[1-9]\d{1,14}$/,
                              message: "Invalid phone number format",
                            },
                          })}
                          type="tel"
                          placeholder="+8801XXXXXXXXX"
                          className={`w-full p-3 border ${themeClasses.borderInput} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.inputText}`}
                          disabled={isLoading}
                        />
                        {errors.whatsapp && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.whatsapp.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium ${themeClasses.textPrimary} mb-2`}
                        >
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          type="email"
                          placeholder="contact@example.com"
                          className={`w-full p-3 border ${themeClasses.borderInput} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.inputText}`}
                          disabled={isLoading}
                        />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            className={`block text-sm font-medium ${themeClasses.textPrimary} mb-2`}
                          >
                            Physical Address <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            {...register("address", {
                              required: "Address is required",
                            })}
                            rows={3}
                            placeholder="123 Resort St, Paradise Island"
                            className={`w-full p-3 border ${themeClasses.borderInput} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${themeClasses.inputBg} ${themeClasses.inputText}`}
                            disabled={isLoading}
                          />
                          {errors.address && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.address.message}
                            </p>
                          )}
                        </div>
                      </div>

                    {/* Right Column - Images */}
                    <div className="space-y-6">
                      <h3
                        className={`font-semibold text-lg ${themeClasses.textPrimary} pb-3 border-b ${themeClasses.border}`}
                      >
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-5 h-5" />
                          Brand Images
                        </div>
                      </h3>

                      {/* Logo Upload */}
                      <div>
                        <label
                          className={`block text-sm font-medium ${themeClasses.textPrimary} mb-3`}
                        >
                          Logo Image
                        </label>
                        <div className="space-y-4">
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChange(e, setLogoFile, setLogoPreview)
                              }
                              className="hidden"
                              id="logo-upload"
                              disabled={isLoading}
                            />
                            <label
                              htmlFor="logo-upload"
                              className={`block cursor-pointer p-5 border-2 border-dashed ${
                                themeClasses.border
                              } rounded-xl text-center transition-all duration-200 ${
                                isLoading
                                  ? "opacity-50 cursor-not-allowed"
                                  : `hover:border-blue-400 ${
                                      theme === "light"
                                        ? "hover:bg-blue-50"
                                        : "hover:bg-blue-900/20"
                                    }`
                              }`}
                            >
                              <div
                                className={`w-12 h-12 ${
                                  theme === "light"
                                    ? "bg-blue-100"
                                    : "bg-blue-900/30"
                                } rounded-full flex items-center justify-center mx-auto mb-3`}
                              >
                                <Upload
                                  className={`w-6 h-6 ${
                                    theme === "light"
                                      ? "text-blue-600"
                                      : "text-blue-400"
                                  }`}
                                />
                              </div>
                              <span
                                className={`${themeClasses.textPrimary} font-medium`}
                              >
                                {logoPreview ? "Change Logo" : "Upload Logo"}
                              </span>
                              <p
                                className={`text-xs ${themeClasses.textMuted} mt-1`}
                              >
                                PNG, JPG, SVG (Max 5MB)
                              </p>
                            </label>
                          </div>

                          {logoPreview && (
                            <div className="relative">
                              <div
                                className={`h-40 ${
                                  theme === "light"
                                    ? "bg-gray-100"
                                    : "bg-gray-800/50"
                                } rounded-xl border ${
                                  themeClasses.border
                                } overflow-hidden p-4`}
                              >
                                <img
                                  src={logoPreview}
                                  alt="Logo Preview"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  clearFile(
                                    logoPreview,
                                    setLogoFile,
                                    setLogoPreview
                                  )
                                }
                                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                disabled={isLoading}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Banner Upload */}
                      <div>
                        <label
                          className={`block text-sm font-medium ${themeClasses.textPrimary} mb-3`}
                        >
                          Banner Image
                        </label>
                        <div className="space-y-4">
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChange(
                                  e,
                                  setBannerFile,
                                  setBannerPreview
                                )
                              }
                              className="hidden"
                              id="banner-upload"
                              disabled={isLoading}
                            />
                            <label
                              htmlFor="banner-upload"
                              className={`block cursor-pointer p-5 border-2 border-dashed ${
                                themeClasses.border
                              } rounded-xl text-center transition-all duration-200 ${
                                isLoading
                                  ? "opacity-50 cursor-not-allowed"
                                  : `hover:border-blue-400 ${
                                      theme === "light"
                                        ? "hover:bg-blue-50"
                                        : "hover:bg-blue-900/20"
                                    }`
                              }`}
                            >
                              <div
                                className={`w-12 h-12 ${
                                  theme === "light"
                                    ? "bg-blue-100"
                                    : "bg-blue-900/30"
                                } rounded-full flex items-center justify-center mx-auto mb-3`}
                              >
                                <Upload
                                  className={`w-6 h-6 ${
                                    theme === "light"
                                      ? "text-blue-600"
                                      : "text-blue-400"
                                  }`}
                                />
                              </div>
                              <span
                                className={`${themeClasses.textPrimary} font-medium`}
                              >
                                {bannerPreview
                                  ? "Change Banner"
                                  : "Upload Banner"}
                              </span>
                              <p
                                className={`text-xs ${themeClasses.textMuted} mt-1`}
                              >
                                PNG, JPG, WEBP (Max 5MB)
                              </p>
                            </label>
                          </div>

                          {bannerPreview && (
                            <div className="relative">
                              <div
                                className={`h-40 ${
                                  theme === "light"
                                    ? "bg-gray-100"
                                    : "bg-gray-800/50"
                                } rounded-xl border ${
                                  themeClasses.border
                                } overflow-hidden`}
                              >
                                <img
                                  src={bannerPreview}
                                  alt="Banner Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  clearFile(
                                    bannerPreview,
                                    setBannerFile,
                                    setBannerPreview
                                  )
                                }
                                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                disabled={isLoading}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Travel Photo Upload */}
                    <div>
                      <label
                        className={`block text-sm font-medium ${themeClasses.textPrimary} mb-3`}
                      >
                        Travel Section Photo
                      </label>
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(
                                e,
                                setTravelFile,
                                setTravelPreview
                              )
                            }
                            className="hidden"
                            id="travel-upload"
                            disabled={isLoading}
                          />
                          <label
                            htmlFor="travel-upload"
                            className={`block cursor-pointer p-5 border-2 border-dashed ${
                              themeClasses.border
                            } rounded-xl text-center transition-all duration-200 ${
                              isLoading
                                ? "opacity-50 cursor-not-allowed"
                                : `hover:border-blue-400 ${
                                    theme === "light"
                                      ? "hover:bg-blue-50"
                                      : "hover:bg-blue-900/20"
                                  }`
                            }`}
                          >
                            <div
                              className={`w-12 h-12 ${
                                theme === "light"
                                  ? "bg-green-100"
                                  : "bg-green-900/30"
                              } rounded-full flex items-center justify-center mx-auto mb-3`}
                            >
                              <Camera
                                className={`w-6 h-6 ${
                                  theme === "light"
                                    ? "text-green-600"
                                    : "text-green-400"
                                }`}
                              />
                            </div>
                            <span
                              className={`${themeClasses.textPrimary} font-medium`}
                            >
                              {travelPreview
                                ? "Change Travel Photo"
                                : "Upload Travel Photo"}
                            </span>
                            <p
                              className={`text-xs ${themeClasses.textMuted} mt-1`}
                            >
                              PNG, JPG, WEBP (Max 5MB)
                            </p>
                          </label>
                        </div>

                        {travelPreview && (
                          <div className="relative">
                            <div
                              className={`h-56 ${
                                theme === "light"
                                  ? "bg-gray-100"
                                  : "bg-gray-800/50"
                              } rounded-xl border ${
                                themeClasses.border
                              } overflow-hidden`}
                            >
                              <img
                                src={travelPreview}
                                alt="Travel Photo Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                clearFile(
                                  travelPreview,
                                  setTravelFile,
                                  setTravelPreview
                                )
                              }
                              className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                              disabled={isLoading}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Explore Photo Upload */}
                    <div>
                      <label
                        className={`block text-sm font-medium ${themeClasses.textPrimary} mb-3`}
                      >
                        Explore Section Photo
                      </label>
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(
                                e,
                                setExploreFile,
                                setExplorePreview
                              )
                            }
                            className="hidden"
                            id="explore-upload"
                            disabled={isLoading}
                          />
                          <label
                            htmlFor="explore-upload"
                            className={`block cursor-pointer p-5 border-2 border-dashed ${
                              themeClasses.border
                            } rounded-xl text-center transition-all duration-200 ${
                              isLoading
                                ? "opacity-50 cursor-not-allowed"
                                : `hover:border-blue-400 ${
                                    theme === "light"
                                      ? "hover:bg-blue-50"
                                      : "hover:bg-blue-900/20"
                                  }`
                            }`}
                          >
                            <div
                              className={`w-12 h-12 ${
                                theme === "light"
                                  ? "bg-purple-100"
                                  : "bg-purple-900/30"
                              } rounded-full flex items-center justify-center mx-auto mb-3`}
                            >
                              <Globe
                                className={`w-6 h-6 ${
                                  theme === "light"
                                    ? "text-purple-600"
                                    : "text-purple-400"
                                }`}
                              />
                            </div>
                            <span
                              className={`${themeClasses.textPrimary} font-medium`}
                            >
                              {explorePreview
                                ? "Change Explore Photo"
                                : "Upload Explore Photo"}
                            </span>
                            <p
                              className={`text-xs ${themeClasses.textMuted} mt-1`}
                            >
                              PNG, JPG, WEBP (Max 5MB)
                            </p>
                          </label>
                        </div>

                        {explorePreview && (
                          <div className="relative">
                            <div
                              className={`h-56 ${
                                theme === "light"
                                  ? "bg-gray-100"
                                  : "bg-gray-800/50"
                              } rounded-xl border ${
                                themeClasses.border
                              } overflow-hidden`}
                            >
                              <img
                                src={explorePreview}
                                alt="Explore Photo Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                clearFile(
                                  explorePreview,
                                  setExploreFile,
                                  setExplorePreview
                                )
                              }
                              className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                              disabled={isLoading}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div
                    className={`flex justify-end gap-3 mt-10 pt-6 border-t ${themeClasses.border}`}
                  >
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className={`${themeClasses.btnOutline} px-6 py-3 rounded-xl font-medium transition-all duration-200`}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`${themeClasses.btnPrimary} px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                          {imageUploading ? "Uploading Images..." : "Saving..."}
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          {modalType === "edit"
                            ? "Update UI Data"
                            : "Create UI Data"}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UiSettings;
