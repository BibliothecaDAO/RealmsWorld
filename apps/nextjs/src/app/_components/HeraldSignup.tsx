'use client'

import { Button, Input } from "@realms-world/ui";
import { useState } from "react";

export const HeraldSignup = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Implement newsletter signup logic
        console.log("Signing up with name:", name, "and email:", email);
        // Reset name and email fields after submission
        setName("");
        setEmail("");
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex items-center w-full gap-x-4">
            <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="mb-4 py-6 backdrop-blur w-2/5"
            />
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="mb-4 py-6 w-2/5 col-span-2"
            />
            <Button type="submit" className="bg-[#74C9FE] border-[#2C428E] h-18 px-8 border-2 text-black mb-4">
                Subscribe
            </Button>
        </form>
    )
}
