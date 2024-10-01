import React from "react";

import { ToggleGroup, ToggleGroupItem } from "@realms-world/ui";
import { Grid2X2, Grid3X3, List } from "lucide-react";

export const viewTypes = ["large-grid", "small-grid", "list"] as const;
export type ViewType = (typeof viewTypes)[number];

interface ViewTypeToggleGroupProps {
    viewType: ViewType;
    setViewType: (viewType: ViewType) => void;
}

export default function ViewTypeToggleGroup({
    className,
    viewType,
    setViewType,
}: ViewTypeToggleGroupProps & { className: string }) {
    const handleValueChange = (value: string) => {
        if (value && viewTypes.includes(value as ViewType)) {
            setViewType(value as ViewType);
        }
    };

    return (
        <ToggleGroup
            type="single"
            value={viewType}
            onValueChange={handleValueChange}
            className={className}
        >
            <ToggleGroupItem
                className="px-2.5 text-lg"
                value="large-grid"
                aria-label="Toggle large grid view"
            >
                <Grid2X2 />
            </ToggleGroupItem>
            <ToggleGroupItem
                className="px-2.5 text-lg"
                value="small-grid"
                aria-label="Toggle small grid view"
            >
                <Grid3X3 />
            </ToggleGroupItem>
            <ToggleGroupItem
                className="px-2.5 text-lg"
                value="list"
                aria-label="Toggle list view"
            >
                <List />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}