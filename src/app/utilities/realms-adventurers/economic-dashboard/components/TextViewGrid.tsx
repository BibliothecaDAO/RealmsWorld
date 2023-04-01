"use client";
import React from 'react';
import { TextViewData } from '../widgets/WidgetViewTypes';

const TextViewGrid: React.FC<TextViewData> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((item, index) => (
                <div
                    key={index}
                    className="bg-gray-700 p-4 rounded-lg text-center shadow-md transition-all duration-200 hover:shadow-xl hover:scale-105 flex flex-col"
                >
                    <div className="flex-1 flex items-center justify-center">
                        <h2 className="text-4xl font-bold mb-2 transition-all duration-200 hover:text-5xl hover:text-blue-500">
                            {item.value}
                        </h2>
                    </div>
                    <div className="w-full">
                        <p className="text-sm">{item.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TextViewGrid;