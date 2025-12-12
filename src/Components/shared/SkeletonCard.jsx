import React, { memo } from "react";

const SkeletonCard = memo(({ count = 1 }) => {
    if (count === 1) {
        return (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 my-2 card card-body">
                <div className="text-center position-relative mb-2">
                    <div className="captionLayer overflow-hidden mb-2 skeleton-pulse"></div>
                    <b>&nbsp;</b>
                </div>
            </div>
        );
    }

    return (
        <>
            {[...Array(count)].map((_, i) => (
                <div
                    key={`skeleton-${i}`}
                    className="col-xl-2 col-lg-3 col-md-4 col-sm-6 my-2 card card-body"
                >
                    <div className="text-center position-relative mb-2">
                        <div className="captionLayer overflow-hidden mb-2 skeleton-pulse"></div>
                        <b>&nbsp;</b>
                    </div>
                </div>
            ))}
        </>
    );
});

SkeletonCard.displayName = "SkeletonCard";

export default SkeletonCard;
