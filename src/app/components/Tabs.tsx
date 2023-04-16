"use client"

import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "./ui/button";

interface Tabs {
    name: string;
    content: any;
}

interface Props {
    tabs: Tabs[];
    align?: "center" | "left" | "right";
}

const alignmentClasses = {
    left: "justify-start",
    right: "justify-end",
    center: "justify-center",
};

export const Tabs = ({ tabs, align = "center" }: Props) => {
    const alignmentClass = alignmentClasses[align];

    return <Tab.Group>
        <Tab.List
            className={
                `w-full flex text-xl py-3 border-b border-white/20 mb-4 space-x-4 ${alignmentClass}`
            }
        >
            {tabs.map((tab, index) => (
                <Tab key={index} as={Fragment}>
                    {({ selected }) => (
                        <Button
                            variant={selected ? "default" : "ghost"}

                        >
                            {tab.name}
                        </Button>
                    )}
                </Tab>
            ))}
        </Tab.List>
        <Tab.Panels>
            {tabs.map((tab, index) => (
                <Tab.Panel key={index}>{tab.content}</Tab.Panel>
            ))}
        </Tab.Panels>
    </Tab.Group>
}