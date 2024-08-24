'use client'

import { Button } from "@realms-world/ui";
import Link from "next/link";
//import { useState } from "react";
import Stamp from "@/icons/stamp.svg";

export const HeraldSignup = () => {
    /*const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        window.open(`https://thelootherald.substack.com/api/v1/free?email=${encodeURIComponent(email)}`, '_blank');
        setEmail("");
    };*/

    return (
        <Link href={"https://thelootherald.substack.com/"} target="_blank" className="mx-auto">
            <Button
                /*className="
                  mt-8 bg-[#74C9FE] border-[#2C428E] h-18 px-8 border-2 text-black 
                  relative before:absolute before:inset-0 before:border-2 before:border-[#2C428E] 
                  before:-m-1 after:absolute after:inset-0 after:border-2 after:border-[#2C428E] 
                  after:m-1 hover:before:-m-1.5 hover:after:m-1.5 transition-all duration-200
                "*/

                className="mt-8 relative px-0"
                variant={'ghost'}
            >
                <Stamp />
                <span className="absolute top-0 left-0 mt-2.5 tracking-widest w-full">
                    SUBSCRIBE</span>
            </Button>
        </Link>
    )

    /*return (
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex items-center w-full gap-x-4">
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="mb-4 py-6 w-3/4"
            />
            <Button type="submit" className="bg-[#74C9FE] border-[#2C428E] h-18 px-8 border-2 text-black mb-4">
                Subscribe
            </Button>
        </form>
    )*/
}
