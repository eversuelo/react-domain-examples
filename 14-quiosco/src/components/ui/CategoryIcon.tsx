"use client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from 'next/navigation'
import { Category } from "@/generated/prisma/client"

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({ category }: CategoryIconProps) {
    const params = useParams<{category: string}>()
    const isActive = category.slug === params.category

    return (
        <Link
            href={`/order/${category.slug}`}
            className={`
                flex items-center gap-4 w-full p-4 
                transition-all duration-300
                border-l-4 
                ${
                    isActive 
                        ? 'bg-linear-to-r from-purple-600/30 to-pink-600/30 border-purple-500' 
                        : 'border-transparent hover:bg-slate-800/50 hover:border-purple-500/50'
                }
            `}
        >
            <div className="w-12 h-12 relative shrink-0">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`}
                    alt={`Icono ${category.name}`}
                    className={`
                        transition-all duration-300
                        ${isActive ? 'drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]' : 'opacity-70'}
                    `}
                />
            </div>

            <span className={`
                text-lg font-semibold transition-colors duration-300
                ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}
            `}>
                {category.name}
            </span>
        </Link>
    )
}
