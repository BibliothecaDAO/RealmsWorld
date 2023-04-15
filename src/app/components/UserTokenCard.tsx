import SafeImage from "@/app/components/ui/safeimage";
import { UserTokenData } from "@/types";
import Link from "next/link";

function UserTokenCard({ token }: { token: UserTokenData }) {
    return (
        <div className="duration-300 transform border rounded-xl border-white/10 hover:-translate-y-1">
            {token.token.image && (
                <SafeImage
                    src={token.token.image}
                    alt={"Image for: " + token.token.name}
                    className="mx-auto rounded-t-xl"
                    width={400}
                    height={400}
                />
            )}
            <div className="px-3 pt-4 pb-4">
                <div className="text-sm truncate">#{token.token.tokenId}</div>
                <h6>{token.token.name}</h6>

                <div className="flex justify-between">
                    <Link href={`/collection/${token.token.contract}/${token.token.tokenId}`}>
                        More
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default UserTokenCard;