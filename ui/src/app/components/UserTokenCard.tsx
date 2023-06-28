import SafeImage from "@/app/components/ui/safeimage";
import { UserTokenData } from "@/types";
import { Button } from "./ui/button";

function UserTokenCard({ token }: { token: UserTokenData }) {
    return (
        <div className="flex flex-col duration-300 transform border rounded-xl border-white/10 hover:-translate-y-1">
            {token.token.image && (
                <SafeImage
                    src={token.token.image}
                    alt={"Image for: " + token.token.name}
                    className="mx-auto rounded-t-xl"
                    width={400}
                    height={400}
                />
            )}
            <div className="flex flex-col h-auto px-3 pt-4 pb-4">
                <div className="text-sm truncate">#{token.token.tokenId}</div>
                <h6>{token.token.name}</h6>

                <div className="flex justify-between mt-auto">
                    <Button size={'xs'} href={`/collection/${token.token.contract}/${token.token.tokenId}`}>
                        details
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UserTokenCard;