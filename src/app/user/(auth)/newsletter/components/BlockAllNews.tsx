'use client'

import { BlockNews } from "./BlockNews";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "@/utils/actions/GetAllNews";
import { SkeletonCarrousel } from "./SkeletonCarrousel";
import { ContentNews } from "./ContentNews";
import { SkeletonNewsContent } from "./SkeletonNewsContent";

export function BlockAllNews() {
    const { data, isLoading } = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const data = await getAllNews()

            return data
        }
    })

    return (
        <>
            {
                isLoading ?
                    <SkeletonCarrousel /> :
                    <BlockNews news={data} />
            }

            {
                isLoading ?
                    <SkeletonNewsContent /> :
                    <ContentNews news={data} />
            }

        </>
    )
}