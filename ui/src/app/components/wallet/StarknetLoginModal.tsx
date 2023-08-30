import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useAccount, useConnectors } from "@starknet-react/core";
import { Button } from "../ui/button";
import { useUIContext } from "@/app/providers/UIProvider";
import { useEffect } from "react";

export const StarknetLoginModal = () => {
  const { connect, connectors } = useConnectors();
  const {
    isStarknetLoginOpen,
    toggleStarknetLogin,
    toggleAccount,
    isAccountOpen,
  } = useUIContext();
  const { isConnected } = useAccount();
  useEffect(() => {
    if (isConnected && isStarknetLoginOpen) {
      toggleStarknetLogin();
      !isAccountOpen && toggleAccount();
    }
  }, [isConnected]);

  return (
    <Dialog open={isStarknetLoginOpen} onOpenChange={toggleStarknetLogin}>
      <DialogContent className="w-full min-w-[350px] !pt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
          }}
          //className="fixed top-0 left-0 z-50 h-full w-72 bg-grey-11 md:w-[70vw]"
        >
          <DialogHeader>
            <h6 className="text-base -mt-3 mb-6">Connect Starknet Wallet</h6>
          </DialogHeader>
          <div className="self-center flex space-y-2 flex-col">
            {connectors.map((connector) => {
              if (connector.available()) {
                return (
                  <Button
                    className="self-center w-full justify-between px-4 capitalize text-lg font-light py-6 font-sans"
                    variant={"outline"}
                    size={"lg"}
                    key={connector.id}
                    onClick={() => connect(connector)}
                  >
                    {connector.id.replace(/([A-Z])/g, " $1") ??
                      "Continue with email"}
                    {connector.icon ? (
                      <img className="w-6 mr-3" src={connector.icon} alt="" />
                    ) : (
                      <Mail className="mr-3 " />
                    )}
                  </Button>
                );
              }
            })}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
