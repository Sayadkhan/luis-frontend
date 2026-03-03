"use client";

import React, { useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  Plus,
  Trash2,
  Building2,
  Mail,
  Image as ImageIcon,
  Award,
  Crown,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Loader2,
  MapPin,
  Video,
  Link as LinkIcon,
  Globe,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { useCreateClubMutation } from "@/redux/features/club/clubApi";

interface ImageItem {
  url: string;
  publicId: string;
}

interface LocationVideo {
  type: "upload" | "embed";
  url: string;
  publicId?: string;
}

interface ClubForm {
  clubTitle: string;
  clubDescription: string;
  clubCategory: string;
  clubPresidentName: string;
  totalMembers: number;
  establishedDate?: string;
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };
  socialLinks: {
    platform: string;
    url: string;
  }[];
  clubLogo: ImageItem[];
  locationImages: {
    title: string;
    locationName?: string;
    description?: string;
    images: ImageItem[];
    video?: LocationVideo | null;
  }[];
  benefits: {
    title: string;
    description?: string;
    icon?: string;
  }[];
  membershipTiers: {
    title: string;
    price: number;
    durationInMonths: number;
    features: string[];
    isActive: boolean;
  }[];
}

const STEPS = [
  {
    id: "basic",
    title: "Basic Info",
    description: "Name, category and description",
    icon: Building2,
  },
  {
    id: "contact",
    title: "Contact",
    description: "How members can reach you",
    icon: Mail,
  },
  {
    id: "visuals",
    title: "Visuals",
    description: "Logo and location photos",
    icon: ImageIcon,
  },
  {
    id: "perks",
    title: "Benefits",
    description: "What members get",
    icon: Award,
  },
  {
    id: "tiers",
    title: "Membership",
    description: "Pricing and plans",
    icon: Crown,
  },
];

export function CreateClubModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingLocation, setUploadingLocation] = useState<number | null>(
    null,
  );
  const [uploadingVideo, setUploadingVideo] = useState<number | null>(null);
  // per-location video mode: "upload" | "embed"
  const [videoMode, setVideoMode] = useState<
    Record<number, "upload" | "embed">
  >({});

  const logoRef = useRef<HTMLInputElement>(null);
  const { uploadToCloudinary } = useCloudinaryUpload();
  const [createClub] = useCreateClubMutation();

  const { register, control, handleSubmit, setValue, watch, reset, trigger } =
    useForm<ClubForm>({
      defaultValues: {
        clubTitle: "",
        clubDescription: "",
        clubCategory: "",
        clubPresidentName: "",
        totalMembers: 0,
        establishedDate: "",
        contactInfo: {
          phone: "",
          email: "",
          address: "",
        },
        socialLinks: [{ platform: "", url: "" }],
        clubLogo: [],
        locationImages: [],
        benefits: [{ title: "", description: "", icon: "" }],
        membershipTiers: [
          {
            title: "Basic",
            price: 0,
            durationInMonths: 1,
            features: [],
            isActive: true,
          },
        ],
      },
    });

  const socialLinks = useFieldArray({ control, name: "socialLinks" });
  const locations = useFieldArray<ClubForm, "locationImages">({
    control,
    name: "locationImages",
  });

  console.log(locations);
  const benefits = useFieldArray({ control, name: "benefits" });
  const tiers = useFieldArray({ control, name: "membershipTiers" });

  const clubLogo = watch("clubLogo");
  const locationValues = watch("locationImages") ?? "";

  const nextStep = async () => {
    const fieldsToValidate: Record<number, string[]> = {
      0: ["clubTitle", "clubDescription", "clubCategory"],
      1: ["contactInfo.email", "contactInfo.phone"],
    };

    const isStepValid = await trigger(
      (fieldsToValidate[currentStep] as any) || [],
    );
    if (isStepValid && currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleLogoUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadingLogo(true);
    try {
      const uploads = await Promise.all(
        Array.from(files).map(uploadToCloudinary),
      );
      setValue("clubLogo", [...clubLogo, ...uploads]);
      toast.success("Logo uploaded successfully");
    } catch (err) {
      toast.error("Failed to upload logo");
    } finally {
      setUploadingLogo(false);
    }
  };

  const removeLogoImage = (index: number) => {
    setValue(
      "clubLogo",
      clubLogo.filter((_, i) => i !== index),
    );
  };

  const handleLocationImageUpload = async (
    files: FileList | null,
    index: number,
  ) => {
    if (!files || files.length === 0) return;
    setUploadingLocation(index);
    try {
      const uploads = await Promise.all(
        Array.from(files).map(uploadToCloudinary),
      );
      const updated = [...watch("locationImages")];
      updated[index].images = [...(updated[index].images || []), ...uploads];
      setValue("locationImages", updated);
      toast.success("Images uploaded successfully");
    } catch (err) {
      toast.error("Failed to upload images");
    } finally {
      setUploadingLocation(null);
    }
  };

  const removeLocationImage = (locIndex: number, imgIndex: number) => {
    const updated = [...watch("locationImages")];
    updated[locIndex].images = updated[locIndex].images.filter(
      (_, i) => i !== imgIndex,
    );
    setValue("locationImages", updated);
  };

  const handleVideoUpload = async (files: FileList | null, index: number) => {
    if (!files || files.length === 0) return;
    setUploadingVideo(index);
    try {
      const uploaded = await uploadToCloudinary(files[0]);
      const updated = [...watch("locationImages")];
      updated[index].video = {
        type: "upload",
        url: uploaded.url,
        publicId: uploaded.publicId,
      };
      setValue("locationImages", updated);
      toast.success("Video uploaded");
    } catch {
      toast.error("Failed to upload video");
    } finally {
      setUploadingVideo(null);
    }
  };

  const setEmbedVideo = (index: number, url: string) => {
    const updated = [...watch("locationImages")];
    updated[index].video = url.trim()
      ? { type: "embed", url: url.trim() }
      : null;
    setValue("locationImages", updated);
  };

  const removeVideo = (index: number) => {
    const updated = [...watch("locationImages")];
    updated[index].video = null;
    setValue("locationImages", updated);
  };

  const onSubmit = async (data: ClubForm) => {
    if (data.clubLogo.length === 0) {
      toast.error("Club logo is required");
      setCurrentStep(2);
      return;
    }

    // Strip out incomplete social links and benefits before submitting
    data.socialLinks = data.socialLinks.filter(
      (s) => s.platform.trim() && s.url.trim(),
    );
    data.benefits = data.benefits.filter((b) => b.title.trim());

    setIsSubmitting(true);
    try {
      const res = await createClub(data).unwrap();
      console.log("Create Club Response:", res);
      toast.success(res.message || "Club created successfully");
      reset();
      setCurrentStep(0);
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create club");
      console.error("Create Club Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      setCurrentStep(0);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={false}
        className="!max-w-5xl w-[95vw] p-0 overflow-hidden gap-0 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl"
      >
        <DialogTitle className="sr-only">Create Club</DialogTitle>
        <div className="flex h-[80vh] max-h-[700px] min-h-[500px] w-full">
          {/* Sidebar Stepper */}
          <div className="w-[280px] shrink-0 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 flex-col justify-between hidden md:flex">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-lg leading-tight text-gray-900 dark:text-white">
                    Create Club
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Club Management Portal
                  </p>
                </div>
              </div>

              <nav className="space-y-6">
                {STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = currentStep === idx;
                  const isCompleted = currentStep > idx;

                  return (
                    <div
                      key={step.id}
                      className={cn(
                        "relative flex gap-4 transition-all duration-300",
                        !isActive && !isCompleted && "opacity-50",
                      )}
                    >
                      {idx !== STEPS.length - 1 && (
                        <div
                          className={cn(
                            "absolute left-[17px] top-10 w-[2px] h-8 bg-gray-200 dark:bg-gray-600 transition-colors duration-500",
                            isCompleted && "bg-blue-600",
                          )}
                        />
                      )}

                      <div
                        className={cn(
                          "w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300",
                          isActive
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 scale-110"
                            : isCompleted
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500",
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span
                          className={cn(
                            "text-sm font-semibold leading-tight transition-colors",
                            isActive
                              ? "text-blue-600"
                              : "text-gray-700 dark:text-gray-300",
                          )}
                        >
                          {step.title}
                        </span>
                        <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                          {step.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Complete all steps to launch your club. You can always edit
                these details later in the dashboard.
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-900">
            <div className="shrink-0 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="md:hidden">
                <h2 className="font-bold text-gray-900 dark:text-white">
                  {STEPS[currentStep].title}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Step {currentStep + 1} of {STEPS.length}
                </p>
              </div>
              <div className="hidden md:block">
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  {STEPS[currentStep].title}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {STEPS[currentStep].description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="rounded-full h-8 w-8 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <form
                    id="club-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {currentStep === 0 && (
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField label="Club Name" required>
                            <Input
                              {...register("clubTitle", { required: true })}
                              placeholder="e.g. Diamond Elite Club"
                              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                          </FormField>
                          <FormField label="Category" required>
                            <Input
                              {...register("clubCategory", { required: true })}
                              placeholder="e.g. Luxury, Travel"
                              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                          </FormField>
                        </div>

                        <FormField label="Description" required>
                          <Textarea
                            {...register("clubDescription", { required: true })}
                            placeholder="Describe what makes this club special..."
                            className="min-h-[100px] resize-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                          />
                        </FormField>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                          <FormField label="President Name">
                            <Input
                              {...register("clubPresidentName")}
                              placeholder="Full name"
                              className="h-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                          </FormField>

                          <FormField label="Members">
                            <Input
                              type="number"
                              {...register("totalMembers", {
                                valueAsNumber: true,
                              })}
                              placeholder="0"
                              className="h-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                          </FormField>

                          <FormField label="Est. Date">
                            <Input
                              type="date"
                              {...register("establishedDate")}
                              className="h-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </FormField>
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField label="Phone Number">
                            <Input
                              {...register("contactInfo.phone")}
                              placeholder="+1 (555) 000-0000"
                              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                          </FormField>

                          <FormField label="Official Email">
                            <Input
                              type="email"
                              {...register("contactInfo.email")}
                              placeholder="contact@club.com"
                              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                          </FormField>
                        </div>

                        <FormField label="Club Address">
                          <Input
                            {...register("contactInfo.address")}
                            placeholder="Street, City, Country"
                            className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                          />
                        </FormField>

                        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Social Presence
                            </Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 rounded-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                              onClick={() =>
                                socialLinks.append({ platform: "", url: "" })
                              }
                            >
                              <Plus className="w-3.5 h-3.5 mr-1.5" />
                              Add Platform
                            </Button>
                          </div>

                          <div className="space-y-3">
                            {socialLinks.fields.map((field, i) => (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={field.id}
                                className="flex gap-2"
                              >
                                <Input
                                  {...register(`socialLinks.${i}.platform`)}
                                  placeholder="Platform"
                                  className="w-[120px] h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                                <Input
                                  {...register(`socialLinks.${i}.url`)}
                                  placeholder="URL (e.g. instagram.com/club)"
                                  className="flex-1 h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="shrink-0 h-10 w-10 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                                  onClick={() => socialLinks.remove(i)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        {/* ── Club Logo ── */}
                        <div>
                          <Label className="text-sm font-semibold mb-3 block text-gray-700 dark:text-gray-300">
                            Official Club Logo{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <div
                            onClick={() =>
                              !uploadingLogo && logoRef.current?.click()
                            }
                            className={cn(
                              "relative group border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300",
                              uploadingLogo
                                ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 cursor-wait"
                                : "border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20",
                            )}
                          >
                            {uploadingLogo ? (
                              <div className="flex flex-col items-center gap-2 py-2">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                                <p className="text-sm font-medium animate-pulse text-gray-600 dark:text-gray-400">
                                  Processing...
                                </p>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center py-2">
                                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                  <Upload className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  Upload Logo
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  JPG, PNG (Max 5MB)
                                </p>
                              </div>
                            )}
                            <input
                              ref={logoRef}
                              hidden
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleLogoUpload(e.target.files)}
                            />
                          </div>

                          {clubLogo.length > 0 && (
                            <div className="grid grid-cols-4 gap-3 mt-4">
                              {clubLogo.map((img, i) => (
                                <div
                                  key={i}
                                  className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm"
                                >
                                  <img
                                    src={img.url}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      className="h-7 w-7 rounded-full"
                                      onClick={() => removeLogoImage(i)}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* ── Location Gallery ── */}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Club Locations
                              </Label>
                              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                                Each location has its own name, gallery and
                                optional video.
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 rounded-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                              onClick={() =>
                                locations.append({
                                  title: "",
                                  locationName: "",
                                  description: "",
                                  images: [],
                                  video: null,
                                })
                              }
                            >
                              <Plus className="w-3.5 h-3.5 mr-1.5" />
                              Add Location
                            </Button>
                          </div>

                          {locations.fields.length === 0 && (
                            <div className="mt-4 flex flex-col items-center justify-center py-8 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 gap-2">
                              <MapPin className="w-8 h-8" />
                              <p className="text-sm font-medium">
                                No locations yet
                              </p>
                              <p className="text-xs">
                                Click "Add Location" to get started.
                              </p>
                            </div>
                          )}

                          <div className="space-y-5 mt-4">
                            {locations.fields.map((field, i) => {
                              const locVideo = locationValues?.[i]?.video;
                              console.log("Location", i, "Video:", locVideo);
                              const mode = videoMode[i] ?? "upload";
                              return (
                                <motion.div
                                  key={field.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-hidden"
                                >
                                  {/* Location header bar */}
                                  <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                                    <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                                      <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                      Location {i + 1}
                                    </span>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className="ml-auto h-7 w-7 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                                      onClick={() => locations.remove(i)}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                  </div>

                                  <div className="p-4 space-y-4">
                                    {/* Name fields */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      <div className="space-y-1.5">
                                        <Label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                          Branch / Internal Name{" "}
                                          <span className="text-red-500">
                                            *
                                          </span>
                                        </Label>
                                        <Input
                                          {...register(
                                            `locationImages.${i}.title`,
                                          )}
                                          placeholder="e.g. Dhaka Branch"
                                          className="h-9 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                        />
                                      </div>
                                      <div className="space-y-1.5">
                                        <Label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                          Display Name{" "}
                                          <span className="text-[10px] font-normal normal-case">
                                            (optional — falls back to club name)
                                          </span>
                                        </Label>
                                        <Input
                                          {...register(
                                            `locationImages.${i}.locationName`,
                                          )}
                                          placeholder={`e.g. ${watch("clubTitle") || "Club Name"} – Dhaka`}
                                          className="h-9 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                        />
                                      </div>
                                    </div>

                                    <Input
                                      {...register(
                                        `locationImages.${i}.description`,
                                      )}
                                      placeholder="Brief location highlight (shown in hero subtitle)..."
                                      className="h-9 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                    />

                                    {/* Image upload */}
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <Label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                                          <ImageIcon className="w-3.5 h-3.5" />{" "}
                                          Image Gallery
                                        </Label>
                                        <Button
                                          type="button"
                                          variant="secondary"
                                          size="sm"
                                          className="rounded-full h-7 px-3 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                                          disabled={uploadingLocation === i}
                                          onClick={() =>
                                            document
                                              .getElementById(`loc-upload-${i}`)
                                              ?.click()
                                          }
                                        >
                                          {uploadingLocation === i ? (
                                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                          ) : (
                                            <Upload className="w-3 h-3 mr-1" />
                                          )}
                                          Upload Images
                                        </Button>
                                        <input
                                          id={`loc-upload-${i}`}
                                          hidden
                                          type="file"
                                          accept="image/*"
                                          multiple
                                          onChange={(e) =>
                                            handleLocationImageUpload(
                                              e.target.files,
                                              i,
                                            )
                                          }
                                        />
                                      </div>

                                      {locationValues?.[i]?.images?.length >
                                      0 ? (
                                        <div className="grid grid-cols-4 gap-2">
                                          {locationValues[i].images.map(
                                            (img, idx) => (
                                              <div
                                                key={idx}
                                                className="relative group/img aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm"
                                              >
                                                <img
                                                  src={img.url}
                                                  alt=""
                                                  className="w-full h-full object-cover"
                                                />
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    removeLocationImage(i, idx)
                                                  }
                                                  className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-red-500"
                                                >
                                                  <X className="w-2.5 h-2.5" />
                                                </button>
                                              </div>
                                            ),
                                          )}
                                        </div>
                                      ) : (
                                        <div className="flex items-center justify-center h-16 rounded-lg border border-dashed border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 text-xs">
                                          No images yet — click Upload Images
                                        </div>
                                      )}
                                    </div>

                                    {/* Video section */}
                                    <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                      <div className="flex items-center justify-between">
                                        <Label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                                          <Video className="w-3.5 h-3.5" />{" "}
                                          Video (optional)
                                        </Label>
                                        {/* Toggle upload vs embed */}
                                        <div className="flex gap-1 bg-gray-200 dark:bg-gray-700 rounded-full p-0.5">
                                          {(["upload", "embed"] as const).map(
                                            (m) => (
                                              <button
                                                key={m}
                                                type="button"
                                                onClick={() =>
                                                  setVideoMode((prev) => ({
                                                    ...prev,
                                                    [i]: m,
                                                  }))
                                                }
                                                className={cn(
                                                  "flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold transition-all",
                                                  mode === m
                                                    ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow"
                                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
                                                )}
                                              >
                                                {m === "upload" ? (
                                                  <Upload className="w-3 h-3" />
                                                ) : (
                                                  <Globe className="w-3 h-3" />
                                                )}
                                                {m === "upload"
                                                  ? "Upload"
                                                  : "Embed"}
                                              </button>
                                            ),
                                          )}
                                        </div>
                                      </div>

                                      {locVideo ? (
                                        /* Video preview */
                                        <div className="relative rounded-lg overflow-hidden bg-black aspect-video group/vid">
                                          {locVideo.type === "upload" ? (
                                            <video
                                              src={locVideo.url}
                                              controls
                                              className="w-full h-full object-contain"
                                            />
                                          ) : (
                                            <iframe
                                              src={locVideo.url
                                                .replace("watch?v=", "embed/")
                                                .replace(
                                                  "youtu.be/",
                                                  "www.youtube.com/embed/",
                                                )}
                                              className="w-full h-full"
                                              allow="autoplay; encrypted-media"
                                              allowFullScreen
                                            />
                                          )}
                                          <button
                                            type="button"
                                            onClick={() => removeVideo(i)}
                                            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover/vid:opacity-100 transition-opacity hover:bg-red-600"
                                          >
                                            <X className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      ) : mode === "upload" ? (
                                        <div
                                          onClick={() =>
                                            !uploadingVideo &&
                                            document
                                              .getElementById(`vid-upload-${i}`)
                                              ?.click()
                                          }
                                          className={cn(
                                            "flex items-center justify-center h-16 rounded-lg border-2 border-dashed cursor-pointer transition-all",
                                            uploadingVideo === i
                                              ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20 cursor-wait"
                                              : "border-gray-200 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
                                          )}
                                        >
                                          {uploadingVideo === i ? (
                                            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                                          ) : (
                                            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                                              <Upload className="w-4 h-4" />{" "}
                                              Click to upload a video file
                                            </span>
                                          )}
                                          <input
                                            id={`vid-upload-${i}`}
                                            hidden
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) =>
                                              handleVideoUpload(
                                                e.target.files,
                                                i,
                                              )
                                            }
                                          />
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-2">
                                          <LinkIcon className="w-4 h-4 shrink-0 text-gray-400 dark:text-gray-500" />
                                          <Input
                                            placeholder="Paste YouTube or Vimeo URL..."
                                            className="h-9 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                            onBlur={(e) =>
                                              setEmbedVideo(i, e.target.value)
                                            }
                                            defaultValue={locVideo ?? ""}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              Member Benefits
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              List the exclusive perks of your club.
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              benefits.append({
                                title: "",
                                description: "",
                                icon: "",
                              })
                            }
                          >
                            <Plus className="w-3.5 h-3.5 mr-1.5" />
                            Add Perk
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {benefits.fields.map((field, i) => (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              key={field.id}
                              className="group flex gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                            >
                              <div className="w-10">
                                <Label className="text-[9px] uppercase font-bold text-gray-500 dark:text-gray-400 mb-1 block text-center">
                                  Icon
                                </Label>
                                <Input
                                  {...register(`benefits.${i}.icon`)}
                                  placeholder="✨"
                                  className="h-9 text-center text-base p-0 bg-gray-100 dark:bg-gray-700 border-none rounded-lg text-gray-900 dark:text-white"
                                />
                              </div>
                              <div className="flex-1 space-y-2">
                                <Input
                                  {...register(`benefits.${i}.title`)}
                                  placeholder="Benefit Title"
                                  className="font-medium border-none shadow-none focus-visible:ring-1 p-0 h-7 text-sm bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                                <Input
                                  {...register(`benefits.${i}.description`)}
                                  placeholder="Short details..."
                                  className="text-xs border-none shadow-none focus-visible:ring-1 p-0 h-5 bg-transparent text-gray-600 dark:text-gray-400 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => benefits.remove(i)}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              Membership Tiers
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Define your subscription plans.
                            </p>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            className="h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() =>
                              tiers.append({
                                title: "",
                                price: 0,
                                durationInMonths: 1,
                                features: [],
                                isActive: true,
                              })
                            }
                          >
                            <Plus className="w-3.5 h-3.5 mr-1.5" />
                            Add Tier
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {tiers.fields.map((field, i) => (
                            <div
                              key={field.id}
                              className="relative p-5 rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 space-y-4 overflow-hidden"
                            >
                              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 dark:bg-blue-800/30 rounded-full -mr-10 -mt-10 pointer-events-none" />

                              <div className="flex items-start justify-between relative z-10">
                                <div className="flex-1 max-w-sm">
                                  <Label className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase mb-1.5 block">
                                    Tier Title
                                  </Label>
                                  <Input
                                    {...register(`membershipTiers.${i}.title`)}
                                    placeholder="Tier name (e.g. Gold Tier)"
                                    className="text-lg font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 shadow-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 h-7 w-7"
                                  onClick={() => tiers.remove(i)}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div>
                                  <Label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">
                                    Price ($)
                                  </Label>
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-medium text-sm">
                                      $
                                    </span>
                                    <Input
                                      type="number"
                                      {...register(
                                        `membershipTiers.${i}.price`,
                                        { valueAsNumber: true },
                                      )}
                                      className="pl-7 h-10 rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                      placeholder="0"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">
                                    Duration (Months)
                                  </Label>
                                  <Input
                                    type="number"
                                    {...register(
                                      `membershipTiers.${i}.durationInMonths`,
                                      { valueAsNumber: true },
                                    )}
                                    className="h-10 rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                    placeholder="1"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </form>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                className="h-10 px-4 rounded-lg hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1.5" />
                Previous
              </Button>

              <div className="flex gap-2">
                {currentStep < STEPS.length - 1 ? (
                  <Button
                    type="button"
                    className="h-10 px-6 rounded-lg shadow-lg shadow-blue-600/20 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={nextStep}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1.5" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    form="club-form"
                    disabled={isSubmitting}
                    className="h-10 px-8 rounded-lg shadow-lg shadow-blue-600/20 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Launch Club"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FormField({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2.5", className)}>
      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
}
