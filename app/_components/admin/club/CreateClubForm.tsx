"use client";

import React, { useRef } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { MdAdd, MdClose, MdCloudUpload, MdDelete } from "react-icons/md";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { useCreateClubMutation } from "@/redux/features/club/clubApi";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/BlogEditor"), {
  ssr: false,
  loading: () => <div className="h-40 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />,
});

interface ImageItem {
  url: string;
  publicId: string;
}

interface ClubForm {
  clubTitle: string;
  slug: string;
  shortDescription: string;
  clubDescription: string;
  clubCategory: string;
  clubPresidentName: string;
  totalMembers: number;
  establishedDate?: string;
  contactInfo: { phone?: string; email?: string; address?: string };
  socialLinks: { platform: string; url: string }[];
  clubLogo: ImageItem[];
  locationImages: { title: string; description?: string; images: ImageItem[] }[];
  benefits: { title: string; description?: string; icon?: string }[];
  membershipTiers: { title: string; price: number; durationInMonths: number; features: string[]; isActive: boolean }[];
}

function generateSlug(title: string) {
  return title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

const inputCls = "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm";

export default function CreateClubForm() {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const { uploadToCloudinary } = useCloudinaryUpload();
  const [createClub] = useCreateClubMutation();

  const { register, control, handleSubmit, setValue, watch, reset } = useForm<ClubForm>({
    defaultValues: {
      clubTitle: "",
      slug: "",
      shortDescription: "",
      clubDescription: "",
      clubCategory: "",
      clubPresidentName: "",
      totalMembers: 0,
      establishedDate: "",
      contactInfo: { phone: "", email: "", address: "" },
      socialLinks: [{ platform: "", url: "" }],
      clubLogo: [],
      locationImages: [],
      benefits: [{ title: "", description: "", icon: "" }],
      membershipTiers: [{ title: "Basic", price: 0, durationInMonths: 1, features: [""], isActive: true }],
    },
  });

  const socialLinksField = useFieldArray({ control, name: "socialLinks" });
  const locationsField = useFieldArray({ control, name: "locationImages" });
  const benefitsField = useFieldArray({ control, name: "benefits" });
  const tiersField = useFieldArray({ control, name: "membershipTiers" });
  const clubLogo = watch("clubLogo");
  const clubTitle = watch("clubTitle");

  const handleTitleBlur = () => {
    if (!watch("slug") && clubTitle) setValue("slug", generateSlug(clubTitle));
  };

  const uploadLogo = async (files: FileList | null) => {
    if (!files) return;
    const tid = toast.loading("Uploading...");
    try {
      const uploads = await Promise.all(Array.from(files).map(uploadToCloudinary));
      setValue("clubLogo", [...clubLogo, ...uploads]);
      toast.success("Uploaded!", { id: tid });
    } catch { toast.error("Failed", { id: tid }); }
  };

  const uploadLocationImage = async (file: File, index: number) => {
    const res = await uploadToCloudinary(file);
    const curr = watch(`locationImages.${index}.images`) || [];
    setValue(`locationImages.${index}.images`, [...curr, res]);
  };

  const onSubmit = async (data: ClubForm) => {
    if (data.clubLogo.length === 0) { toast.error("Club logo is required"); return; }
    if (!data.slug) data.slug = generateSlug(data.clubTitle);
    try {
      const res = await createClub(data).unwrap();
      toast.success(res.message || "Club created");
      reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Validation error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create Club</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* BASIC INFO */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">Basic Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Club Title *</label>
              <input {...register("clubTitle")} onBlur={handleTitleBlur} className={inputCls} placeholder="Club Title" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">URL Slug * <span className="text-gray-400">(auto-generated)</span></label>
              <input {...register("slug")} className={inputCls} placeholder="my-club-name" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Short Description <span className="text-gray-400">(shown in listings)</span></label>
            <textarea {...register("shortDescription")} rows={2} maxLength={200} className={inputCls} placeholder="Brief description for listings..." />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Full Description * <span className="text-gray-400">(rich text)</span></label>
            <Controller
              name="clubDescription"
              control={control}
              render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} placeholder="Detailed club description..." minHeight="200px" />
              )}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Category *</label>
              <select {...register("clubCategory")} className={inputCls}>
                <option value="">Select category</option>
                <option>Sports</option><option>Beach</option><option>Golf</option>
                <option>Luxury</option><option>Mountain</option><option>City</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">President Name *</label>
              <input {...register("clubPresidentName")} className={inputCls} placeholder="President Name" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Total Members</label>
              <input type="number" {...register("totalMembers")} className={inputCls} placeholder="0" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Established Date</label>
              <input type="date" {...register("establishedDate")} className={inputCls} />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">Contact Info</h2>
          <input {...register("contactInfo.phone")} className={inputCls} placeholder="Phone" />
          <input {...register("contactInfo.email")} className={inputCls} placeholder="Email" />
          <input {...register("contactInfo.address")} className={inputCls} placeholder="Address" />
        </section>

        {/* SOCIAL LINKS */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">Social Links</h2>
            <button type="button" onClick={() => socialLinksField.append({ platform: "", url: "" })} className="text-blue-600 text-sm hover:underline">+ Add</button>
          </div>
          {socialLinksField.fields.map((_, i) => (
            <div key={i} className="flex gap-3">
              <select {...register(`socialLinks.${i}.platform`)} className={inputCls + " w-36"}>
                <option value="">Platform</option>
                <option>Facebook</option><option>Instagram</option><option>Twitter</option><option>Website</option><option>YouTube</option>
              </select>
              <input {...register(`socialLinks.${i}.url`)} className={inputCls + " flex-1"} placeholder="URL" />
              <button type="button" onClick={() => socialLinksField.remove(i)} className="text-red-500"><MdClose /></button>
            </div>
          ))}
        </section>

        {/* CLUB LOGO */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">Club Logo *</h2>
          <div onClick={() => logoInputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-all">
            <MdCloudUpload size={40} className="mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Click to upload</p>
            <input ref={logoInputRef} hidden type="file" multiple accept="image/*" onChange={(e) => uploadLogo(e.target.files)} />
          </div>
          <div className="grid grid-cols-5 gap-3">
            {clubLogo.map((img, i) => (
              <div key={i} className="relative group">
                <img src={img.url} className="h-20 w-full object-cover rounded-lg" alt="" />
                <button type="button" onClick={() => setValue("clubLogo", clubLogo.filter((_, idx) => idx !== i))} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <MdClose size={12} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* LOCATIONS */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">Location Images</h2>
            <button type="button" onClick={() => locationsField.append({ title: "", description: "", images: [] })} className="text-blue-600 text-sm hover:underline">+ Add Location</button>
          </div>
          {locationsField.fields.map((_, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Location {i + 1}</span>
                <button type="button" onClick={() => locationsField.remove(i)} className="text-red-500 text-sm"><MdDelete /></button>
              </div>
              <input {...register(`locationImages.${i}.title`)} className={inputCls} placeholder="Location Title" />
              <textarea {...register(`locationImages.${i}.description`)} className={inputCls} rows={2} placeholder="Description" />
              <input type="file" accept="image/*" onChange={(e) => e.target.files && uploadLocationImage(e.target.files[0], i)} className="text-sm" />
              <div className="flex gap-2 flex-wrap">
                {watch(`locationImages.${i}.images`)?.map((img, j) => <img key={j} src={img.url} className="w-14 h-14 object-cover rounded-lg" alt="" />)}
              </div>
            </div>
          ))}
        </section>

        {/* BENEFITS */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">Benefits</h2>
            <button type="button" onClick={() => benefitsField.append({ title: "", description: "", icon: "" })} className="text-blue-600 text-sm hover:underline">+ Add</button>
          </div>
          {benefitsField.fields.map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-3">
              <input {...register(`benefits.${i}.title`)} className={inputCls} placeholder="Title" />
              <input {...register(`benefits.${i}.description`)} className={inputCls} placeholder="Description" />
              <input {...register(`benefits.${i}.icon`)} className={inputCls} placeholder="Icon" />
              <button type="button" onClick={() => benefitsField.remove(i)} className="text-red-500"><MdDelete /></button>
            </div>
          ))}
        </section>

        {/* MEMBERSHIP TIERS */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">Membership Tiers</h2>
            <button type="button" onClick={() => tiersField.append({ title: "", price: 0, durationInMonths: 1, features: [""], isActive: true })} className="text-blue-600 text-sm hover:underline">+ Add Tier</button>
          </div>
          {tiersField.fields.map((_, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-xs text-gray-400 uppercase">Tier {i + 1}</span>
                {tiersField.fields.length > 1 && <button type="button" onClick={() => tiersField.remove(i)} className="text-red-500"><MdDelete size={16} /></button>}
              </div>
              <input {...register(`membershipTiers.${i}.title`)} className={inputCls} placeholder="Tier Name" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" {...register(`membershipTiers.${i}.price`)} className={inputCls} placeholder="Price ($)" />
                <input type="number" {...register(`membershipTiers.${i}.durationInMonths`)} className={inputCls} placeholder="Duration (months)" />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <input type="checkbox" {...register(`membershipTiers.${i}.isActive`)} className="rounded" /> Active
              </label>
            </div>
          ))}
        </section>

        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2">
          <MdAdd size={20} /> Create Club
        </button>
      </form>
    </div>
  );
}
