import { Metadata } from "next";
import ClubDetailClient from "./ClubDetailClient";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export interface IImage { url: string; publicId: string; }
export interface ISocialLink { platform: string; url: string; }
export interface ILocationBlock { title: string; description?: string; images: IImage[]; }
export interface IBenefit { title: string; description?: string; icon?: string; }

export interface Club {
  _id: string;
  clubTitle: string;
  slug: string;
  shortDescription: string;
  clubDescription: string;
  clubLogo: IImage[];
  clubCategory: string;
  clubPresidentName: string;
  totalMembers: number;
  establishedDate?: string;
  contactInfo: { phone?: string; email?: string; address?: string };
  socialLinks: ISocialLink[];
  locationImages: ILocationBlock[];
  benefits: IBenefit[];
  status: string;
}

async function getClub(slug: string): Promise<Club | null> {
  try {
    const res = await fetch(`${backendUrl}/api/v1/club/details/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data?.data ?? json.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const club = await getClub(slug);
  if (!club) return { title: "Club Not Found" };
  const desc = club.shortDescription || club.clubDescription?.replace(/<[^>]+>/g, "").slice(0, 160) || "";
  return {
    title: `${club.clubTitle} | Vacation Club`,
    description: desc,
    openGraph: {
      title: club.clubTitle,
      description: desc,
      images: club.clubLogo?.[0] ? [{ url: club.clubLogo[0].url }] : [],
    },
  };
}

export default async function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const club = await getClub(slug);
  return <ClubDetailClient club={club} />;
}
