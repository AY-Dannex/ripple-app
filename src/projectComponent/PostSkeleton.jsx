import { Skeleton } from "@/components/ui/skeleton";

function PostSkeleton (){
    return(
        <div className="flex flex-col gap-3 px-5 mb-5">
            {/* Header */}
            <div className="flex items-center gap-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-3 w-[120px]" />
                    <Skeleton className="h-3 w-[80px]" />
                </div>
            </div>
            {/* Content */}
            <Skeleton className="h-4 w-full ml-12" />
            <Skeleton className="h-4 w-3/4 ml-12" />
            {/* Image */}
            <Skeleton className="h-40 w-full rounded-xl ml-12" />
        </div>
    );
}
export default PostSkeleton